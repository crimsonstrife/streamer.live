<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Laravel\Telescope\EntryType;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;
use Throwable;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if (! config('telescope.enabled')) {
            return;
        }

        if (! $this->storageIsAvailable()) {
            config(['telescope.enabled' => false]);

            return;
        }

        $this->hideSensitiveRequestDetails();

        $isLocal = $this->app->environment('local') || env('FORCE_TELESCOPE_TRACKING', false);

        Telescope::filter(function (IncomingEntry $entry) use ($isLocal) {
            return $isLocal ||
                   $entry->isReportableException() ||
                   $entry->isFailedRequest() ||
                   $entry->isFailedJob() ||
                   $entry->isScheduledTask() ||
                   $entry->hasMonitoredTag() ||
                   $entry->type === EntryType::LOG;
        });
    }

    /**
     * Prevent sensitive request details from being logged by Telescope.
     */
    protected function hideSensitiveRequestDetails(): void
    {
        if ($this->app->environment('local') || env('FORCE_TELESCOPE_TRACKING', false)) {
            return;
        }

        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Register the Telescope gate.
     *
     * This gate determines who can access Telescope in non-local environments.
     */
    protected function gate(): void
    {
        Gate::define('viewTelescope', function ($user) {
            return $user->can('access-telescope') || $user->can('is-super-admin');
        });
    }

    private function storageIsAvailable(): bool
    {
        if (config('telescope.driver') !== 'database') {
            return true;
        }

        $connection = config('telescope.storage.database.connection');

        if (! $connection) {
            return true;
        }

        try {
            DB::connection($connection)->getPdo();

            return true;
        } catch (Throwable $e) {
            Log::warning('Telescope disabled because its storage connection is unavailable.', [
                'connection' => $connection,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }
}
