<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\FabricatorPageController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Utilities\ShopHelper;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Support\Facades\Route;
use Laravel\Jetstream\Http\Controllers\TeamInvitationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// added the middleware but only to this group, the Filament routes are unaffected
Route::middleware([PreventRequestsDuringMaintenance::class])->group(function () {
    $shopSlug = ShopHelper::getShopSlug();               // 'shop'
    $productSlug = ShopHelper::getProductSlug();         // 'product'
    $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'

    if (! app()->environment('production')) {
        Log::info('Shop: '.ShopHelper::getShopSlug());
        Log::info('Product: '.ShopHelper::getProductSlug());
        Log::info('Collection: '.ShopHelper::getCollectionSlug());
    }

    // Homepage
    Route::get('/', FabricatorPageController::class)->name('fabricator.page.home');

    // === Cart Routes ===
    Route::prefix("$shopSlug/cart")->name($shopSlug.'.cart.')->group(function () {
        Route::get('/', [CartController::class, 'showCart'])->name('show');
        Route::post('/add', [CartController::class, 'addToCart'])->name('add');
        Route::post('/update', [CartController::class, 'updateCart'])->name('update');
        Route::get('/remove/{variantId}', [CartController::class, 'removeFromCart'])->name('remove');
        Route::get('/checkout', [CartController::class, 'redirectToCheckout'])->name('checkout');
    });

    Route::get("$shopSlug/checkout/external", function () use ($shopSlug) {
        if ($url = session('checkout_url')) {
            return redirect()->away($url);
        }

        return redirect("/$shopSlug")->with('error', 'External checkout is not available.');
    })->name('cart.checkout.external');

    // All /shop/* routes
    Route::prefix($shopSlug)->name($shopSlug.'.')->group(function () {
        $productSlug = ShopHelper::getProductSlug();         // 'product'
        $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'
        Route::get("$productSlug/{slug}", [FabricatorPageController::class, 'product'])->name('product');
        Route::get("$collectionSlug/{slug}", [FabricatorPageController::class, 'collection'])->name('collection');
        Route::get('category/{slug}', [FabricatorPageController::class, 'category'])->name('category');
        Route::get('/', FabricatorPageController::class)->name('page');
        Route::get('{slug}', FabricatorPageController::class)->where('slug', '.*')->name('fabricator.page.shop.fallback');
    });
    Route::post("/$productSlug/{product}/review", [ProductReviewController::class, 'store'])
        ->middleware('auth')
        ->name('product.review.submit');

    // Global fallback for all other Fabricator pages (e.g. /blog, /about, etc.)
    Route::get('/{slug}', FabricatorPageController::class)
        ->where('slug', '.*')
        ->name('fabricator.page.global.fallback');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', fn () => view('dashboard'))->name('dashboard');

Route::get('/team-invitations/{invitation}', [TeamInvitationController::class, 'accept'])
    ->middleware(['signed', 'verified', 'auth', AuthenticateSession::class])
    ->name('team-invitations.accept');
