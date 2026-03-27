<?php

namespace App\Console\Commands;

use Froiden\LaravelInstaller\Helpers\InstalledFileManager;
use Illuminate\Console\Command;

class InstallerFinish extends Command
{
    protected $signature = 'installer:finish';

    protected $description = 'Mark the application as installed and disable the web installer';

    public function handle(InstalledFileManager $installer): void
    {
        $installer->update();
        $this->info('Application marked as installed; installer routes will now be disabled.');
    }
}
