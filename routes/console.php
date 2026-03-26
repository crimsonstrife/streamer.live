<?php

use App\Console\Commands\CheckTwitchStreams;
use App\Console\Commands\PruneSelfUpdateLogs;
use App\Console\Commands\SyncFourthwallData;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Spatie\Health\Commands\ScheduleCheckHeartbeatCommand;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(CheckTwitchStreams::class)->everyFiveMinutes();
Schedule::command(SyncFourthwallData::class)->everyFifteenMinutes();
Schedule::command(PruneSelfUpdateLogs::class)->hourly();
Schedule::command(ScheduleCheckHeartbeatCommand::class)->everyMinute();
