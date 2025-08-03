<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\EmoteController;
use App\Http\Controllers\IconController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Webhook\FourthwallWebhookController;
use App\Models\Icon;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Retrieve the authenticated user.
 *
 * This route returns the authenticated user using the `Request` object.
 * The user is retrieved by calling the `user()` method on the `Request` object.
 * The route is protected by the `auth:api` middleware.
 *
 * @param  Request  $request  The request object.
 * @return Authenticatable|null The authenticated user or null if not authenticated.
 */
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

/**
 * API Routes for the authenticated user.
 *
 * @param  Request  $request
 * @return Authenticatable|null
 */
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes using Passport for authentication
Route::middleware('passport-api')->group(function () {
    Route::get('/passport-protected', function (Request $request) {
        return response()->json(['message' => 'This route uses Passport']);
    });
});

// Routes using Sanctum for authentication
Route::middleware('sanctum-api')->group(function () {
    Route::get('/sanctum-protected', function (Request $request) {
        return response()->json(['message' => 'This route uses Sanctum']);
    });
});

Route::post('/webhooks/fourthwall', FourthwallWebhookController::class);

/**
 * Route for fetching icon svg files/code
 * This route is accessible via the '/icon/{id}/svg' URL.
 *
 * @param  int|null  $id
 * @return \Illuminate\Http\Response
 */
Route::get('/icon/{id}/svg', function (?int $id) {
    $icon = Icon::find($id);
    if (! $icon) {
        return response()->json(['error' => 'Icon not found'], 404);
    }

    return response()->json([
        'blade_component' => $icon->is_builtin ? "{$icon->prefix}-{$icon->name}" : "custom-{$icon->prefix}-{$icon->name}",
        'svg_code' => $icon->svg_code,
        'svg_file_path' => $icon->svg_file_path,
    ]);
})->name('icon.svg');

/**
 *  API route for fetching all icons in the application.
 */
Route::get('/icons', [IconController::class, 'fetchIcons']);

Route::get('/emotes', [EmoteController::class, 'index']);

Route::middleware('api')->get('/users/search', [UserController::class, 'search'])->name('users.search');

Route::prefix('v1')->group(function () {
    // Public product endpoints:
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{product}', [ProductController::class, 'show']);
});
