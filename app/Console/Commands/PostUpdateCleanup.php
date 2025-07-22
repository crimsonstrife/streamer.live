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

        $this->callSilent('cache:clear');
        $this->callSilent('config:clear');
        $this->callSilent('view:clear');
        $this->callSilent('route:clear');
        $this->callSilent('event:clear');

        $this->info('Caches cleared and recompiled.');

        return CommandAlias::SUCCESS;
    }
}
