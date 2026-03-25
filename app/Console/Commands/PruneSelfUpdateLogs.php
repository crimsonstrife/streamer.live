<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Carbon;

class PruneSelfUpdateLogs extends Command
{
    protected $signature = 'logs:prune-self-update';

    protected $description = 'Rotate and prune archived self-update logs.';

    public function __construct(
        protected Filesystem $files
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        if (! (bool) config('self-update.log_pruning.enabled', true)) {
            $this->components->info('Self-update log pruning is disabled.');

            return self::SUCCESS;
        }

        $logFile = (string) config('self-update.log_file', storage_path('logs/self-update.log'));
        $maxSizeBytes = (int) config('self-update.log_pruning.max_size_kb', 1024) * 1024;
        $retentionDays = max(1, (int) config('self-update.log_pruning.retention_days', 14));

        $this->rotateCurrentLogIfNeeded($logFile, $maxSizeBytes);
        $deletedArchives = $this->pruneArchivedLogs($logFile, $retentionDays);

        if ($deletedArchives > 0) {
            $this->components->info("Pruned {$deletedArchives} archived self-update log(s).");
        }

        return self::SUCCESS;
    }

    protected function rotateCurrentLogIfNeeded(string $logFile, int $maxSizeBytes): void
    {
        if (! $this->files->exists($logFile)) {
            return;
        }

        $fileSize = $this->files->size($logFile);

        if ($fileSize <= $maxSizeBytes) {
            return;
        }

        $archivePath = $this->buildArchivePath($logFile);

        $this->files->move($logFile, $archivePath);
        $this->files->ensureDirectoryExists(dirname($logFile));
        $this->files->put($logFile, '');

        $this->components->info("Archived oversized self-update log to {$archivePath}.");
    }

    protected function pruneArchivedLogs(string $logFile, int $retentionDays): int
    {
        $directory = dirname($logFile);

        if (! $this->files->isDirectory($directory)) {
            return 0;
        }

        $pathInfo = pathinfo($logFile);
        $baseName = $pathInfo['filename'] ?? 'self-update';
        $extension = $pathInfo['extension'] ?? 'log';
        $pattern = $directory.DIRECTORY_SEPARATOR.$baseName.'-*.'.$extension;
        $cutoff = Carbon::now()->subDays($retentionDays)->getTimestamp();
        $deleted = 0;

        foreach (glob($pattern) ?: [] as $archivePath) {
            if (! $this->files->exists($archivePath)) {
                continue;
            }

            if ($this->files->lastModified($archivePath) >= $cutoff) {
                continue;
            }

            $this->files->delete($archivePath);
            $deleted++;
        }

        return $deleted;
    }

    protected function buildArchivePath(string $logFile): string
    {
        $pathInfo = pathinfo($logFile);
        $directory = $pathInfo['dirname'] ?? storage_path('logs');
        $baseName = $pathInfo['filename'] ?? 'self-update';
        $extension = $pathInfo['extension'] ?? 'log';

        return $directory.DIRECTORY_SEPARATOR.$baseName.'-'.Carbon::now()->format('Ymd_His').'.'.$extension;
    }
}
