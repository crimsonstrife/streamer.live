<?php

use App\Models\Page;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;
use Spatie\Permission\Middleware\RoleMiddleware;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ModeratorController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

// Home Page (Dynamic)
Route::get('/', function () {
    $homePage = Page::where('slug', config('cms.home_page_slug'))->first();
    return $homePage ? view('pages.show', ['page' => $homePage]) : abort(404);
})->name('home');

// Fetch the dynamic blog slug from the settings
$postsPage = Page::where('slug', config('cms.posts_page_slug'))->first();
$blogSlug = $postsPage ? $postsPage->slug : 'blog';

// Posts Index Page (Dynamic)
Route::get("/{$blogSlug}", function () use ($postsPage) {
    if (!$postsPage) abort(404);

    $posts = Post::where('status', 'published')->orderBy('published_at', 'desc')->paginate(10);

    return view('pages.blog', compact('postsPage', 'posts'));
})->name('blog');

// Category Routing: /{blogSlug}/{category}
Route::get("/{$blogSlug}/{categorySlug}", function ($categorySlug) {
    $category = Category::where('slug', $categorySlug)->firstOrFail();
    $posts = Post::where('category_id', $category->id)->where('status', 'published')->orderBy('published_at', 'desc')->paginate(10);

    return view('categories.show', compact('category', 'posts'));
})->where('categorySlug', '^[a-z0-9-]+$')->name('blog.category');

// Post Routing: /{blogSlug}/{category}/{postSlug}
Route::get("/{$blogSlug}/{category}/{postSlug}", function ($category, $postSlug) {
    $category = Category::where('slug', $category)->firstOrFail();
    $post = Post::where('slug', $postSlug)->where('category_id', $category->id)->firstOrFail();

    return view('posts.show', compact('post'));
})->where(['category' => '^[a-z0-9-]+$', 'postSlug' => '^[a-z0-9-]+$'])->name('blog.post');

// Dynamic Page Routing for other pages (Fallback)
Route::get('/{slug}', function ($slug) {
    $page = Page::where('slug', $slug)->firstOrFail();
    return view('pages.show', compact('page'));
})->where('slug', '^[a-z0-9-]+$')->name('page.show');
