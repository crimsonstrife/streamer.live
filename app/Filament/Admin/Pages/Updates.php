<?php

namespace App\Filament\Admin\Pages;

use App\Services\SelfUpdate\DetachedSelfUpdateLauncher;
use App\Services\SelfUpdate\SelfUpdateStatusStore;
use Codedge\Updater\Contracts\UpdaterContract;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
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
    public string $updateState = 'idle';
    public ?string $updateStatusVersion = null;
    public ?string $updateStatusMessage = null;
    public ?string $updateStatusUpdatedAt = null;

    public function mount(): void
    {
        $this->currentVersion = app(UpdaterContract::class)->source()->getVersionInstalled();
        $this->loadReleases();
        $this->refreshUpdateStatus();
    }

    public function loadReleases(): void
    {
        $updater = app(UpdaterContract::class);
        $source = $updater->source();

        $this->currentVersion = $source->getVersionInstalled();
        $payload = $source->getReleases()->json();
        $releases = is_array($payload) ? $payload : [];

        $this->releases = collect($releases)
            ->filter(fn (array $release) => $this->isUpdateCandidate($release))
            ->sort(fn (array $left, array $right) => version_compare($right['tag_name'], $left['tag_name']))
            ->values()
            ->all();

        $this->availableVersion = $this->releases[0]['tag_name'] ?? null;
    }

    public function runSelectedUpdate(string $version): void
    {
        $this->selectedVersion = $version;
        $statusStore = app(SelfUpdateStatusStore::class);

        if (! $this->selectedVersion) {
            Notification::make()
                ->title('No version selected')
                ->danger()
                ->send();
            return;
        }

        if ($statusStore->isBusy()) {
            Notification::make()
                ->title('An update is already in progress')
                ->body('Wait for the current update to finish before starting another one.')
                ->warning()
                ->send();

            return;
        }

        try {
            $statusStore->markQueued($this->selectedVersion);
            app(DetachedSelfUpdateLauncher::class)->dispatch($this->selectedVersion);
            $this->refreshUpdateStatus();

            Notification::make()
                ->title("Update to {$this->selectedVersion} started")
                ->body('The update is running in the background. This page will refresh its status automatically.')
                ->success()
                ->send();
        } catch (Throwable $e) {
            $statusStore->markFailed($this->selectedVersion, $e->getMessage());
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

    public function refreshUpdateStatus(): void
    {
        $status = app(SelfUpdateStatusStore::class)->read();

        $this->updateState = $status['state'];
        $this->updateStatusVersion = $status['version'];
        $this->updateStatusMessage = $status['message'];
        $this->updateStatusUpdatedAt = $status['updated_at'];

        if ($this->updateState === 'succeeded' && $this->updateStatusVersion !== null) {
            $this->currentVersion = $this->updateStatusVersion;
            $this->synchronizeReleaseList();
        }
    }

    protected function isUpdateCandidate(array $release): bool
    {
        if (! isset($release['tag_name'])) {
            return false;
        }

        if (! version_compare($release['tag_name'], $this->currentVersion, '>')) {
            return false;
        }

        return $this->hasRequiredPackageAsset($release);
    }

    protected function hasRequiredPackageAsset(array $release): bool
    {
        $packageFileName = (string) config('self-update.repository_types.github.package_file_name', '');

        if ($packageFileName === '') {
            return true;
        }

        foreach ($release['assets'] ?? [] as $asset) {
            $assetName = (string) ($asset['name'] ?? '');

            if ($assetName === '') {
                continue;
            }

            if (Str::startsWith($packageFileName, 'regex:')) {
                $rawPattern = Str::after($packageFileName, 'regex:');
                $pattern = '~'.$rawPattern.'~';

                try {
                    $result = preg_match($pattern, $assetName);
                } catch (Throwable $e) {
                    Log::error('Invalid regex pattern for update asset matching', [
                        'pattern' => $rawPattern,
                        'package_file_name' => $packageFileName,
                        'preg_last_error' => preg_last_error(),
                        'message' => $e->getMessage(),
                    ]);

                    continue;
                }

                if ($result === false) {
                    Log::error('Invalid regex pattern for update asset matching', [
                        'pattern' => $rawPattern,
                        'package_file_name' => $packageFileName,
                        'preg_last_error' => preg_last_error(),
                    ]);

                    continue;
                }

                if ($result === 1) {
                    return true;
                }

                continue;
            }

            if (Str::contains($assetName, $packageFileName)) {
                return true;
            }
        }

        return false;
    }

    protected function synchronizeReleaseList(): void
    {
        $this->releases = collect($this->releases)
            ->filter(fn (array $release) => isset($release['tag_name']) && version_compare($release['tag_name'], $this->currentVersion, '>'))
            ->values()
            ->all();

        $this->availableVersion = $this->releases[0]['tag_name'] ?? null;
    }
}
