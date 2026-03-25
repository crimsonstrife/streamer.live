<?php

namespace App\Filament\Admin\Pages;

use Codedge\Updater\Contracts\UpdaterContract;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
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

    public function mount(UpdaterContract $updater): void
    {
        $this->currentVersion = $updater->source()->getVersionInstalled();
        $this->loadReleases();
    }

    public function loadReleases(): void
    {
        $updater = app(UpdaterContract::class);
        $payload = $updater->source()->getReleases()->json();
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

        if (! $this->selectedVersion) {
            Notification::make()
                ->title('No version selected')
                ->danger()
                ->send();
            return;
        }

        try {
            $exitCode = Artisan::call('app:self-update', [
                'version' => $this->selectedVersion,
            ]);

            if ($exitCode === 0) {
                $this->currentVersion = $this->selectedVersion;
                $this->loadReleases();

                Notification::make()
                    ->title("Updated to {$this->selectedVersion}")
                    ->success()
                    ->send();
            } else {
                $output = trim(Artisan::output());

                throw new RuntimeException($output !== '' ? $output : 'Update command failed. Check logs.');
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
}
