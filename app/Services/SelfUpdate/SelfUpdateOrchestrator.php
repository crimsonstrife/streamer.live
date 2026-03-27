<?php

namespace App\Services\SelfUpdate;

use Codedge\Updater\Contracts\UpdaterContract;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class SelfUpdateOrchestrator
{
    public function __construct(
        protected UpdaterContract $updater,
        protected ConfiguredCommandRunner $commandRunner,
        protected InstalledVersionStore $installedVersionStore
    ) {
    }

    public function execute(?string $requestedVersion = null): string
    {
        $source = $this->updater->source();
        $targetVersion = $requestedVersion ?: $source->getVersionAvailable();

        $this->commandRunner->runPhase('pre_update');

        $release = $source->fetch($targetVersion);
        $appliedVersion = $release->getVersion() ?: $targetVersion;

        Log::info('self-update: applying release', [
            'version'      => $appliedVersion,
            'storage_path' => $release->getStoragePath(),
        ]);

        if (! $source->update($release)) {
            Log::error('self-update: update() returned false — update was not applied', [
                'version'      => $appliedVersion,
                'storage_path' => $release->getStoragePath(),
            ]);

            throw new RuntimeException('Failed to apply the downloaded update.');
        }

        $this->commandRunner->runPhase('post_update');
        $this->installedVersionStore->persist($appliedVersion);

        Log::info('self-update: release applied successfully', ['version' => $appliedVersion]);

        return $appliedVersion;
    }
}
