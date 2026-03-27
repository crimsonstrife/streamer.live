<?php

namespace App\Listeners;

use Codedge\Updater\Events\UpdateFailed;
use Illuminate\Support\Facades\Log;

class LogUpdateFailed
{
    public function handle(UpdateFailed $event): void
    {
        $release = null;
        try {
            $prop = new \ReflectionProperty($event, 'release');
            $prop->setAccessible(true);
            $release = $prop->getValue($event);
        } catch (\ReflectionException) {
            // property not accessible
        }

        Log::error('self-update: UpdateFailed event from codedge/laravel-selfupdater', [
            'release_version' => $release && method_exists($release, 'getVersion')
                ? $release->getVersion()
                : 'unknown',
            'storage_path'    => $release && method_exists($release, 'getStoragePath')
                ? $release->getStoragePath()
                : 'unknown',
        ]);
    }
}
