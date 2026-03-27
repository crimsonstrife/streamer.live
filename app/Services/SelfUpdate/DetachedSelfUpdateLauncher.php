<?php

namespace App\Services\SelfUpdate;

use Illuminate\Filesystem\Filesystem;
use RuntimeException;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

class DetachedSelfUpdateLauncher
{
    public function __construct(
        protected Filesystem $files
    ) {
    }

    public function dispatch(?string $version = null): void
    {
        $logFile = (string) config('self-update.log_file', storage_path('logs/self-update.log'));
        $this->files->ensureDirectoryExists(dirname($logFile));

        $process = Process::fromShellCommandline($this->buildCommand($logFile, $version), base_path());
        $process->run();

        if (! $process->isSuccessful()) {
            $message = trim($process->getErrorOutput());

            throw new RuntimeException($message !== ''
                ? $message
                : 'Unable to start the background self-update process.');
        }
    }

    protected function buildCommand(string $logFile, ?string $version = null): string
    {
        $phpBinary = (new PhpExecutableFinder())->find(false) ?: 'php';
        $segments = [
            'nohup',
            escapeshellarg($phpBinary),
            escapeshellarg(base_path('artisan')),
            'app:self-update',
        ];

        if ($version !== null && $version !== '') {
            $segments[] = escapeshellarg($version);
        }

        $segments[] = '--no-interaction';

        return implode(' ', $segments).' >> '.escapeshellarg($logFile).' 2>&1 < /dev/null &';
    }
}
