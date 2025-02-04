<?php

use App\Models\Page;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
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

// Blog Page (Dynamic)
Route::get('/blog', function () {
    $blogPage = Page::where('slug', config('cms.blog_page_slug'))->first();
    return $blogPage ? view('pages.index', ['page' => $blogPage]) : abort(404);
})->name('blog');

// Dynamic Page Routing
Route::get('/{slug}', function ($slug) {
    $page = Page::where('slug', $slug)->firstOrFail();
    return view('pages.show', ['page' => $page]);
})->where('slug', '^[a-z0-9-]+$');

// Dynamic Post Routing: /category/post-slug
Route::get('/{category}/{postSlug}', function ($category, $postSlug) {
    $category = Category::where('slug', $category)->firstOrFail();
    $post = Post::where('slug', $postSlug)->where('category_id', $category->id)->firstOrFail();
    return view('posts.show', compact('post'));
})->where(['category' => '^[a-z0-9-]+$', 'postSlug' => '^[a-z0-9-]+$']);
