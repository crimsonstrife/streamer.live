<?php

use App\Jobs\CheckStreamerStatus;
use App\Services\DiscordBotService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('discord:quicktest', function (DiscordBotService $discord) {
    $discord->sendMessage(config('discord.channel_id'), 'Quick test from routes/console.php!');
    $this->info('Quick test message sent.');
});

Schedule::command('alerts:check-streams')->everyFiveMinutes();

Schedule::job(new CheckStreamerStatus(config('services.twitch.channel_name')), 'default')
    ->everyFiveMinutes()
    ->name('check-streamer-status')
    ->withoutOverlapping()
    ->onSuccess(function () {
        Log::info('CheckStreamerStatus job completed successfully.');
    })
    ->onFailure(function (Throwable $e) {
        Log::error("CheckStreamerStatus job failed: {$e->getMessage()}");
    });
