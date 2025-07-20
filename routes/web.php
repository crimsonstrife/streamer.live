<?php

use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FabricatorPageController;
use App\Http\Controllers\IconController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TicketController;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Models\Font;
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

Route::any('/firewall/panel/{path?}', function () {

    $panel = new Panel();
    $panel->csrf(['_token' => csrf_token()]);
    $panel->entry();

})->where('path', '(.*)');

// added the middleware but only to this group, the Filament routes are unaffected
Route::middleware([PreventRequestsDuringMaintenance::class])->group(function () {
    $blogSlug = BlogHelper::getBlogSlug(); // 'blog'

    // Homepage
    Route::get('/', FabricatorPageController::class)->name('fabricator.page.home');

    Route::post('newsletter/subscribe', [NewsletterController::class, 'subscribe'])
        ->name('newsletter.subscribe');

    Route::get('newsletter/unsubscribe', [NewsletterController::class, 'showUnsubscribeForm'])
        ->name('newsletter.unsubscribe.form');

    Route::post('newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe'])
        ->name('newsletter.unsubscribe');

    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

    // User Dashboard
    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
        'firewall',
        'auth.banned',
        'ip.banned',
        'logout.banned',
    ])->group(function () {
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->name('dashboard');

        // List the current user’s tickets
        Route::get('tickets', [TicketController::class, 'index'])
            ->name('tickets.index');

        // Show the “create ticket” form
        Route::get('tickets/create', [TicketController::class, 'create'])
            ->name('tickets.create');

        // Store a brand-new ticket (with its initial customer message)
        Route::post('tickets', [TicketController::class, 'store'])
            ->name('tickets.store');

        // View a single ticket (public & private messages)
        Route::get('tickets/{ticket}', [TicketController::class, 'show'])
            ->name('tickets.show');

        // Post a public reply to a ticket (ticket owner only)
        Route::post('tickets/{ticket}/reply', [TicketController::class, 'reply'])
            ->name('tickets.reply');

        // Add an internal note to a ticket (staff only)
        Route::post('tickets/{ticket}/note', [TicketController::class, 'note'])
            ->name('tickets.note');

        Route::middleware(['store.enabled'])
            ->group(function () {
                $shopSlug = ShopHelper::getShopSlug();               // 'shop'
                $productSlug = ShopHelper::getProductSlug();         // 'product'
                $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'

                Route::prefix($shopSlug)->name($shopSlug.'.')->group(function () {
                    $productSlug = ShopHelper::getProductSlug();         // 'product'
                    $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'
                    // List the current user’s orders
                    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
                    // Show a single order’s details
                    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
                });
            });
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
    })->middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'signed',
        'auth.banned',
        'ip.banned',
        'logout.banned',
    ])->name('verification.verify');

    /**
     * Route for handling email verification notices.
     * This route is accessible via the '/email/verify' URL.
     * It uses the 'verification.notice' middleware.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::get('/email/verify', function () {
        return view('auth.verify-email');
    })->middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'auth.banned',
        'ip.banned',
        'logout.banned',
    ])->name('verification.notice');

    /**
     * Route to handle sending email verification link.
     * It uses the 'verification.send' middleware.
     * This route is accessible via the '/email/verify/send' URL.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::post('/email/verify/send', function () {
        return view('auth.verify-email');
    })->middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'auth.banned',
        'ip.banned',
        'logout.banned',
        'throttle:6,1',
    ])->name('verification.send');

    /**
     * Route for handling email verification completion.
     * This route is accessible via the '/email/verify/complete' URL.
     * It uses the 'verification.complete' middleware.
     *
     * @return \Illuminate\Contracts\View\View
     */
    Route::get('/email/verify/complete', function () {
        return view('auth.verify-email');
    })->middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'auth.banned',
        'ip.banned',
        'logout.banned',
    ])->name('verification.complete');

    Route::get('/team-invitations/{invitation}', [TeamInvitationController::class, 'accept'])
        ->middleware(['signed', 'verified', 'auth', AuthenticateSession::class])
        ->name('team-invitations.accept');

    Route::get('/search', SearchController::class)->name('search');

    Route::prefix($blogSlug)->name($blogSlug.'.')->group(function () {
        Route::get('/', [BlogController::class, 'index'])->name('index');
        Route::get('/{slug}', [BlogController::class, 'show'])->name('post');
        Route::post('/{post}/comment', [BlogCommentController::class, 'store'])
            ->middleware([
                'auth',
                'auth.banned',
                'ip.banned',
                'logout.banned',
            ])
            ->name('comment.submit');
        // Post reactions
        Route::post('/{post}/react/{type}', [ReactionController::class, 'togglePost'])
            ->name('reaction.toggle')
            ->middleware(
                [
                    'auth',
                    'auth.banned',
                    'ip.banned',
                    'logout.banned',
                ]
            );

        // Route::get('category/{slug}', [BlogController::class, 'category'])->name('category');

        // Comment reactions
        Route::post('comment/{comment}/react/{type}', [ReactionController::class, 'toggleComment'])
            ->name('comment.reaction.toggle')
            ->middleware([
                'auth',
                'auth.banned',
                'ip.banned',
                'logout.banned',
            ]);
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
                Route::get("$productSlug/{slug}", [StoreController::class, 'product'])->name('product');
                Route::get("$collectionSlug/{slug}", [StoreController::class, 'collection'])->name('collection');
                // Route::get('category/{slug}', [StoreController::class, 'category'])->name('category');
                Route::get('/', FabricatorPageController::class)->name('page');
                Route::get('{slug}', FabricatorPageController::class)->where('slug', '.*')->name('fabricator.page.shop.fallback');
                // List the current user’s orders
                Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
                // Show a single order’s details
                Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
            });
            Route::post("/$productSlug/{product}/review", [ProductReviewController::class, 'store'])
                ->middleware([
                    'auth',
                    'auth.banned',
                    'ip.banned',
                    'logout.banned',
                ])
                ->name('product.review.submit');
        });

    Route::get('/assets/fonts.css', function () {
        $fonts = Font::all();
        $css = '';

        foreach ($fonts as $font) {
            $url = $font->is_builtin
                ? Storage::url($font->file_path)
                : $font->getFirstMediaUrl('fonts');
            $wMin = $font->weight_min ?? 100;
            $wMax = $font->weight_max ?? 900;

            $css .= <<<CSS
@font-face {
    font-family: '{$font->slug}';
    src: url('{$url}') format('woff2');
    font-weight: {$wMin} {$wMax};
    font-style: normal;
    font-display: swap;
}

CSS;
        }

        return response($css, 200)
            ->header('Content-Type', 'text/css');
    })->name('assets.fonts.css');

    // Global fallback for Fabricator pages, but exclude any system URI
    Route::get('/{slug}', FabricatorPageController::class)
        ->where('slug', '^(?!api\/|public\/|storage\/|auth\/|build\/).*$')
        ->name('fabricator.page.global.fallback');
});

Route::middleware(['web', 'auth'])->post('/{panel}/onboarding/dismiss', [OnboardingController::class, 'dismiss'])->name('onboarding.dismiss');

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
    ->where('slug', '^(?!api\/|public\/|storage\/|auth\/|build\/).*$')
    ->name('fabricator.page.global.fallback');
