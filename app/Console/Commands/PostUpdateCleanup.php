<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;

class PostUpdateCleanup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updater:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear Laravel caches after update';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Clearing caches...');

        foreach ([
            'cache:clear',
            'config:clear',
            'view:clear',
            'route:clear',
            'event:clear',
        ] as $command) {
            if ($this->callSilent($command) !== CommandAlias::SUCCESS) {
                $this->error("Command [{$command}] failed during cleanup.");

                return CommandAlias::FAILURE;
            }
        }

        $this->info('Caches cleared and recompiled.');

        return CommandAlias::SUCCESS;
    }
}
