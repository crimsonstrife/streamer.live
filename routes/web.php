<?php

use App\Models\Page;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Spatie\Permission\Middleware\RoleMiddleware;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\StoreController;
use App\Livewire\PageBuilder;

Route::get('/', static function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', static function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::middleware([
    'web',
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/admin/pages/{page}/builder', \App\Livewire\PageBuilder::class)->name('page.builder');
});

/**
 * Route for verifying email address after registration.
 * uses the 'verification.verify' middleware.
 * This route is accessible via the '/email/verify/{id}/{hash}' URL.
 *
 * @return \Illuminate\Contracts\View\View
 */
// Route::get('/email/verify/{id}/{hash}', function () {
//     return view('auth.verify-email');
// })->middleware(['auth:sanctum', config('jetstream.auth_session'), 'signed'])->name('verification.verify');

/**
 * Route for handling email verification notices.
 * This route is accessible via the '/email/verify' URL.
 * It uses the 'verification.notice' middleware.
 *
 * @return \Illuminate\Contracts\View\View
 */
// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware(['auth:sanctum', config('jetstream.auth_session')])->name('verification.notice');

/**
 * Route to handle sending email verification link.
 * It uses the 'verification.send' middleware.
 * This route is accessible via the '/email/verify/send' URL.
 *
 * @return \Illuminate\Contracts\View\View
 */
// Route::post('/email/verify/send', function () {
//     return view('auth.verify-email');
// })->middleware(['auth:sanctum', config('jetstream.auth_session'), 'throttle:6,1'])->name('verification.send');

/**
 * Route for handling email verification completion.
 * This route is accessible via the '/email/verify/complete' URL.
 * It uses the 'verification.complete' middleware.
 *
 * @return \Illuminate\Contracts\View\View
 */
// Route::get('/email/verify/complete', function () {
//     return view('auth.verify-email');
// })->middleware(['auth:sanctum', config('jetstream.auth_session')])->name('verification.complete');

/**
 * Define a fallback route that will be executed when no other routes match.
 * This is useful for handling 404 errors and displaying a custom error page.
 */
Route::fallback(static function () {
    \Log::error('Fallback route triggered', ['url' => request()->url()]);
    abort(404);
});

//Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Home Page (Dynamic)
Route::get('/', static function () {
    if (!app()->runningInConsole() && Schema::hasTable('pages')) {
        $homePage = Page::where('slug', config('cms.home_page_slug'))->first();
        return $homePage ? view('pages.show', ['page' => $homePage]) : abort(404);
    }

    return view('welcome'); // Default view if database isn't set up
})->name('home');

// Store Routes
Route::get('/store', [StoreController::class, 'index'])->name('store.index');
Route::get('/store/collection/{slug}', [StoreController::class, 'showCollection'])->name('store.collection');
Route::get('/store/product/{slug}', [StoreController::class, 'showProduct'])->name('store.product');
Route::post('/store/cart/add', [StoreController::class, 'addToCart'])->name('store.cart.add');
Route::post('/store/cart/remove', [StoreController::class, 'removeFromCart'])->name('store.cart.remove');
Route::get('/store/cart', [StoreController::class, 'viewCart'])->name('store.cart');

// Middleware-protected routes
Route::middleware([\App\Http\Middleware\EnsureDatabaseReady::class])->group(function () {
    // Fetch the dynamic blog slug from the settings
    $postsPage = Page::where('slug', config('cms.posts_page_slug'))->first();
    $blogSlug = $postsPage->slug ?? 'blog';

    // Blog Page (Dynamic)
    Route::get("/{$blogSlug}", static function () {
        $postsPage = Page::where('slug', config('cms.posts_page_slug'))->first();
        $posts = Post::where('status', 'published')->orderBy('published_at', 'desc')->paginate(10);
        return view('pages.blog', compact('postsPage', 'posts'));
    })->name('blog');

    // Category Routing: /{$blogSlug}/{category}
    Route::get("/{$blogSlug}/{categorySlug}", static function ($categorySlug) {
        $category = Category::where('slug', $categorySlug)->firstOrFail();
        $posts = Post::where('category_id', $category->id)->where('status', 'published')->orderBy('published_at', 'desc')->paginate(10);
        return view('categories.show', compact('category', 'posts'));
    })->where('categorySlug', '^[a-z0-9-]+$')->name('blog.category');

    // Post Routing: /{$blogSlug}/{category}/{postSlug}
    Route::get("/{$blogSlug}/{category}/{postSlug}", static function ($category, $postSlug) {
        $category = Category::where('slug', $category)->firstOrFail();
        $post = Post::where('slug', $postSlug)->where('category_id', $category->id)->firstOrFail();
        return view('posts.show', compact('post'));
    })->where(['category' => '^[a-z0-9-]+$', 'postSlug' => '^[a-z0-9-]+$'])->name('blog.post');

    // Dynamic Page Routing for other pages
    Route::get('/{slug}', static function ($slug) {
        $page = Page::where('slug', $slug)->firstOrFail();
        return view('pages.show', compact('page'));
    })->where('slug', '^[a-z0-9-]+$')->name('page.show');
});
