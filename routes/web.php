<?php

use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FabricatorPageController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\SearchController;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Utilities\BlogHelper;
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
    $blogSlug = BlogHelper::getBlogSlug();               // 'blog'

    // Homepage
    Route::get('/', FabricatorPageController::class)->name('fabricator.page.home');

    // User Dashboard
    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
    ])->group(function () {
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->name('dashboard');
    });

    /**
     * Route for verifying email address after registration.
     * uses the 'verification.verify' middleware.
     * This route is accessible via the '/email/verify/{id}/{hash}' URL.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::get('/email/verify/{id}/{hash}', function () {
        return view('auth.verify-email');
    })->middleware(['auth:sanctum', config('jetstream.auth_session'), 'signed'])->name('verification.verify');

    /**
     * Route for handling email verification notices.
     * This route is accessible via the '/email/verify' URL.
     * It uses the 'verification.notice' middleware.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::get('/email/verify', function () {
        return view('auth.verify-email');
    })->middleware(['auth:sanctum', config('jetstream.auth_session')])->name('verification.notice');

    /**
     * Route to handle sending email verification link.
     * It uses the 'verification.send' middleware.
     * This route is accessible via the '/email/verify/send' URL.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::post('/email/verify/send', function () {
        return view('auth.verify-email');
    })->middleware(['auth:sanctum', config('jetstream.auth_session'), 'throttle:6,1'])->name('verification.send');

    /**
     * Route for handling email verification completion.
     * This route is accessible via the '/email/verify/complete' URL.
     * It uses the 'verification.complete' middleware.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::get('/email/verify/complete', function () {
        return view('auth.verify-email');
    })->middleware(['auth:sanctum', config('jetstream.auth_session')])->name('verification.complete');

    Route::get('/team-invitations/{invitation}', [TeamInvitationController::class, 'accept'])
        ->middleware(['signed', 'verified', 'auth', AuthenticateSession::class])
        ->name('team-invitations.accept');

    Route::get('/search', SearchController::class)->name('search');

    Route::prefix($blogSlug)->name($blogSlug.'.')->group(function () use ($blogSlug) {
        Route::get('/', FabricatorPageController::class)->name('index');
        Route::get('/{slug}', [FabricatorPageController::class, 'post'])->name('post');
        Route::post("$blogSlug/{post}/comment", [BlogCommentController::class, 'store'])
            ->middleware('auth')
            ->name('comment.submit');
        // Post reactions
        Route::post('/{post}/react/{type}', [ReactionController::class, 'togglePost'])
            ->name('reaction.toggle')
            ->middleware('auth');

        // Comment reactions
        Route::post('/comment/{comment}/react/{type}', [ReactionController::class, 'toggleComment'])
            ->name('comment.reaction.toggle')
            ->middleware('auth');
    });

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

    // Global fallback for all other Fabricator pages
    Route::get('/{slug}', FabricatorPageController::class)
        ->where('slug', '.*')
        ->name('fabricator.page.global.fallback');
});

/**
 * Define a fallback route that will be executed when no other routes match.
 * This is useful for handling 404 errors and displaying a custom error page.
 */
Route::fallback(function () {
    Log::error('Fallback route triggered', ['url' => request()->url()]);
    abort(404);
});
