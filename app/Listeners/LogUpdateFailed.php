<?php

namespace App\Listeners;

use Codedge\Updater\Events\UpdateFailed;
use Illuminate\Support\Facades\Log;

class LogUpdateFailed
{
    public function handle(UpdateFailed $event): void
    {
        Log::error('self-update: UpdateFailed event from codedge/laravel-selfupdater', [
            'release_version' => method_exists($event->release, 'getVersion')
                ? $event->release->getVersion()
                : 'unknown',
            'storage_path'    => method_exists($event->release, 'getStoragePath')
                ? $event->release->getStoragePath()
                : 'unknown',
        ]);
    }
}
