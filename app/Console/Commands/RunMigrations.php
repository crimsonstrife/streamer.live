<?php

namespace App\Console\Commands;

use App\Utilities\SchemaCache;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;

class RunMigrations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updater:run-migrations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run outstanding migrations after an update';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Running database migrations...');

        $exitCode = $this->call('migrate', [
            '--force' => true,
        ]);

        if ($exitCode !== CommandAlias::SUCCESS) {
            $this->error('Database migrations failed.');

            return CommandAlias::FAILURE;
        }

        // Schema may have changed — drop the in-process hasTable() cache so
        // long-lived workers don't keep serving stale answers.
        SchemaCache::flush();

        $this->info('Migrations completed.');

        return CommandAlias::SUCCESS;
    }
}
