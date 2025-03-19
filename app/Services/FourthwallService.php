<?php

namespace App\Services;

use App\Jobs\ProcessProductImage;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
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
     * @throws \Exception If an error occurs during syncing.
     */
    public function syncCollectionsAndProducts()
    {
        $collectionsResponse = $this->getRequest('v1/collections');

        if (!isset($collectionsResponse['results'])) {
            Log::error("Failed to fetch collections from Fourthwall.");
            throw new \Exception("API request for collections failed.");
        }

        // Ensure at least one collection is retrieved
        if (empty($collectionsResponse['results'])) {
            Log::warning("No collections found from API.");
            throw new \Exception("No collections returned from API.");
        }

        // Use a lazy collection to iterate without loading everything at once
        LazyCollection::make(function () use ($collectionsResponse) {
            foreach ($collectionsResponse['results'] as $collectionData) {
                yield $collectionData;
            }
        })->chunk($collectionsChunkSize)
            ->each(function ($collectionChunk) {
                foreach ($collectionChunk as $collectionData) {
                    $collection = Collection::updateOrCreate(
                        ['provider_id' => $collectionData['id']],
                        [
                            'name' => $collectionData['name'],
                            'slug' => $collectionData['slug'],
                            'description' => $collectionData['description'] ?? null
                        ]
                    );

                    Log::info("Synced collection: {$collection->name}");

                    // Attempt to sync products for this collection
                    try {
                        $this->syncProducts($collection);
                    } catch (\Exception $e) {
                        Log::error("Error syncing products for collection {$collection->name}: " . $e->getMessage());
                        throw new \Exception("Failed to sync products for collection: {$collection->name}");
                    }
                }
                gc_collect_cycles($enableGC); // Free up memory
            });

        Log::info("All collections and products synced successfully.");
    }

    /**
     * Sync products for a given collection in chunks.
     *
     * @param Collection $collection The collection to sync products for.
     *
     * @throws \Exception If an error occurs during syncing.
     */
    public function syncProducts(Collection $collection)
    {
        $productsResponse = $this->getRequest("v1/collections/{$collection->slug}/products");

        if (!isset($productsResponse['results'])) {
            Log::error("No products found for collection: " . $collection->name);
            throw new \Exception("API request for products failed.");
        }

        // Ensure at least one product is retrieved
        if (empty($productsResponse['results'])) {
            Log::warning("No products found for collection: " . $collection->name);
            throw new \Exception("No products returned for collection: {$collection->name}");
        }

        foreach (array_chunk($productsResponse['results'], $productsChunkSize) as $productBatch) {
            foreach ($productBatch as $productData) {
                $product = Product::updateOrCreate(
                    ['provider_id' => $productData['id']],
                    [
                        'collection_id' => $collection->id,
                        'name' => html_entity_decode($productData['name']),
                        'slug' => $productData['slug'],
                        'description' => html_entity_decode($productData['description'] ?? ''),
                    ]
                );

                if (!empty($productData['variants'])) {
                    foreach (array_chunk($productData['variants'], $productsChunkSize) as $variantBatch) {
                        foreach ($variantBatch as $variantData) {
                            ProductVariant::updateOrCreate(
                                ['provider_id' => $variantData['id']],
                                [
                                    'product_id' => $product->id,
                                    'name' => html_entity_decode($variantData['name']),
                                    'price' => $variantData['unitPrice']['value'],
                                    'currency' => $variantData['unitPrice']['currency']
                                ]
                            );
                        }
                    }
                }

                if (!empty($productData['images'])) {
                    foreach (array_chunk($productData['images'], 3) as $imageBatch) {
                        foreach ($imageBatch as $imageData) {
                            ProcessProductImage::dispatch($product, $imageData);
                        }
                    }
                }
                unset($productData);
            }
            gc_collect_cycles($enableGC);
        }
    }

    /** ===========================
     *  IMAGE PROCESSING
     *  =========================== */

    /**
     * Store an image locally and update the database.
     */
    public function storeImage(Product $product, ?ProductVariant $variant, array $imageData)
    {
        $filename = basename($imageData['url']);
        $localPath = "products/{$product->provider_id}/{$filename}";

        $response = Http::withOptions(['verify' => $this->verify])->get($imageData['url']);

        if ($response->successful()) {
            Storage::disk('public')->put($localPath, $response->body());
        } else {
            Log::error("Failed to download image: " . $imageData['url']);
            return;
        }

        ProductImage::updateOrCreate(
            ['provider_id' => $imageData['id']],
            [
                'product_id' => $product->id,
                'variant_id' => $variant?->id,
                'url' => $imageData['url'],
                'local_path' => str_replace('public/', '', $localPath),
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
    public function createCart(string $variantId, int $quantity = 1, string $currency = 'USD')
    {
        $params = ['currency' => $currency];

        $body = [
            'items' => [
                [
                    'variantId' => $variantId,
                    'quantity' => $quantity,
                ],
            ],
        ];

        return $this->postRequest('v1/carts', $params, $body);
    }

    /**
     * Adds an item to an existing cart.
     */
    public function addToCart(string $cartId, string $variantId, int $quantity = 1)
    {
        $body = [
            'items' => [
                [
                    'variantId' => $variantId,
                    'quantity' => $quantity,
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
    public function removeFromCart(string $cartId, string $variantId)
    {
        $body = [
            'items' => [
                ['variantId' => $variantId],
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
    public function getCheckoutUrl(string $cartId, string $currency = 'USD')
    {
        return "{$this->storefrontUrl}/checkout/?cartCurrency={$currency}&cartId={$cartId}";
    }

    /** ===========================
     *  HELPER METHODS
     *  =========================== */

    private function request(string $method, string $endpoint, array $queryParams = [], array $bodyParams = [])
    {
        // Check if the query parameters are not empty
        if (!empty($queryParams)) {
            //if not empty, check if the storefront token is set
            if ($this->storefrontToken) {
                //if set, add the storefront token to the query parameters
                $queryParams['storefront_token'] = $this->storefrontToken;
            } else {
                //if not set, throw an exception
                throw new \Exception('Storefront token is required for this request.');
            }
        } else {
            //if empty, check if the storefront token is set
            if ($this->storefrontToken) {
                //if set, add the storefront token to the query parameters
                $queryParams = ['storefront_token' => $this->storefrontToken];
            } else {
                //if not set, throw an exception
                throw new \Exception('Storefront token is required for this request.');
            }
        }

        $url = "{$this->baseUrl}/{$endpoint}?" . http_build_query($queryParams, '', '&');

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
     * @param string $endpoint The endpoint to make the request to.
     * @param array $queryParams The query parameters to include in the request.
     *
     * @return mixed The response from the API.
     */
    private function getRequest(string $endpoint, array $queryParams = [])
    {
        return $this->request('get', $endpoint, $queryParams, []);
    }

    /**
     * Make a POST request to the Fourthwall API
     *
     * @param string $endpoint The endpoint to make the request to.
     * @param array $bodyParams The body parameters to include in the request.
     * @param array $queryParams The query parameters to include in the request.
     *
     * @return mixed The response from the API.
     */
    private function postRequest(string $endpoint, array $queryParams = [], array $bodyParams)
    {
        return $this->request('post', $endpoint, $queryParams, $bodyParams);
    }
}
