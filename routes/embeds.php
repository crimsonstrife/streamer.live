<?php

use App\Http\Controllers\Embeds\StreamStatusImageController;
use App\Http\Controllers\Embeds\StreamStatusSvgController;
use Illuminate\Support\Facades\Route;

Route::get('/embeds/status/{username}.svg', StreamStatusSvgController::class)
    ->where('username', '[A-Za-z0-9_]+')
    ->name('embeds.stream-status.svg');

Route::get('/embeds/status/{username}.{format}', StreamStatusImageController::class)
    ->where('username', '[A-Za-z0-9_]+')
    ->where('format', 'png|webp|gif')
    ->name('embeds.stream-status.image');
