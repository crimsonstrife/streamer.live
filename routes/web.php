<?php

use Illuminate\Support\Facades\Route;
use Spatie\Permission\Middlewares\RoleMiddleware;

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
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
});

Route::middleware([
    RoleMiddleware::class . ':Moderator', // Moderator role protection
])->group(function () {
    Route::get('/moderation', [ModerationController::class, 'index'])->name('moderation.panel');
});
