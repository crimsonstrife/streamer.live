<?php

namespace App\Services;

use App\Jobs\ProcessProductImage;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\LazyCollection;
use RuntimeException;

/**
 * Class FourthwallService
 *
 * Service class to handle interactions with the Fourthwall API.
 */
class FourthwallService
{
    protected string $baseUrl;

    protected string $storefrontToken;

    protected string $storefrontUrl;

    protected bool $verify;

    protected bool $enableGC;

    protected int $collectionsChunkSize;

    protected int $productsChunkSize;

    /**
     * FourthwallService constructor.
     * Initializes a new instance of the FourthwallService class.
     */
    public function __construct()
    {
        $this->baseUrl = config('services.fourthwall.base_url', 'https://storefront-api.fourthwall.com');
        $this->storefrontToken = config('services.fourthwall.storefront_token');
        $this->storefrontUrl = config('services.fourthwall.storefront_url', 'https://storefront.fourthwall.com');
        $this->verify = config('services.fourthwall.verify', true);
        $this->enableGC = config('fourthwall.enable_gc', true);
        $this->collectionsChunkSize = config('fourthwall.chunk_size.collections', 10);
        $this->productsChunkSize = config('fourthwall.chunk_size.products', 5);
    }

    /** ===========================
     *  PRODUCT & COLLECTION SYNCING
     *  =========================== */

    /**
     * Sync collections and products from Fourthwall API in chunks.
     *
     * @throws Exception If an error occurs during syncing.
     */
    public function syncCollectionsAndProducts(): void
    {
        $collectionsResponse = $this->getRequest('v1/collections');

        if (! isset($collectionsResponse['results'])) {
            Log::error('Failed to fetch collections from Fourthwall.');
            throw new RuntimeException('API request for collections failed.');
        }

        // Ensure at least one collection is retrieved
        if (empty($collectionsResponse['results'])) {
            Log::warning('No collections found from API.');
            throw new RuntimeException('No collections returned from API.');
        }

        // Use a lazy collection to iterate without loading everything at once
        LazyCollection::make(static function () use ($collectionsResponse) {
            foreach ($collectionsResponse['results'] as $collectionData) {
                yield $collectionData;
            }
        })->chunk($this->collectionsChunkSize)
            ->each(function ($collectionChunk) {
                foreach ($collectionChunk as $collectionData) {
                    $collection = Collection::updateOrCreate(
                        ['provider_id' => $collectionData['id']],
                        [
                            'name' => $collectionData['name'],
                            'slug' => $collectionData['slug'],
                            'description' => $collectionData['description'] ?? null,
                        ]
                    );

                    Log::info("Synced collection: {$collection->name}");

                    // Attempt to sync products for this collection
                    try {
                        $this->syncProducts($collection);
                    } catch (Exception $e) {
                        Log::error("Error syncing products for collection {$collection->name}: ".$e->getMessage());
                        throw new RuntimeException("Failed to sync products for collection: {$collection->name}");
                    }
                }
                if ($this->enableGC) {
                    gc_collect_cycles();
                }
            });

        Log::info('All collections and products synced successfully.');
    }

    /**
     * Sync products for a given collection in chunks.
     *
     * @param  Collection  $collection  The collection to sync products for.
     *
     * @throws Exception If an error occurs during syncing.
     */
    public function syncProducts(Collection $collection): void
    {
        $productsResponse = $this->getRequest("v1/collections/{$collection->slug}/products");

        if (! isset($productsResponse['results'])) {
            Log::error('No products found for collection: '.$collection->name);
            throw new RuntimeException('API request for products failed.');
        }

        // Ensure at least one product is retrieved
        if (empty($productsResponse['results'])) {
            Log::warning('No products found for collection: '.$collection->name);
            throw new RuntimeException("No products returned for collection: {$collection->name}");
        }

        foreach (array_chunk($productsResponse['results'], $this->productsChunkSize) as $productBatch) {
            foreach ($productBatch as $productData) {
                Log::info("Syncing product: {$productData['name']} for collection: {$collection->name}");
                $product = Product::updateOrCreate(
                    ['provider_id' => $productData['id']],
                    [
                        'collection_id' => $collection->id,
                        'name' => $productData['name'],
                        'slug' => $productData['slug'],
                        'description' => $productData['description'] ?? '',
                        'state' => $productData['state']['type'] ?? 'SOLDOUT',
                        'access' => $productData['access']['type'] ?? 'PUBLIC',
                    ]
                );

                // Ensure product is linked to the collection (pivot table)
                $product->collections()->syncWithoutDetaching([$collection->id]);
                Log::info("Attached product: {$product->name} to collection: {$collection->name}");

                if (! empty($productData['variants'])) {
                    foreach (array_chunk($productData['variants'], $this->productsChunkSize) as $variantBatch) {
                        foreach ($variantBatch as $variantData) {
                            Log::info("Syncing product variant: {$variantData['name']} for product: {$product->name}");
                            ProductVariant::updateOrCreate(
                                ['provider_id' => $variantData['id']],
                                [
                                    'product_id' => $product->id,
                                    'name' => $variantData['name'],
                                    'sku' => $variantData['sku'],
                                    'price' => $variantData['unitPrice']['value'],
                                    'compare_at_price' => $variantData['compareAtPrice']['value'] ?? null,
                                    'currency' => $variantData['unitPrice']['currency'],
                                    'stock_status' => $variantData['stock']['type'],
                                    'stock_count' => $variantData['stock']['inStock'] ?? 0,
                                    'weight' => $variantData['weight']['value'],
                                    'weight_unit' => $variantData['weight']['unit'],
                                    'height' => $variantData['dimensions']['height'],
                                    'length' => $variantData['dimensions']['length'],
                                    'width' => $variantData['dimensions']['width'],
                                    'dimension_unit' => $variantData['dimensions']['unit'],
                                    'description' => $variantData['attributes']['description'] ?? null,
                                    'size' => $variantData['attributes']['size']['name'] ?? null,
                                    'color_name' => $variantData['attributes']['color']['name'] ?? null,
                                    'color_swatch' => $variantData['attributes']['color']['swatch'] ?? null,
                                ]
                            );
                        }
                    }
                }

                // Since the root product does not have a price, we need to calculate it based on the variants, defaulting to the lowest price variant.
                $product->update(['price' => $product->variants->min('price')]);
                $product->update(['compare_at_price' => $product->variants->min('compare_at_price')]);
                Log::info("Updated price for product: {$product->name}");

                // Dispatch image processing for the product
                if (! empty($productData['images'])) {
                    foreach (array_chunk($productData['images'], 3) as $imageBatch) {
                        foreach ($imageBatch as $imageData) {
                            Log::info("Dispatching image processing for product: {$product->name}");
                            ProcessProductImage::dispatchSync($product, $imageData);
                        }

                        if ($this->enableGC) {
                            gc_collect_cycles();
                        }
                    }
                }
                unset($productData);
            }
            if ($this->enableGC) {
                gc_collect_cycles();
            }
        }
    }

    /** ===========================
     *  IMAGE PROCESSING
     *  =========================== */

    /**
     * Store an image locally and update the database.
     *
     * @param  Product  $product  The product the image belongs to.
     * @param  ProductVariant|null  $variant  The variant the image belongs to, if any.
     * @param  array  $imageData  The image data from the API.
     */
    public function storeImage(Product $product, ?ProductVariant $variant, array $imageData): void
    {
        $filename = basename($imageData['url']);
        $localPath = "products/{$product->provider_id}/{$filename}";

        $response = Http::withOptions(['verify' => $this->verify])->get($imageData['url']);

        if ($response->successful()) {
            Storage::disk('public')->put($localPath, $response->body());
        } else {
            Log::error('Failed to download image: '.$imageData['url']);

            return;
        }

        ProductImage::updateOrCreate(
            ['provider_id' => $imageData['id']],
            [
                'product_id' => $product->id,
                'variant_id' => $variant?->id,
                'url' => $imageData['url'],
                'local_path' => $this->getLocalImagePath($localPath),
                'width' => $imageData['width'],
                'height' => $imageData['height'],
            ]
        );
    }

    /** ===========================
     *  CART OPERATIONS
     *  =========================== */

    /**
     * Creates a new cart with a single item.
     *
     * @param  string  $variant_id  The ID of the product variant to add to the cart.
     * @param  int  $quantity  The quantity of the item to add to the cart.
     * @param  string  $currency  The currency for the cart.
     * @return mixed The response from the API.
     */
    public function createCart(string $variant_id, int $quantity = 1, string $currency = 'USD'): mixed
    {
        $params = ['currency' => $currency];

        $body = [
            'items' => [
                [
                    'variantId' => $variant_id,
                    'quantity' => (int) $quantity,
                ],
            ],
        ];

        return $this->postRequest('v1/carts', $params, $body);
    }

    /**
     * Adds an item to an existing cart.
     *
     * @param  string  $cartId  The ID of the cart to add the item to.
     * @param  string  $variant_id  The ID of the product variant to add to the cart.
     * @param  int  $quantity  The quantity of the item to add to the cart.
     * @return mixed The response from the API.
     */
    public function addToCart(string $cartId, string $variant_id, int $quantity = 1): mixed
    {
        $body = [
            'items' => [
                [
                    'variantId' => $variant_id,
                    'quantity' => (int) $quantity,
                ],
            ],
        ];

        return $this->postRequest("v1/carts/{$cartId}/add", [], $body);
    }

    /**
     * Updates items in the cart.
     *
     * @param  string  $cartId  The ID of the cart to update.
     * @param  array  $items  The items to update in the cart.
     * @return mixed The response from the API.
     */
    public function updateCart(string $cartId, array $items): mixed
    {
        $body = ['items' => $items];

        return $this->postRequest("v1/carts/{$cartId}/change", [], $body);
    }

    /**
     * Removes an item from the cart.
     *
     * @param  string  $cartId  The ID of the cart to remove the item from.
     * @param  string  $variant_id  The ID of the product variant to remove from the cart.
     * @return mixed The response from the API.
     */
    public function removeFromCart(string $cartId, string $variant_id): mixed
    {
        $body = [
            'items' => [
                ['variant_id' => $variant_id],
            ],
        ];

        return $this->postRequest("v1/carts/{$cartId}/remove", [], $body);
    }

    /**
     * Retrieves cart details based on cart ID.
     *
     * @param  string  $cartId  The ID of the cart to retrieve.
     * @return mixed The response from the API.
     */
    public function getCart(string $cartId): mixed
    {
        return $this->getRequest("v1/carts/{$cartId}");
    }

    /**
     * Generates the checkout URL for an existing cart.
     *
     * @param  string  $cartId  The ID of the cart to generate the checkout URL for.
     * @param  string  $currency  The currency for the checkout.
     * @return string The checkout URL.
     */
    public function getCheckoutUrl(string $cartId, string $currency = 'USD'): string
    {
        // Check if the storefront url is set, and starts with 'https://'
        if (! str_starts_with($this->storefrontUrl, 'https://')) {
            $this->storefrontUrl = 'https://'.$this->storefrontUrl;
        }

        // Check if the storefront url is set and ends with a slash
        if (! str_ends_with($this->storefrontUrl, '/')) {
            // if not, add a slash to the end of the storefront url
            $url = $this->storefrontUrl."/checkout/?cartCurrency={$currency}&cartId={$cartId}";
        } else {
            $url = $this->storefrontUrl."checkout/?cartCurrency={$currency}&cartId={$cartId}";
        }

        return $url;
    }

    /** ===========================
     *  HELPER METHODS
     *  =========================== */

    /**
     * Make a request to the Fourthwall API.
     *
     * @param  string  $method  The HTTP method to use for the request.
     * @param  string  $endpoint  The endpoint to make the request to.
     * @param  array  $queryParams  The query parameters to include in the request.
     * @param  array  $bodyParams  The body parameters to include in the request.
     * @return mixed The response from the API.
     *
     * @throws RuntimeException If the storefront token is not set.
     */
    private function request(string $method, string $endpoint, array $queryParams = [], array $bodyParams = []): mixed
    {
        // Check if the query parameters are not empty
        if (! empty($queryParams)) {
            // if not empty, check if the storefront token is set
            if ($this->storefrontToken) {
                // if set, add the storefront token to the query parameters
                $queryParams['storefront_token'] = $this->storefrontToken;
            } else {
                // if not set, throw an exception
                throw new RuntimeException('Storefront token is required for this request.');
            }
        } elseif ($this->storefrontToken) {
            // if set, add the storefront token to the query parameters
            $queryParams['storefront_token'] = $this->storefrontToken;
        } else {
            // if not set, throw an exception
            throw new RuntimeException('Storefront token is required for this request.');
        }

        $url = "{$this->baseUrl}/{$endpoint}?".http_build_query($queryParams, '', '&');

        return Http::withOptions([
            'verify' => $this->verify,
        ])
            ->withQueryParameters($queryParams)
            ->{$method}($url, $method === 'get' ? [] : $bodyParams) // Only send body for non-GET requests
            ->json();
    }

    /**
     * Make a GET request to the Fourthwall API.
     *
     * @param  string  $endpoint  The endpoint to make the request to.
     * @param  array  $queryParams  The query parameters to include in the request.
     * @return mixed The response from the API.
     */
    private function getRequest(string $endpoint, array $queryParams = []): mixed
    {
        return $this->request('get', $endpoint, $queryParams, []);
    }

    /**
     * Make a POST request to the Fourthwall API.
     *
     * @param  string  $endpoint  The endpoint to make the request to.
     * @param  array  $queryParams  The query parameters to include in the request.
     * @param  array  $bodyParams  The body parameters to include in the request.
     * @return mixed The response from the API.
     */
    private function postRequest(string $endpoint, array $queryParams, array $bodyParams): mixed
    {
        return $this->request('post', $endpoint, $queryParams, $bodyParams);
    }

    /**
     * Generate a local image path based on the storage disk configuration.
     *
     * @param  string  $localPath  The local path of the image.
     * @return string The generated local image path.
     */
    protected function getLocalImagePath(string $localPath): string
    {
        // Using Laravel Storage helper to generate the URL based on 'public' disk configuration.
        return Storage::url($localPath);
    }

    /**
     * Validate the stock of the product variant.
     *
     * @param  string  $variant_id  The ID of the product variant to validate.
     * @return array|bool The stock information or false if not available.
     *
     * @throws RuntimeException If the variant or product is not found.
     */
    public function validateProductStock(string $variant_id): array|bool
    {
        $inStock = null;
        $stockAmount = 0;
        $productVariantObject = ProductVariant::find($variant_id, 'provider_id');

        if (! $productVariantObject) {
            throw new RuntimeException('Variant not found locally');
        }

        // Get the product object
        $productObject = Product::find($productVariantObject->product_id, 'id');

        if (! $productObject) {
            throw new RuntimeException('Parent Product not found');
        }

        // Get the product from the API
        $remoteProduct = $this->getRequest("/v1/products/{ $productObject->provider_id }");

        if (! $remoteProduct) {
            throw new RuntimeException('Product not found on API');
        }

        // Check for the 'SOLDOUT' state before continuing
        if ($remoteProduct['state']['type'] !== 'AVAILABLE') {
            return false; // Product is out of stock, so we don't need a stock count
        }

        // Parse the remoteProduct response to find the 'variants' array
        $remoteVariants = $remoteProduct['variants'];

        if (! $remoteVariants) {
            throw new RuntimeException('Product has not variants!');
        }

        // Loop the variants and find a match
        foreach ($remoteVariants as $remoteVariant) {
            if ($remoteVariant['id'] === $variant_id) {
                // Get the stock values
                $inStock = $remoteVariant['stock']['type'];
                $stockAmount += $remoteVariant['stock']['inStock'];
            }
        }

        if ($inStock === 'UNLIMITED') {
            return true;
        }

        return [
            'type' => $inStock,
            'amount' => $stockAmount,
        ];
    }
}
