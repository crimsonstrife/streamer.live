<?php

namespace App\Filament\Admin\Pages;

use Filament\Pages\Page;
use Codedge\Updater\UpdaterManager;
use Filament\Notifications\Notification;

class Updates extends Page
{
    protected static ?string $navigationIcon = 'fas-cloud-arrow-down';
    protected static string $view = 'filament.admin.pages.updates';
    protected static ?string $navigationGroup = 'Settings';

    public string $currentVersion = '';
    public ?string $availableVersion = null;

    public function mount(UpdaterManager $updater): void
    {
        $this->currentVersion   = config('self-update.version_installed') ?? $updater->source()->getVersionInstalled();
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

    public function runUpdate()
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
            $version  = $updater->source()->getVersionAvailable();
            $release  = $updater->source()->fetch($version);
            $updater->source()->update($release);
            Notification::make()
                ->title("Updated to {$version}")
                ->success()
                ->send();
            // Refresh displayed versions:
            $this->mount($updater);
        } catch (\Throwable $e) {
            Notification::make()
                ->title('Update failed')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }
}
