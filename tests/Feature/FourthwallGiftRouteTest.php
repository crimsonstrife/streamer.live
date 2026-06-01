<?php

namespace Tests\Feature;

use App\Http\Controllers\OpeningGiftController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class FourthwallGiftRouteTest extends TestCase
{
    public function test_shop_gift_link_routes_to_opening_gift_controller_before_shop_fallback(): void
    {
        $route = Route::getRoutes()->match(Request::create('/shop/gifts/gft_test123', 'GET'));

        $this->assertSame(OpeningGiftController::class, $route->getActionName());
    }

    public function test_shop_singular_gift_link_routes_to_opening_gift_controller(): void
    {
        $route = Route::getRoutes()->match(Request::create('/shop/gift/gft_test123', 'GET'));

        $this->assertSame(OpeningGiftController::class, $route->getActionName());
    }
}
