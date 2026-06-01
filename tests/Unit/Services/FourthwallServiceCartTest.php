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

    private function fourthwallService(): FourthwallService
    {
        $reflection = new ReflectionClass(FourthwallService::class);
        $service = $reflection->newInstanceWithoutConstructor();

        foreach ([
            'enabled' => true,
            'baseUrl' => 'https://fourthwall.test',
            'storefrontToken' => 'test-token',
            'verify_ssl' => true,
        ] as $property => $value) {
            $reflection->getProperty($property)->setValue($service, $value);
        }

        return $service;
    }
}
