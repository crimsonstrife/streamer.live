<?php

namespace Tests\Unit\Utilities;

use App\Services\FourthwallService;
use App\Utilities\CartHelper;
use Illuminate\Support\Facades\Session;
use Mockery;
use Tests\TestCase;

class CartHelperTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Session::flush();
    }

    public function test_add_to_cart_creates_and_stores_new_cart_id(): void
    {
        $fourthwall = Mockery::mock(FourthwallService::class);
        $fourthwall->shouldReceive('validateProductStock')
            ->once()
            ->with('variant-123')
            ->andReturn(['type' => 'UNLIMITED']);
        $fourthwall->shouldReceive('createCart')
            ->once()
            ->with('variant-123', 2)
            ->andReturn(['id' => 'cart-123', 'items' => []]);
        $fourthwall->shouldReceive('addToCart')->never();

        $helper = new CartHelper($fourthwall);

        $this->assertTrue($helper->addToCart('variant-123', 2));
        $this->assertSame('cart-123', Session::get('fourthwall_cart_id'));
    }

    public function test_add_to_cart_adds_to_existing_cart(): void
    {
        Session::put('fourthwall_cart_id', 'cart-123');

        $fourthwall = Mockery::mock(FourthwallService::class);
        $fourthwall->shouldReceive('validateProductStock')
            ->once()
            ->with('variant-456')
            ->andReturn(['type' => 'UNLIMITED']);
        $fourthwall->shouldReceive('createCart')->never();
        $fourthwall->shouldReceive('addToCart')
            ->once()
            ->with('cart-123', 'variant-456', 3)
            ->andReturn(['id' => 'cart-123', 'items' => []]);

        $helper = new CartHelper($fourthwall);

        $this->assertTrue($helper->addToCart('variant-456', 3));
        $this->assertSame('cart-123', Session::get('fourthwall_cart_id'));
    }

    public function test_remove_from_cart_uses_current_cart_id(): void
    {
        Session::put('fourthwall_cart_id', 'cart-123');

        $fourthwall = Mockery::mock(FourthwallService::class);
        $fourthwall->shouldReceive('removeFromCart')
            ->once()
            ->with('cart-123', 'variant-789')
            ->andReturn(['id' => 'cart-123', 'items' => []]);

        $helper = new CartHelper($fourthwall);

        $this->assertTrue($helper->removeFromCart('variant-789'));
    }

    public function test_update_cart_formats_items_for_fourthwall(): void
    {
        Session::put('fourthwall_cart_id', 'cart-123');

        $fourthwall = Mockery::mock(FourthwallService::class);
        $fourthwall->shouldReceive('validateProductStock')
            ->once()
            ->with('variant-789')
            ->andReturn(['type' => 'UNLIMITED']);
        $fourthwall->shouldReceive('updateCart')
            ->once()
            ->with('cart-123', [
                ['variantId' => 'variant-789', 'quantity' => 4],
            ])
            ->andReturn(['id' => 'cart-123', 'items' => []]);

        $helper = new CartHelper($fourthwall);

        $this->assertTrue($helper->updateCart([
            ['variant_id' => 'variant-789', 'quantity' => 4],
        ]));
    }
}
