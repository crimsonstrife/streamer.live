<?php

use App\Http\Controllers\IconController;
use App\Http\Controllers\Webhook\FourthwallWebhookController;
use App\Models\Icon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/webhooks/fourthwall', FourthwallWebhookController::class);

/**
 * Route for fetching icon svg files/code
 * This route is accessible via the '/icon/{id}/svg' URL.
 *
 * @param  int|null  $id
 * @return \Illuminate\Http\Response
 */
Route::get('/icon/{id}/svg', static function (?int $id) {
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
