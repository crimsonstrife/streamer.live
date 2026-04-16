<?php

use App\Console\Commands\CheckTwitchStreams;
use App\Console\Commands\CheckUpdatePermissions;
use App\Console\Commands\GenerateSitemap;
use App\Console\Commands\GeoIpUpdate;
use App\Console\Commands\PruneSelfUpdateLogs;
use App\Console\Commands\SyncFourthwallData;
use App\Console\Commands\SyncTwitchSchedule;
use App\Console\Commands\UpdateIPBlacklist;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Spatie\Health\Commands\RunHealthChecksCommand;
use Spatie\Health\Commands\ScheduleCheckHeartbeatCommand;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

$logDate = now()->format('Y-m-d');

Schedule::command(CheckTwitchStreams::class)->everyFiveMinutes()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/twitch-{$logDate}.log"));
Schedule::command(SyncTwitchSchedule::class)->hourly()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/twitch-{$logDate}.log"));
Schedule::command(SyncFourthwallData::class)->everyFifteenMinutes()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/fourthwall-sync-{$logDate}.log"));
Schedule::command(PruneSelfUpdateLogs::class)->hourly()->withoutOverlapping()->appendOutputTo(storage_path("logs/self-update-{$logDate}.log"));
Schedule::command(RunHealthChecksCommand::class)->everyFiveMinutes()->withoutOverlapping()->appendOutputTo(storage_path("logs/health-checks-{$logDate}.log"));
Schedule::command(ScheduleCheckHeartbeatCommand::class)->everyMinute()->withoutOverlapping()->appendOutputTo(storage_path("logs/health-heartbeat-{$logDate}.log"));
Schedule::command('horizon:snapshot')->everyFiveMinutes()->withoutOverlapping()->appendOutputTo(storage_path("logs/horizon-snapshot-{$logDate}.log"));
Schedule::command(GeoIpUpdate::class)->daily()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/geoip-update-{$logDate}.log"));
Schedule::command(UpdateIPBlacklist::class)->daily()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/ip-blacklist-update-{$logDate}.log"));
Schedule::command(GenerateSitemap::class)->daily()->withoutOverlapping()->runInBackground()->appendOutputTo(storage_path("logs/sitemap-{$logDate}.log"));
Schedule::command(CheckUpdatePermissions::class)->daily()->withoutOverlapping()->appendOutputTo(storage_path("logs/update-permissions-{$logDate}.log"));
