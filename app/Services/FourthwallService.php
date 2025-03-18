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
    }

    /**
     * Sync collections and products from Fourthwall API in chunks.
     */
    public function syncCollectionsAndProducts()
    {
        $collectionsResponse = $this->getRequest('v1/collections');

        if (!isset($collectionsResponse['results'])) {
            Log::error("Failed to fetch collections from Fourthwall.");
            return;
        }

        // Use a lazy collection to iterate without loading everything at once
        LazyCollection::make(function () use ($collectionsResponse) {
            foreach ($collectionsResponse['results'] as $collectionData) {
                yield $collectionData;
            }
        })->chunk(10)
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

                    $this->syncProducts($collection);
                }
                // Free up memory after processing each chunk
                gc_collect_cycles();
            });
    }


    /**
     * Sync products for a given collection in chunks.
     */
    public function syncProducts(Collection $collection)
    {
        $productsResponse = $this->getRequest("v1/collections/{$collection->slug}/products");

        if (!isset($productsResponse['results'])) {
            Log::error("No products found for collection: " . $collection->name);
            return;
        }

        foreach (array_chunk($productsResponse['results'], 5) as $productBatch) {
            foreach ($productBatch as $productData) {
                $product = Product::updateOrCreate(
                    ['provider_id' => $productData['id']],
                    [
                        'collection_id' => $collection->id,
                        'name' => $productData['name'],
                        'slug' => $productData['slug'],
                        'description' => $productData['description'] ?? null
                    ]
                );

                if (!empty($productData['variants'])) {
                    foreach (array_chunk($productData['variants'], 5) as $variantBatch) {
                        foreach ($variantBatch as $variantData) {
                            ProductVariant::updateOrCreate(
                                ['provider_id' => $variantData['id']],
                                [
                                    'product_id' => $product->id,
                                    'name' => $variantData['name'],
                                    'price' => $variantData['unitPrice']['value'], // Adjust as needed
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
                // Unset productData after processing it
                unset($productData);
            }
            // Clear memory for the batch
            gc_collect_cycles();
        }
    }

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
                'local_path' => str_replace('public/', '', $localPath), // Store relative path
                'width' => $imageData['width'],
                'height' => $imageData['height'],
            ]
        );
    }

    /**
     * Makes an HTTP request to the specified endpoint.
     */
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

        return Http::withOptions(['verify' => $this->verify])
            ->withQueryParameters($queryParams)
            ->{$method}($url, $method === 'get' ? [] : $bodyParams)
            ->json();
    }

    /**
     * Make a GET request to the Fourthwall API.
     */
    private function getRequest(string $endpoint, array $queryParams = [])
    {
        return $this->request('get', $endpoint, $queryParams, []);
    }

    /**
     * Make a POST request to the Fourthwall API.
     */
    private function postRequest(string $endpoint, array $queryParams = [], array $bodyParams)
    {
        return $this->request('post', $endpoint, $queryParams, $bodyParams);
    }

    /**
     * Fetch a single product.
     */
    public function getProduct(string $slug)
    {
        return $this->getRequest("v1/products/{$slug}");
    }

    /**
     * Retrieve a list of collections.
     */
    public function getCollections()
    {
        return $this->getRequest('v1/collections');
    }

    /**
     * Retrieves a collection based on the provided slug.
     */
    public function getCollection(string $slug)
    {
        return $this->getRequest("v1/collections/{$slug}");
    }

    /**
     * Retrieves the products from a collection.
     */
    public function getCollectionProducts(string $slug)
    {
        return $this->getRequest("v1/collections/{$slug}/products");
    }

    /**
     * Generate checkout URL.
     */
    public function getCheckoutUrl(string $cartId, string $currency = 'USD')
    {
        return "{$this->storefrontUrl}/checkout/?cartCurrency={$currency}&cartId={$cartId}";
    }

    /**
     * Sync the products from Fourthwall API.
     */
    public function syncAllData()
    {
        $this->syncCollectionsAndProducts();
        Log::info("Fourthwall products and collections synced successfully.");
    }
}
