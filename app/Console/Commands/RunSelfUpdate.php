<?php

namespace App\Console\Commands;

use Codedge\Updater\UpdaterManager;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;

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
    public function handle(UpdaterManager $updater): int
    {
        $version = $this->argument('version') ?? $updater->source()->getVersionAvailable();
        $this->info("Updating to version: $version");

        $release = $updater->source()->fetch($version);

        $this->info("Fetched Release: " . $release->getRelease());

        $updated = $updater->source()->update($release);

        return $updated ? CommandAlias::SUCCESS : CommandAlias::FAILURE;
    }
}
