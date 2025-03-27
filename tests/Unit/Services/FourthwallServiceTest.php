<?php

namespace Tests\Unit\Services;

use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\FourthwallService;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Tests\TestCase;

class FourthwallServiceTest extends TestCase
{
    protected FourthwallService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new FourthwallService();
    }

    /**
     * @throws Exception
     */
    public function test_sync_collections_and_products_fetches_collections_and_products_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/collections' => Http::response(['results' => [['id' => 1, 'name' => 'Collection 1', 'slug' => 'collection-1']]], 200),
            'https://storefront-api.fourthwall.com/v1/collections/collection-1/products' => Http::response(['results' => [['id' => 1, 'name' => 'Product 1', 'slug' => 'product-1', 'state' => ['type' => 'AVAILABLE'], 'access' => ['type' => 'PUBLIC'], 'unitPrice' => ['value' => 100, 'currency' => 'USD'], 'stock' => ['type' => 'LIMITED', 'inStock' => 10], 'weight' => ['value' => 1, 'unit' => 'kg'], 'dimensions' => ['height' => 10, 'length' => 10, 'width' => 10, 'unit' => 'cm'], 'variants' => [], 'images' => []]]], 200),
        ]);

        $this->service->syncCollectionsAndProducts();

        $this->assertDatabaseHas('collections', ['provider_id' => 1, 'name' => 'Collection 1']);
        $this->assertDatabaseHas('products', ['provider_id' => 1, 'name' => 'Product 1']);
    }

    /**
     * @throws Exception
     */
    public function test_sync_collections_and_products_throws_exception_when_no_collections_found(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/collections' => Http::response(['results' => []], 200),
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('No collections returned from API.');

        $this->service->syncCollectionsAndProducts();
    }

    /**
     * @throws Exception
     */
    public function test_sync_products_fetches_products_successfully(): void
    {
        $collection = Collection::factory()->create(['provider_id' => 1, 'slug' => 'collection-1']);

        Http::fake([
            'https://storefront-api.fourthwall.com/v1/collections/collection-1/products' => Http::response(['results' => [['id' => 1, 'name' => 'Product 1', 'slug' => 'product-1', 'state' => ['type' => 'AVAILABLE'], 'access' => ['type' => 'PUBLIC'], 'unitPrice' => ['value' => 100, 'currency' => 'USD'], 'stock' => ['type' => 'LIMITED', 'inStock' => 10], 'weight' => ['value' => 1, 'unit' => 'kg'], 'dimensions' => ['height' => 10, 'length' => 10, 'width' => 10, 'unit' => 'cm'], 'variants' => [], 'images' => []]]], 200),
        ]);

        $this->service->syncProducts($collection);

        $this->assertDatabaseHas('products', ['provider_id' => 1, 'name' => 'Product 1']);
    }

    /**
     * @throws Exception
     */
    public function test_sync_products_throws_exception_when_no_products_found(): void
    {
        $collection = Collection::factory()->create(['provider_id' => 1, 'slug' => 'collection-1']);

        Http::fake([
            'https://storefront-api.fourthwall.com/v1/collections/collection-1/products' => Http::response(['results' => []], 200),
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('No products returned for collection: Collection 1');

        $this->service->syncProducts($collection);
    }

    public function test_store_image_stores_image_successfully(): void
    {
        $product = Product::factory()->create(['provider_id' => 1]);
        $imageData = ['id' => 1, 'url' => 'https://example.com/image.jpg', 'width' => 100, 'height' => 100];

        Http::fake([
            'https://example.com/image.jpg' => Http::response('image content', 200),
        ]);

        Storage::fake('public');

        $this->service->storeImage($product, null, $imageData);

        Storage::disk('public')->assertExists('products/1/image.jpg');
        $this->assertDatabaseHas('product_images', ['provider_id' => 1, 'product_id' => $product->id, 'url' => 'https://example.com/image.jpg']);
    }

    public function test_store_image_logs_error_when_image_download_fails(): void
    {
        $product = Product::factory()->create(['provider_id' => 1]);
        $imageData = ['id' => 1, 'url' => 'https://example.com/image.jpg', 'width' => 100, 'height' => 100];

        Http::fake([
            'https://example.com/image.jpg' => Http::response('Not Found', 404),
        ]);

        Log::shouldReceive('error')->once()->with('Failed to download image: https://example.com/image.jpg');

        $this->service->storeImage($product, null, $imageData);

        Storage::disk('public')->assertMissing('products/1/image.jpg');
        $this->assertDatabaseMissing('product_images', ['provider_id' => 1, 'product_id' => $product->id, 'url' => 'https://example.com/image.jpg']);
    }

    public function test_create_cart_creates_cart_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/carts' => Http::response(['id' => 'cart_1'], 200),
        ]);

        $response = $this->service->createCart('variant_1', 1, 'USD');

        $this->assertEquals('cart_1', $response['id']);
    }

    public function test_add_to_cart_adds_item_to_cart_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/carts/cart_1/add' => Http::response(['id' => 'cart_1'], 200),
        ]);

        $response = $this->service->addToCart('cart_1', 'variant_1', 1);

        $this->assertEquals('cart_1', $response['id']);
    }

    public function test_update_cart_updates_cart_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/carts/cart_1/change' => Http::response(['id' => 'cart_1'], 200),
        ]);

        $response = $this->service->updateCart('cart_1', [['variant_id' => 'variant_1', 'quantity' => 2]]);

        $this->assertEquals('cart_1', $response['id']);
    }

    public function test_remove_from_cart_removes_item_from_cart_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/carts/cart_1/remove' => Http::response(['id' => 'cart_1'], 200),
        ]);

        $response = $this->service->removeFromCart('cart_1', 'variant_1');

        $this->assertEquals('cart_1', $response['id']);
    }

    public function test_get_cart_retrieves_cart_successfully(): void
    {
        Http::fake([
            'https://storefront-api.fourthwall.com/v1/carts/cart_1' => Http::response(['id' => 'cart_1', 'items' => []], 200),
        ]);

        $response = $this->service->getCart('cart_1');

        $this->assertEquals('cart_1', $response['id']);
    }

    public function test_get_checkout_url_generates_checkout_url_successfully(): void
    {
        $url = $this->service->getCheckoutUrl('cart_1', 'USD');

        $this->assertStringContainsString('https://storefront.fourthwall.com/checkout/?cartCurrency=USD&cartId=cart_1', $url);
    }

    public function test_validate_product_stock_validates_stock_successfully(): void
    {
        $product = Product::factory()->create(['provider_id' => 1]);
        $variant = ProductVariant::factory()->create(['provider_id' => 'variant_1', 'product_id' => $product->id]);

        Http::fake([
            'https://storefront-api.fourthwall.com/v1/products/1' => Http::response(['state' => ['type' => 'AVAILABLE'], 'variants' => [['id' => 'variant_1', 'stock' => ['type' => 'LIMITED', 'inStock' => 10]]]], 200),
        ]);

        $response = $this->service->validateProductStock('variant_1');

        $this->assertEquals(['type' => 'LIMITED', 'amount' => 10], $response);
    }

    public function test_validate_product_stock_returns_false_when_product_is_sold_out(): void
    {
        $product = Product::factory()->create(['provider_id' => 1]);
        $variant = ProductVariant::factory()->create(['provider_id' => 'variant_1', 'product_id' => $product->id]);

        Http::fake([
            'https://storefront-api.fourthwall.com/v1/products/1' => Http::response(['state' => ['type' => 'SOLDOUT'], 'variants' => [['id' => 'variant_1', 'stock' => ['type' => 'LIMITED', 'inStock' => 0]]]], 200),
        ]);

        $response = $this->service->validateProductStock('variant_1');

        $this->assertFalse($response);
    }
}
