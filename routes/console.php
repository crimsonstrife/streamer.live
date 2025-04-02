<?php

use App\Console\Commands\CheckTwitchStreams;
use App\Jobs\CheckStreamerStatus;
use App\Services\DiscordBotService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(CheckTwitchStreams::class)->everyFiveMinutes();
