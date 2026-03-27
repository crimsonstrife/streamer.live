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

Schedule::command(CheckTwitchStreams::class)->everyFiveMinutes()->withoutOverlapping()->appendOutputTo(storage_path('logs/twitch.log'));
Schedule::command(SyncTwitchSchedule::class)->hourly()->withoutOverlapping()->appendOutputTo(storage_path('logs/twitch.log'));
Schedule::command(SyncFourthwallData::class)->everyFifteenMinutes()->withoutOverlapping()->appendOutputTo(storage_path('logs/fourthwall-sync.log'));
Schedule::command(PruneSelfUpdateLogs::class)->hourly()->withoutOverlapping()->appendOutputTo(storage_path('logs/self-update.log'));
Schedule::command(RunHealthChecksCommand::class)->everyFiveMinutes()->withoutOverlapping()->appendOutputTo(storage_path('logs/health-checks.log'));
Schedule::command(ScheduleCheckHeartbeatCommand::class)->everyMinute()->withoutOverlapping()->appendOutputTo(storage_path('logs/health-heartbeat.log'));
Schedule::command('horizon:snapshot')->everyFiveMinutes()->withoutOverlapping()->appendOutputTo(storage_path('logs/horizon-snapshot.log'));
Schedule::command(GeoIpUpdate::class)->daily()->withoutOverlapping()->appendOutputTo(storage_path('logs/geoip-update.log'));
Schedule::command(UpdateIPBlacklist::class)->daily()->withoutOverlapping()->appendOutputTo(storage_path('logs/ip-blacklist-update.log'));
Schedule::command(GenerateSitemap::class)->daily()->withoutOverlapping()->appendOutputTo(storage_path('logs/sitemap.log'));
Schedule::command(CheckUpdatePermissions::class)->daily()->withoutOverlapping()->appendOutputTo(storage_path('logs/update-permissions.log'));
