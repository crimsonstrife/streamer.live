<?php

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

Route::middleware([
    RoleMiddleware::class . ':Admin', // Admin role protection
])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('panel.show');
});

Route::middleware([
    RoleMiddleware::class . ':Moderator', // Moderator role protection
])->group(function () {
    Route::get('/moderation', [ModeratorController::class, 'index'])->name('moderation.panel');
});
