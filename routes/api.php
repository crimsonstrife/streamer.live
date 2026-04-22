<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SponsorController as SponsorApiController;
use App\Http\Controllers\EmoteController;
use App\Http\Controllers\IconController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Webhook\FourthwallWebhookController;
use App\Http\Controllers\Webhook\StripeWebhookController;
use App\Models\Icon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());

Route::post('/webhooks/fourthwall', FourthwallWebhookController::class);
Route::post('/webhooks/stripe', StripeWebhookController::class);

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
    Route::get('collections/{slug}/products', [ProductController::class, 'byCollection']);

    // Public sponsor goal endpoints (filterable by ?tag= or ?tags=foo,bar):
    Route::get('sponsor/goals', [SponsorApiController::class, 'index']);
    Route::get('sponsor/goals/{slug}', [SponsorApiController::class, 'show']);
    Route::get('sponsor/goals/{slug}/donors', [SponsorApiController::class, 'donors']);
});
