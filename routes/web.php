<?php

use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FabricatorPageController;
use App\Http\Controllers\IconController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\SearchController;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Settings\TwitchSettings;
use App\Utilities\BlogHelper;
use App\Utilities\ShopHelper;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Support\Facades\Route;
use Laravel\Jetstream\Http\Controllers\TeamInvitationController;
use Laravel\Socialite\Facades\Socialite;
use Shieldon\Firewall\Panel;

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

Route::any('/firewall/panel/{path?}', function() {

    $panel = new Panel();
    $panel->csrf(['_token' => csrf_token()]);
    $panel->entry();

})->where('path', '(.*)');

// added the middleware but only to this group, the Filament routes are unaffected
Route::middleware([PreventRequestsDuringMaintenance::class])->group(function () {
    $blogSlug = BlogHelper::getBlogSlug();               // 'blog'

    // Homepage
    Route::get('/', FabricatorPageController::class)->name('fabricator.page.home');

    Route::post('newsletter/subscribe', [NewsletterController::class, 'subscribe'])
        ->name('newsletter.subscribe');

    Route::get('newsletter/unsubscribe', [NewsletterController::class, 'showUnsubscribeForm'])
        ->name('newsletter.unsubscribe.form');

    Route::post('newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe'])
        ->name('newsletter.unsubscribe');

    // User Dashboard
    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
        'firewall'
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

    Route::prefix($blogSlug)->name($blogSlug.'.')->group(function () {
        Route::get('/', FabricatorPageController::class)->name('index');
        Route::get('/{slug}', [FabricatorPageController::class, 'post'])->name('post');
        Route::post('/{post}/comment', [BlogCommentController::class, 'store'])
            ->middleware('auth')
            ->name('comment.submit');
        // Post reactions
        Route::post('/{post}/react/{type}', [ReactionController::class, 'togglePost'])
            ->name('reaction.toggle')
            ->middleware('auth');

        // Comment reactions
        Route::post('comment/{comment}/react/{type}', [ReactionController::class, 'toggleComment'])
            ->name('comment.reaction.toggle')
            ->middleware('auth');
    });

    Route::middleware(['store.enabled'])
        ->group(function () {
            $shopSlug = ShopHelper::getShopSlug();               // 'shop'
            $productSlug = ShopHelper::getProductSlug();         // 'product'
            $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'

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
        });

    // Global fallback for Fabricator pages, but exclude any system URI
    Route::get('/{slug}', FabricatorPageController::class)
        ->where('slug', '^(?!public\/|storage\/|auth\/|build\/).*$')
        ->name('fabricator.page.global.fallback');
});

// Kick off the OAuth flow, saving your “context” in session
Route::get('auth/twitch/redirect', function (Request $request) {
    $context = $request->query('context', 'user');
    session(['twitch_oauth_context' => $context]);

    return Socialite::driver('twitch')
        ->scopes(['user:read:subscriptions', 'channel:read:subscriptions'])
        ->redirect();
})->name('twitch.oauth.redirect');

Route::get('auth/twitch/callback', function (Request $request) {
    // Grab and clear your own context
    $context = session('twitch_oauth_context', 'user');
    session()->forget('twitch_oauth_context');

    // Attempt to get the user from Socialite
    try {
        $twitchUser = Socialite::driver('twitch')->user();
    } catch (Exception $e) {
        Log::error('Socialite error', ['message' => $e->getMessage()]);
        throw $e; // or redirect with error
    }

    if ($context === 'admin') {
        // Admin (streamer) flow: save into settings
        /** @var TwitchSettings $settings */
        $settings = app(TwitchSettings::class);
        $settings->user_access_token = $twitchUser->token;
        $settings->user_refresh_token = $twitchUser->refreshToken;
        $settings->user_token_expires = now()->addSeconds($twitchUser->expiresIn);

        $saved = $settings->save();
    } else {
        // Visitor flow: save on the User model
        $user = Auth::user();
        if ($user) {
            $user->twitch_user_token = $twitchUser->token;
            $user->twitch_user_refresh = $twitchUser->refreshToken;
            $user->twitch_user_expires_at = now()->addSeconds($twitchUser->expiresIn);

            $saved = $user->save();
        } else {
            Log::warning('Twitch callback: no authenticated user to save visitor token.');
        }
    }

    return redirect($context === 'admin' ? '/admin' : '/')
        ->with('success', 'Twitch account linked successfully!');
})->name('twitch.oauth.callback');

Route::resource('icons', IconController::class)
    ->only(['store', 'index']);

Route::get('/{slug}', FabricatorPageController::class)
    // don’t match any system URI
    ->where('slug', '^(?!public\/|storage\/|auth\/|build\/).*$')
    ->name('fabricator.page.global.fallback');

Route::fallback(static function () {
    $path = request()->path();

    // if it’s an asset under public/ or build/, we don’t want to handle it here
    if (Str::startsWith($path, 'public/') || Str::startsWith($path, 'build/') || Str::startsWith($path, 'storage/') || Str::startsWith($path, 'auth/')) {
        $path = request()->path();                 // e.g. "build/assets/icons/…"

        // If it begins with "public/", remove that so it points at the public/ folder correctly
        if (Str::startsWith($path, 'public/')) {
            $path = substr($path, strlen('public/'));
        }

        $file = public_path($path);                // resolves to /full/project/public/build/…

        if (file_exists($file) && is_file($file)) {
            // Let Laravel serve the static asset
            return Response::file($file);
        }
    }

    // otherwise it really is a missing “page”
    Log::error('Fallback route triggered', ['url' => request()->url()]);
    abort(404);
});
