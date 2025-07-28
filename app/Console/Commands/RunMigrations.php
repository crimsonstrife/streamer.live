<?php

namespace App\Console\Commands;

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

        $this->call('migrate');

        $this->info('Migrations completed.');

        return CommandAlias::SUCCESS;
    }
}
