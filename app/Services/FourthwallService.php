<?php

namespace App\Services;

use App\Jobs\ProcessProductImage;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductVariant;
use App\Models\StoreObjects\Promotion;
use App\Settings\FourthwallSettings;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\LazyCollection;
use RuntimeException;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

/**
 * Class FourthwallService
 *
 * Service class to handle interactions with the Fourthwall API.
 */
class FourthwallService
{
    protected bool $enabled;

    protected string $baseUrl;

    protected ?string $storefrontToken;

    protected ?string $storefrontUrl;

    protected ?string $openApiKey;

    protected ?string $openApiSecret;

    protected bool $verify_ssl;

    protected bool $enable_garbage_collection;

    protected int $collectionsChunkSize;

    protected int $productsChunkSize;

    protected int $promotionChunkSize;

    protected const STOCK_TTL_SECONDS = 30;

    /**
     * FourthwallService constructor.
     * Initializes a new instance of the FourthwallService class.
     */
    public function __construct()
    {
        // Read the config first, then allow the Filament setting to override it if it's true
        $configEnabled = config('services.fourthwall.enabled');
        $settingEnabled = app(FourthwallSettings::class)->enable_integration;
        $configBaseUrl = config('services.fourthwall.base_url');
        $settingBaseUrl = app(FourthwallSettings::class)->base_url;
        $configStorefrontToken = config('services.fourthwall.storefront_token');
        $settingStorefrontToken = app(FourthwallSettings::class)->storefront_token;
        $configOpenApiKey = config('services.fourthwall.open_api_key');
        $settingOpenApiKey = app(FourthwallSettings::class)->open_api_key;
        $configOpenApiSecret = config('services.fourthwall.open_api_secret');
        $settingOpenApiSecret = app(FourthwallSettings::class)->open_api_secret;
        $configStorefrontUrl = config('services.fourthwall.storefront_url');
        $settingStorefrontUrl = app(FourthwallSettings::class)->storefront_url;
        $configSSLVerify = config('services.fourthwall.verify');
        $settingSSLVerify = app(FourthwallSettings::class)->ssl_verify;

        // Fallback to config only if the setting is false
        $this->enabled = $settingEnabled ?? $configEnabled;
        $this->baseUrl = $settingBaseUrl ?? $configBaseUrl;
        $this->storefrontToken = $settingStorefrontToken ?? $configStorefrontToken;
        $this->storefrontUrl = $settingStorefrontUrl ?? $configStorefrontUrl;
        $this->openApiKey = $settingOpenApiKey ?? $configOpenApiKey;
        $this->openApiSecret = $settingOpenApiSecret ?? $configOpenApiSecret;
        $this->verify_ssl = $settingSSLVerify ?? $configSSLVerify;
        $this->enable_garbage_collection = config('fourthwall.enable_gc', true);
        $this->collectionsChunkSize = config('fourthwall.chunk_size.collections', 10);
        $this->promotionChunkSize = config('fourthwall.chunk_size.promotions', 5);
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
        if (! $this->enabled) {
            Log::error('Fourthwall integration is disabled.');
            return;
        }

        $page = 0;
        do {
            // fetch one “page” of collections
            $collectionsResponse = $this->getRequest('v1/collections', [
                'page' => $page,
                'size' => $this->collectionsChunkSize,
            ]);

            $collections = data_get($collectionsResponse, 'results', []);
            foreach ($collections as $collectionData) {
                $collection = Collection::updateOrCreate(
                    ['provider_id' => data_get($collectionData, 'id')],
                    [
                        'name'        => data_get($collectionData, 'name'),
                        'slug'        => data_get($collectionData, 'slug'),
                        'description' => data_get($collectionData, 'description'),
                    ]
                );
                Log::info("Synced collection: {$collection->name}");

                // now paginate through that collection’s products
                $this->syncProducts($collection);
            }

            $hasNextPage = data_get($collectionsResponse, 'paging.hasNextPage', false);
            $page++;
        } while ($hasNextPage);

        Log::info('All collections and their products synced.');
    }

    /**
     * Sync Promotions from the Fourthwall API
     *
     * @throws ConnectionException|RequestException
     */
    public function syncPromotions(): void
    {
        if (! $this->enabled) {
            Log::error('The Fourthwall integration is not enabled.');

            return;
        }

        try {
            $promotionsResponse = $this->openApiGetRequest('promotions');

            if (! isset($promotionsResponse['results'])) {
                Log::error('Failed to fetch promotions: Invalid or empty API response.');
                throw new RuntimeException('Failed to fetch promotions from the Fourthwall API.');
            }
        } catch (ConnectionException $e) {
            Log::error('Failed to connect to Fourthwall API: '.$e->getMessage());
            throw new RuntimeException('Connection to Fourthwall API failed.');
        } catch (Exception $e) {
            Log::error('Unexpected error during promotions sync: '.$e->getMessage());
            throw $e;
        }

        // Process promotions using LazyCollection
        LazyCollection::make(static function () use ($promotionsResponse) {
            foreach ($promotionsResponse['results'] as $promotionData) {
                yield $promotionData;
            }
        })->chunk($this->promotionChunkSize)
            ->each(function ($promotionChunk) {
                foreach ($promotionChunk as $promotionData) {
                    $promotionTitle = data_get($promotionData, 'title');

                    // Generate a fallback name if the title doesn't exist
                    if (empty($promotionTitle)) {
                        $promotionType = data_get($promotionData, 'type', 'Promotion');
                        $promotionCode = data_get($promotionData, 'code');
                        $promotionId = data_get($promotionData, 'id');

                        // Dynamic fallback name
                        $promotionTitle = $promotionType.(! empty($promotionCode) ? " - {$promotionCode}" : '')." [#{$promotionId}]";
                    }

                    try {
                        $promotion = Promotion::updateOrCreate(
                            ['provider_id' => data_get($promotionData, 'id')],
                            [
                                'title' => $promotionTitle,
                                'code' => data_get($promotionData, 'code'),
                                'type' => data_get($promotionData, 'type'),
                                'status' => data_get($promotionData, 'status'),
                                'discount_type' => data_get($promotionData, 'discount.type'),
                                'percentage' => data_get($promotionData, 'discount.percentage'),
                                'amount_value' => data_get($promotionData, 'discount.money.value'),
                                'amount_currency' => data_get($promotionData, 'discount.money.currency'),
                                'max_uses' => data_get($promotionData, 'limits.maximumUsesNumber'),
                                'one_use_per_customer' => data_get($promotionData, 'limits.oneUsePerCustomer'),
                                'applies_to' => data_get($promotionData, 'appliesTo.type'),
                                'min_order_value' => data_get($promotionData, 'requirements.minimumOrderValue.value'),
                                'min_order_currency' => data_get($promotionData, 'requirements.minimumOrderValue.currency'),
                            ]
                        );

                        Log::info("Synced promotion: {$promotion->title}");

                        if ($promotion->applies_to === 'SELECTED_PRODUCTS' && ! empty(data_get($promotionData, 'appliesTo.products'))) {
                            foreach (data_get($promotionData, 'appliesTo.products') as $productId) {
                                $product = Product::where('provider_id', $productId)->first();

                                if ($product) {
                                    $promotion->products()->syncWithoutDetaching([$product->id]);
                                } else {
                                    Log::warning("Product with provider_id {$productId} not found for promotion: {$promotion->title}");
                                }
                            }
                        }
                    } catch (Exception $e) {
                        Log::error("Error syncing promotion : {$e->getMessage()}");
                        throw new RuntimeException('Error syncing promotion');
                    }
                }

                if ($this->enable_garbage_collection) {
                    gc_collect_cycles();
                }
            });

        Log::info('All promotions synced successfully.');
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
        $page = 0;
        do {
            $productsResponse = $this->getRequest(
                "v1/collections/{$collection->slug}/products",
                [
                    'page' => $page,
                    'size' => $this->productsChunkSize,
                ]
            );

            $products = data_get($productsResponse, 'results', []);
            foreach ($products as $productData) {
                Log::info('Syncing product: '.data_get($productData, 'name')." for collection: {$collection->name}");
                $product = Product::updateOrCreate(
                    ['provider_id' => data_get($productData, 'id')],
                    [
                        'collection_id' => $collection->id,
                        'name' => data_get($productData, 'name'),
                        'slug' => data_get($productData, 'slug'),
                        'description' => data_get($productData, 'description') ?? '',
                        'state' => data_get($productData, 'state.type') ?? 'SOLDOUT',
                        'access' => data_get($productData, 'access.type') ?? 'PUBLIC',
                    ]
                );

                // There is additional product data that can only be obtained via the Open API, so make a request and update it.
                // $openAPIProductData = $this->openApiGetRequest("products/{$product->provider_id}");
                // $product->setMoreDetailsAttribute(data_get($openAPIProductData, 'additionalInformation.moreDetails')); // Currently these results appear to be empty in the response, despite being documented
                // $product->setProductInformationAttribute(data_get($openAPIProductData, 'additionalInformation.sizeAndFit')); // Currently these results appear to be empty in the response, despite being documented

                // Ensure product is linked to the collection (pivot table)
                $product->collections()->syncWithoutDetaching([$collection->id]);
                Log::info("Attached product: {$product->name} to collection: {$collection->name}");

                if (! empty($productData['variants'])) {
                    $this->syncProductVariants($product, $productData['variants']);
                }

                // Since the root product does not have a price, we need to calculate it based on the variants, defaulting to the lowest price variant.
                $this->updateProductPricing($product);

                // Dispatch image processing for the product
                if (! empty($productData['images'])) {
                    $this->syncProductImages($product, $productData['images']);
                }
                unset($productData);
            }

            $hasNextPage = data_get($productsResponse, 'paging.hasNextPage', false);
            $page++;
        } while ($hasNextPage);

        Log::info("Finished syncing products for collection {$collection->name}");
    }

    /**
     * Sync product variants for a given product.
     */
    protected function syncProductVariants(Product $product, array $variants): void
    {
        if ($this->enabled) {
            foreach (array_chunk($variants, $this->productsChunkSize) as $variantBatch) {
                foreach ($variantBatch as $variantData) {
                    Log::info("Syncing product variant: {$variantData['name']} for product: {$product->name}");
                    ProductVariant::updateOrCreate(
                        ['provider_id' => data_get($variantData, 'id')],
                        [
                            'product_id' => $product->id,
                            'name' => data_get($variantData, 'name'),
                            'sku' => data_get($variantData, 'sku'),
                            'price' => data_get($variantData, 'unitPrice.value'),
                            'compare_at_price' => data_get($variantData, 'compareAtPrice.value'),
                            'currency' => data_get($variantData, 'unitPrice.currency'),
                            'stock_status' => data_get($variantData, 'stock.type'),
                            'stock_count' => data_get($variantData, 'stock.inStock') ?? 0,
                            'weight' => data_get($variantData, 'weight.value'),
                            'weight_unit' => data_get($variantData, 'weight.unit'),
                            'height' => data_get($variantData, 'dimensions.height'),
                            'length' => data_get($variantData, 'dimensions.length'),
                            'width' => data_get($variantData, 'dimensions.width'),
                            'dimension_unit' => data_get($variantData, 'dimensions.unit'),
                            'description' => data_get($variantData, 'attributes.description'),
                            'size' => data_get($variantData, 'attributes.size.name'),
                            'color_name' => data_get($variantData, 'attributes.color.name'),
                            'color_swatch' => data_get($variantData, 'attributes.color.swatch'),
                        ]
                    );
                }
            }
        } else {
            Log::error('The Fourthwall integration is not enabled');
        }
    }

    /**
     * Sync product images by dispatching image processing jobs.
     */
    protected function syncProductImages(Product $product, array $images): void
    {
        if ($this->enabled) {
            foreach (array_chunk($images, 3) as $imageBatch) {
                foreach ($imageBatch as $imageData) {
                    Log::info("Dispatching image processing for product: {$product->name}");
                    ProcessProductImage::dispatchSync($product, $imageData);
                }

                if ($this->enable_garbage_collection) {
                    gc_collect_cycles();
                }
            }
        } else {
            Log::error('The Fourthwall integration is not enabled');
        }
    }

    /**
     * Update the product's price and compare-at price using its variants.
     */
    protected function updateProductPricing(Product $product): void
    {
        if ($this->enabled) {
            if ($product->variants->isEmpty()) {
                $product->update([
                    'price' => null,
                    'compare_at_price' => null,
                ]);
                Log::info("Price skipped for product: {$product->name} (no variants)");

                return;
            }

            $product->update([
                'price' => $product->variants->min('price'),
                'compare_at_price' => $product->variants->min('compare_at_price'),
            ]);

            Log::info("Updated price for product: {$product->name}");
        } else {
            Log::error('The Fourthwall integration is not enabled');
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
     *
     * @throws ConnectionException
     */
    public function storeImage(Product $product, ?ProductVariant $variant, array $imageData): void
    {
        if ($this->enabled) {
            // Check if media with this provider_id already exists
            $existing = $product
                ->getMedia('images')
                ->first(fn ($media) => $media->getCustomProperty('provider_id') === $imageData['id']);

            if ($existing) {
                Log::info("Image {$imageData['id']} already synced for product {$product->name}");

                return;
            }

            $filename = basename(data_get($imageData, 'url'));

            $response = Http::withOptions(['verify' => $this->verify_ssl])->get(data_get($imageData, 'url'));

            if (! $response->successful()) {
                Log::error('Failed to download image: '.data_get($imageData, 'url'));

                return;
            }

            try {
                $product
                    ->addMediaFromString($response->body())
                    ->usingFileName($filename)
                    ->usingName(pathinfo($filename, PATHINFO_FILENAME))
                    ->withCustomProperties([
                        'alt_text' => data_get($imageData, 'alt'),
                        'width' => data_get($imageData, 'width'),
                        'height' => data_get($imageData, 'height'),
                        'provider_url' => data_get($imageData, 'url'),
                        'provider_id' => data_get($imageData, 'id'),
                    ])
                    ->toMediaCollection('images');
            } catch (FileDoesNotExist $e) {
                Log::error('The file does not exist: '.$e->getMessage());
                throw new RuntimeException('The file does not exist.');
            } catch (FileIsTooBig $e) {
                Log::error('The file is too big: '.$e->getMessage());
                throw new RuntimeException('The file is too big: '.$e->getMessage());
            }

            Log::info("Stored image for product {$product->name}: {$filename}");
        } else {
            Log::error('The Fourthwall integration is not enabled');
        }
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
        if ($this->enabled) {
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

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
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

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
            $body = ['items' => $items];

            return $this->postRequest("v1/carts/{$cartId}/change", [], $body);
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
            $body = [
                'items' => [
                    ['variant_id' => $variant_id],
                ],
            ];

            return $this->postRequest("v1/carts/{$cartId}/remove", [], $body);
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
    }

    /**
     * Retrieves cart details based on cart ID.
     *
     * @param  string  $cartId  The ID of the cart to retrieve.
     * @return mixed The response from the API.
     */
    public function getCart(string $cartId): mixed
    {
        if ($this->enabled) {
            return $this->getRequest("v1/carts/{$cartId}");
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
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

        Log::error('The Fourthwall integration is not enabled');

        return '';
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
        if ($this->enabled) {
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
                'verify' => $this->verify_ssl,
            ])
                ->withQueryParameters($queryParams)
                ->{$method}($url, $method === 'get' ? [] : $bodyParams) // Only send body for non-GET requests
                ->json();
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
            return $this->request('get', $endpoint, $queryParams, []);
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        if ($this->enabled) {
            return $this->request('post', $endpoint, $queryParams, $bodyParams);
        }

        Log::error('The Fourthwall integration is not enabled');

        return null;
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
        // Use a unique key for the product cache
        $cacheKey = "fourthwall_stock_{$variant_id}";
        $lockKey = "lock_{$cacheKey}";
        $inStock = null;
        $stockAmount = 0;
        $remoteProduct = null;
        // Set a TTL that suits risk threshold—e.g., configurable seconds
        $ttl = now()->addSeconds(self::STOCK_TTL_SECONDS);

        if ($this->enabled) {
            $productVariantObject = ProductVariant::select('provider_id', 'product_id')->where('provider_id', $variant_id)->first();

            if (! $productVariantObject) {
                Log::error('ProductVariant Object for this Provider ID was not found locally');
                throw new RuntimeException('Variant not found locally');
            }

            // Get the product object
            $productObject = Product::select('provider_id', 'slug')->find($productVariantObject->product_id);

            if (! $productObject) {
                Log::error("ProductVariant's Parent Product Object not found. The Variant may be orphaned.");
                throw new RuntimeException('Parent Product not found');
            }

            $provider_slug = $productObject->slug;

            $stockStatus = Cache::get($cacheKey);

            if (is_null($stockStatus)) {
                // Acquire a lock to prevent multiple API calls
                $lock = Cache::lock($lockKey, 5); // lock for 5 seconds
                try {
                    if ($lock->get()) {
                        // Get the product from the API
                        $remoteProduct = Cache::remember($cacheKey, $ttl, function () use ($provider_slug) {
                            return $this->getRequest("v1/products/{$provider_slug}");
                        });
                    } else {
                        // Simply fetch from API if lock not acquired
                        $remoteProduct = $this->getRequest("v1/products/{$provider_slug}");
                    }
                } finally {
                    optional($lock)->release();
                }
            }

            if (! $remoteProduct || array_key_exists('error', $remoteProduct)) {
                Log::error('The Product could not be found on the Fourthwall API.');
                throw new RuntimeException('Product not found on API');
            }

            // Check for the 'SOLDOUT' state before continuing
            if (! isset($remoteProduct['state']['type']) || $remoteProduct['state']['type'] !== 'AVAILABLE') {
                Log::error("Product {$provider_slug} is not available for sale. State Type is reported as {$remoteProduct['state']['type']}.");

                return false; // Product is out of stock, so we don't need a stock count
            }

            // Parse the remoteProduct response to find the 'variants' array
            $remoteVariants = $remoteProduct['variants'];

            if (! $remoteVariants) {
                Log::error('Product had no variants in the Fourthwall API!');
                throw new RuntimeException('Product has no variants!');
            }

            $matched = false;

            // Loop the variants and find a match
            foreach ($remoteVariants as $remoteVariant) {
                if ($remoteVariant['id'] === $variant_id) {
                    // Get the stock values
                    $inStock = $remoteVariant['stock']['type'];
                    $stockAmount = $remoteVariant['stock']['inStock'] ?? 0;
                    $matched = true;
                    break;
                }
            }

            if (! $matched) {
                Log::error("Variant {$variant_id} not found in Fourthwall API product response.");
                throw new RuntimeException('Variant not found in API response');
            }

            if ($inStock === 'UNLIMITED') {
                return true;
            }

            return [
                'type' => $inStock,
                'amount' => $stockAmount,
            ];
        }

        Log::error('The Fourthwall integration is not enabled');
        throw new RuntimeException('The Fourthwall integration is not enabled');
    }

    /**
     * Make a request to Fourthwall’s Open API (v1.0) with Basic Auth.
     *
     * @throws RequestException
     *                          * @throws ConnectionException
     */
    private function openApiGetRequest(string $endpoint, array $queryParams = []): array
    {
        $authToken = base64_encode("{$this->openApiKey}:{$this->openApiSecret}");

        return Http::withOptions([
            'verify' => $this->verify_ssl,
        ])
            ->withHeaders([
                'Authorization' => "Basic {$authToken}",
                'Content-Accept' => 'application/json',
            ])
            ->get("https://api.fourthwall.com/open-api/v1.0/{$endpoint}", $queryParams)
            ->throw()
            ->json();
    }

    /**
     * @throws RequestException
     * @throws ConnectionException
     */
    public function syncOrders(OrderSyncService $orderSyncService): void
    {
        if (! $this->enabled) {
            Log::error('Fourthwall integration is not enabled; skipping order sync.');

            return;
        }

        // Parameters you may want to page with—cursor, limit, etc.
        $nextCursor = null;

        do {
            $params = ['limit' => 50];
            if ($nextCursor) {
                $params['cursor'] = $nextCursor;
            }

            $payload = $this->openApiGetRequest('order', $params);

            if (empty($payload['results'] ?? [])) {
                break;
            }

            // Upsert each order
            foreach ($payload['results'] as $orderData) {
                $orderSyncService->upsert($orderData);
            }

            // Prepare for next page
            $nextCursor = $payload['cursor'] ?? null;
        } while ($nextCursor);

        Log::info('All Fourthwall orders synced.');
    }
}
