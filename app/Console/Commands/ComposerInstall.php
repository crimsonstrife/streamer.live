<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;
use Symfony\Component\Process\Process;

class ComposerInstall extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updater:composer-install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Used to run composer install after updates';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Running composer install...');

        $process = new Process(['composer', 'install', '--no-interaction', '--prefer-dist', '--no-dev', '--optimize-autoloader']);
        $process->setWorkingDirectory(base_path());
        $process->setTimeout(300); // 5 minutes

        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (! $process->isSuccessful()) {
            $this->error('Composer install failed!');

            return CommandAlias::FAILURE;
        }

        $this->info('Composer install completed successfully.');

        return CommandAlias::SUCCESS;
    }
}
