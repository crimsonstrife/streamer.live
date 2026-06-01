<?php

namespace Tests\Unit\Services;

use App\Services\FourthwallService;
use Illuminate\Support\Facades\Http;
use ReflectionClass;
use Tests\TestCase;

class FourthwallServiceCartTest extends TestCase
{
    public function test_remove_from_cart_sends_fourthwall_variant_id_field(): void
    {
        Http::fake([
            'https://fourthwall.test/v1/carts/cart-123/remove*' => Http::response(['id' => 'cart-123'], 200),
        ]);

        $service = $this->fourthwallService();

        $this->assertSame(['id' => 'cart-123'], $service->removeFromCart('cart-123', 'variant-123'));

        Http::assertSent(fn ($request) => $request->url() === 'https://fourthwall.test/v1/carts/cart-123/remove?storefront_token=test-token'
            && $request->data() === [
                'items' => [
                    ['variantId' => 'variant-123'],
                ],
            ]);
    }

    public function test_update_cart_sends_fourthwall_variant_id_field(): void
    {
        Http::fake([
            'https://fourthwall.test/v1/carts/cart-123/change*' => Http::response(['id' => 'cart-123'], 200),
        ]);

        $service = $this->fourthwallService();

        $this->assertSame(['id' => 'cart-123'], $service->updateCart('cart-123', [
            ['variantId' => 'variant-123', 'quantity' => 2],
        ]));

        Http::assertSent(fn ($request) => $request->url() === 'https://fourthwall.test/v1/carts/cart-123/change?storefront_token=test-token'
            && $request->data() === [
                'items' => [
                    ['variantId' => 'variant-123', 'quantity' => 2],
                ],
            ]);
    }

    public function test_list_giveaway_packages_uses_fourthwall_open_api_credentials(): void
    {
        Http::fake([
            'https://api.fourthwall.com/open-api/v1.0/giveaway-links/packages*' => Http::response([
                'results' => [
                    ['id' => 'pkg-123'],
                ],
            ], 200),
        ]);

        $service = $this->fourthwallService();

        $this->assertSame(['results' => [['id' => 'pkg-123']]], $service->listGiveawayPackages(['limit' => 50]));

        Http::assertSent(fn ($request) => $request->url() === 'https://api.fourthwall.com/open-api/v1.0/giveaway-links/packages?limit=50'
            && $request->hasHeader('Authorization', 'Basic '.base64_encode('open-key:open-secret')));
    }

    public function test_get_thank_you_uses_fourthwall_open_api_credentials(): void
    {
        Http::fake([
            'https://api.fourthwall.com/open-api/v1.0/thank-yous/ty_123' => Http::response([
                'id' => 'ty_123',
                'mediaUrl' => 'https://fourthwall.com/thankyou/ty_123',
                'contribution' => [
                    'id' => 'don_123',
                    'type' => 'DONATION',
                ],
            ], 200),
        ]);

        $service = $this->fourthwallService();

        $this->assertSame([
            'id' => 'ty_123',
            'mediaUrl' => 'https://fourthwall.com/thankyou/ty_123',
            'contribution' => [
                'id' => 'don_123',
                'type' => 'DONATION',
            ],
        ], $service->getThankYou('ty_123'));

        Http::assertSent(fn ($request) => $request->url() === 'https://api.fourthwall.com/open-api/v1.0/thank-yous/ty_123'
            && $request->hasHeader('Authorization', 'Basic '.base64_encode('open-key:open-secret'))
            && $request->hasHeader('Accept', 'application/json'));
    }

    public function test_extract_gift_id_from_fourthwall_gift_url(): void
    {
        $service = $this->fourthwallService();

        $this->assertSame('gft_abc-123_XYZ', $service->extractGiftIdFromUrl('https://example.test/gifts/gft_abc-123_XYZ?utm_source=test'));
    }

    private function fourthwallService(): FourthwallService
    {
        $reflection = new ReflectionClass(FourthwallService::class);
        $service = $reflection->newInstanceWithoutConstructor();

        foreach ([
            'enabled' => true,
            'baseUrl' => 'https://fourthwall.test',
            'storefrontToken' => 'test-token',
            'openApiKey' => 'open-key',
            'openApiSecret' => 'open-secret',
            'verify_ssl' => true,
        ] as $property => $value) {
            $reflection->getProperty($property)->setValue($service, $value);
        }

        return $service;
    }
}
