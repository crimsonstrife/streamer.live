<?php

namespace App\Filament\Admin\Pages;

use Codedge\Updater\UpdaterManager;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

class Updates extends Page
{
    protected static ?string $navigationIcon = 'fas-cloud-arrow-down';

    protected static string $view = 'filament.admin.pages.updates';

    protected static ?string $navigationGroup = 'Settings';

    public string $currentVersion = '';

    public ?string $availableVersion = null;

    public array $releases = [];

    public ?string $selectedVersion = null;

    public function mount(UpdaterManager $updater): void
    {
        $this->currentVersion = $updater->source()->getVersionInstalled();
        $this->loadReleases();
    }

    public function loadReleases(): void
    {
        $updater = app(UpdaterManager::class);

        $this->releases = collect($updater->source()->getReleases()->json() ?? [])
            ->filter(function ($release) {
                return isset($release['tag_name']) &&
                    version_compare($release['tag_name'], $this->currentVersion, '>');
            })
            ->sortByDesc(function ($release) {
                return $release['tag_name'];
            })
            ->values()
            ->all();

        // Set the newest available version from the filtered list
        $this->availableVersion = $this->releases[0]['tag_name'] ?? null;
    }

    public function runSelectedUpdate(string $version): void
    {
        $this->selectedVersion = $version;
        if (! $this->selectedVersion) {
            Notification::make()
                ->title('No version selected')
                ->danger()
                ->send();

            return;
        }

        $updater = app(UpdaterManager::class);

        try {
            $release = $updater->source()->fetch($this->selectedVersion);
            $updated = $updater->source()->update($release);

            if ($updated) {
                $this->updateConfigVersion($this->selectedVersion);
                $this->currentVersion = $this->selectedVersion;
                $this->loadReleases();

                Notification::make()
                    ->title("Updated to {$this->selectedVersion}")
                    ->success()
                    ->send();
            } else {
                throw new RuntimeException('Update failed: updater returned false');
            }
        } catch (Throwable $e) {
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

    public function updateConfigVersion(string $newVersion): void
    {
        $configFilePath = config_path('self-update.php');
        if (! file_exists($configFilePath)) {
            throw new RuntimeException('Configuration file does not exist.');
        }

        $configContent = file_get_contents($configFilePath);
        $updatedContent = preg_replace(
            "/'version_installed'\s*=>\s*'[^']*'/",
            "'version_installed' => '{$newVersion}'",
            $configContent
        );

        if ($updatedContent !== null) {
            file_put_contents($configFilePath, $updatedContent);
        }
    }
}
