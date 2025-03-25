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
            throw new \RuntimeException('API request for collections failed.');
        }

        // Ensure at least one collection is retrieved
        if (empty($collectionsResponse['results'])) {
            Log::warning('No collections found from API.');
            throw new \RuntimeException('No collections returned from API.');
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
                        throw new \RuntimeException("Failed to sync products for collection: {$collection->name}");
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
            throw new \RuntimeException('API request for products failed.');
        }

        // Ensure at least one product is retrieved
        if (empty($productsResponse['results'])) {
            Log::warning('No products found for collection: '.$collection->name);
            throw new \RuntimeException("No products returned for collection: {$collection->name}");
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
                                    'price' => $variantData['unitPrice']['value'],
                                    'currency' => $variantData['unitPrice']['currency'],
                                ]
                            );
                        }
                    }
                }

                // Since the root product does not have a price, we need to calculate it based on the variants, defaulting to the lowest price variant.
                $product->update(['price' => $product->variants->min('price')]);
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
     */
    public function createCart(string $variant_id, int $quantity = 1, string $currency = 'USD')
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
     */
    public function addToCart(string $cartId, string $variant_id, int $quantity = 1)
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
     */
    public function updateCart(string $cartId, array $items)
    {
        $body = ['items' => $items];

        return $this->postRequest("v1/carts/{$cartId}/change", [], $body);
    }

    /**
     * Removes an item from the cart.
     */
    public function removeFromCart(string $cartId, string $variant_id)
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
     */
    public function getCart(string $cartId)
    {
        return $this->getRequest("v1/carts/{$cartId}");
    }

    /**
     * Generates the checkout URL for an existing cart.
     */
    public function getCheckoutUrl(string $cartId, string $currency = 'USD'): string
    {
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
    private function request(string $method, string $endpoint, array $queryParams = [], array $bodyParams = [])
    {
        // Check if the query parameters are not empty
        if (! empty($queryParams)) {
            // if not empty, check if the storefront token is set
            if ($this->storefrontToken) {
                // if set, add the storefront token to the query parameters
                $queryParams['storefront_token'] = $this->storefrontToken;
            } else {
                // if not set, throw an exception
                throw new \RuntimeException('Storefront token is required for this request.');
            }
        } elseif ($this->storefrontToken) {
            // if set, add the storefront token to the query parameters
            $queryParams['storefront_token'] = $this->storefrontToken;
        } else {
            // if not set, throw an exception
            throw new \RuntimeException('Storefront token is required for this request.');
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
     * Make a GET request to the Fourthwall API
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
     * Make a POST request to the Fourthwall API
     *
     * @param  string  $endpoint  The endpoint to make the request to.
     * @param  array  $bodyParams  The body parameters to include in the request.
     * @param  array  $queryParams  The query parameters to include in the request.
     * @return mixed The response from the API.
     */
    private function postRequest(string $endpoint, array $queryParams, array $bodyParams): mixed
    {
        return $this->request('post', $endpoint, $queryParams, $bodyParams);
    }

    /**
     * Generate a local image path based on the storage disk configuration.
     */
    protected function getLocalImagePath(string $localPath): string
    {
        // Using Laravel Storage helper to generate the URL based on 'public' disk configuration.
        return Storage::url($localPath);
    }
}
