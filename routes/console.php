<?php

use App\Jobs\CheckStreamerStatus;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new CheckStreamerStatus(config('services.twitch.channel_name')))
    ->everyFiveMinutes()
    ->name('check-streamer-status')
    ->withoutOverlapping()
    ->onSuccess(function () {
        Log::info('CheckStreamerStatus job completed successfully.');
    })
    ->onFailure(function (Throwable $e) {
        Log::error("CheckStreamerStatus job failed: {$e->getMessage()}");
    });
