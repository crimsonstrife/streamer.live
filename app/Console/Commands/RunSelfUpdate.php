<?php

namespace App\Console\Commands;

use App\Services\SelfUpdate\SelfUpdateOrchestrator;
use App\Services\SelfUpdate\SelfUpdateStatusStore;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;
use Throwable;

class RunSelfUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:self-update {version?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run the self-update process using codedge/laravel-selfupdater';

    /**
     * Execute the console command.
     */
    public function handle(SelfUpdateOrchestrator $orchestrator, SelfUpdateStatusStore $statusStore): int
    {
        $version = $this->argument('version');

        $this->info($version
            ? "Updating to version: {$version}"
            : 'Updating to the latest available version');

        try {
            $statusStore->markRunning($version !== null ? (string) $version : null);

            $appliedVersion = $orchestrator->execute($version);
            $statusStore->markSucceeded($appliedVersion);

            $this->info("Updated to version: {$appliedVersion}");

            return CommandAlias::SUCCESS;
        } catch (Throwable $e) {
            $statusStore->markFailed($version !== null ? (string) $version : null, $e->getMessage());
            report($e);
            $this->error($e->getMessage());

            return CommandAlias::FAILURE;
        }
    }
}
