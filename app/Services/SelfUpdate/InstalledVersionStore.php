<?php

namespace App\Services\SelfUpdate;

use RuntimeException;

class InstalledVersionStore
{
    public function __construct(
        protected ?string $environmentPath = null
    ) {
    }

    public function persist(string $version): void
    {
        $path = $this->environmentPath ?? base_path('.env');
        $lines = file_exists($path) ? (file($path, FILE_IGNORE_NEW_LINES) ?: []) : [];
        $updated = false;

        foreach ($lines as $index => $line) {
            if (str_starts_with($line, 'SELF_UPDATER_VERSION_INSTALLED=')) {
                $lines[$index] = "SELF_UPDATER_VERSION_INSTALLED={$version}";
                $updated = true;
                break;
            }
        }

        if (! $updated) {
            $lines[] = "SELF_UPDATER_VERSION_INSTALLED={$version}";
        }

        $contents = implode(PHP_EOL, $lines).PHP_EOL;

        if (file_put_contents($path, $contents) === false) {
            throw new RuntimeException("Unable to persist installed version to [{$path}].");
        }
    }
}
