<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncVersionEnv extends Command
{
    protected $signature = 'updater:sync-version-env';

    protected $description = 'Update SELF_UPDATER_VERSION_INSTALLED in .env based on .env.example';

    public function handle(): int
    {
        $example = base_path('.env.example');
        $env = base_path('.env');

        if (! file_exists($example) || ! file_exists($env)) {
            $this->error('One or both .env files are missing.');

            return 1;
        }

        $exampleVersion = $this->extractVersion($example);
        if (! $exampleVersion) {
            $this->error('SELF_UPDATER_VERSION_INSTALLED not found in .env.example');

            return 1;
        }

        $updated = false;
        $lines = file($env);

        foreach ($lines as &$line) {
            if (str_starts_with($line, 'SELF_UPDATER_VERSION_INSTALLED=')) {
                $line = "SELF_UPDATER_VERSION_INSTALLED={$exampleVersion}\n";
                $updated = true;
                break;
            }
        }

        if (! $updated) {
            $lines[] = "SELF_UPDATER_VERSION_INSTALLED={$exampleVersion}\n";
        }

        file_put_contents($env, implode('', $lines));

        $this->info("Updated .env to version {$exampleVersion}");

        return 0;
    }

    protected function extractVersion(string $file): ?string
    {
        foreach (file($file) as $line) {
            if (str_starts_with($line, 'SELF_UPDATER_VERSION_INSTALLED=')) {
                return trim(explode('=', $line, 2)[1]);
            }
        }

        return null;
    }
}
