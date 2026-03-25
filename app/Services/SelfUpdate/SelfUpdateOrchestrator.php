<?php

namespace App\Services\SelfUpdate;

use Codedge\Updater\Contracts\UpdaterContract;
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

        if (! $source->update($release)) {
            throw new RuntimeException('Failed to apply the downloaded update.');
        }

        $this->commandRunner->runPhase('post_update');
        $this->installedVersionStore->persist($appliedVersion);

        return $appliedVersion;
    }
}
