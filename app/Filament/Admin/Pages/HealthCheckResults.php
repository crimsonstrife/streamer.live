<?php

namespace App\Filament\Admin\Pages;

use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Artisan;
use ShuvroRoy\FilamentSpatieLaravelHealth\Pages\HealthCheckResults as BaseHealthCheckResults;
use Spatie\Health\Commands\RunHealthChecksCommand;

class HealthCheckResults extends BaseHealthCheckResults
{
    /**
     * Dispatch health checks after the HTTP response is sent rather than
     * running them synchronously. Some checks (e.g. SecurityAdvisoriesCheck)
     * make external HTTP calls that easily exceed the web server's
     * max_execution_time when run inline.
     */
    public function refresh(): void
    {
        defer(static function () {
            Artisan::call(RunHealthChecksCommand::class);
        });

        Notification::make()
            ->title(__('filament-spatie-health::health.pages.health_check_results.notifications.results_refreshed'))
            ->body('Checks are running in the background — refresh the page in a moment to see updated results.')
            ->success()
            ->send();
    }
}
