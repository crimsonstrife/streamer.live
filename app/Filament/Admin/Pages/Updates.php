<?php

namespace App\Filament\Admin\Pages;

use Filament\Pages\Page;
use Codedge\Updater\UpdaterManager;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class Updates extends Page
{
    protected static ?string $navigationIcon = 'fas-cloud-arrow-down';
    protected static string $view = 'filament.admin.pages.updates';
    protected static ?string $navigationGroup = 'Settings';

    public string $currentVersion = '';
    public ?string $availableVersion = null;

    public function mount(UpdaterManager $updater): void
    {
        $this->currentVersion = config('self-update.version_installed') ?? $updater->source()->getVersionInstalled();

        if ($updater->source()->isNewVersionAvailable()) {
            $this->availableVersion = $updater->source()->getVersionAvailable();
        }
    }

    public function checkForUpdate(): void
    {
        $updater = app(UpdaterManager::class);

        $this->availableVersion = $updater->source()->isNewVersionAvailable()
            ? $updater->source()->getVersionAvailable()
            : null;

        Notification::make()
            ->title($this->availableVersion ? "Update Available" : "Up to Date")
            ->success()
            ->send();
    }

    public function runUpdate(): void
    {
        $updater = app(UpdaterManager::class);

        if (! $updater->source()->isNewVersionAvailable()) {
            Notification::make()
                ->title('No update found')
                ->danger()
                ->send();
            return;
        }

        try {
            $versionAvailable = $updater->source()->getVersionAvailable();
            $release = $updater->source()->fetch($versionAvailable);

            Log::info('Attempting to update', [
                'available_version' => $versionAvailable,
                'release_data' => $release,
            ]);

            $updated = $updater->source()->update($release);

            if ($updated) {
                Notification::make()
                    ->title("Updated to {$versionAvailable}")
                    ->success()
                    ->send();

                $this->updateConfigVersion($versionAvailable);
                $this->mount($updater);

                Log::info("Update successful to version {$versionAvailable}");
            } else {
                Log::warning('Updater returned false without exception', [
                    'version' => $versionAvailable,
                    'release' => $release,
                ]);

                throw new \Exception('Update failed: updater returned false');
            }
        } catch (\Throwable $e) {
            Log::error('Update failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            Notification::make()
                ->title('Update failed')
                ->body($e->getMessage() ?: 'No error message provided. Check logs.')
                ->danger()
                ->send();
        }
    }

    protected function updateConfigVersion(string $newVersion): void
    {
        $configFilePath = config_path('self-update.php');

        if (! file_exists($configFilePath)) {
            throw new \RuntimeException('Configuration file does not exist.');
        }

        $configContent = file_get_contents($configFilePath);

        $updatedContent = preg_replace(
            "/'version_installed'\s*=>\s*'[^']*'/",
            "'version_installed' => '{$newVersion}'",
            $configContent
        );

        if ($updatedContent !== null) {
            file_put_contents($configFilePath, $updatedContent);
        } else {
            throw new \RuntimeException('Failed to update the version in the configuration file.');
        }

        Log::info("Updated version_installed in config to {$newVersion}");
    }
}
