<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;

class CheckUpdatePermissions extends Command
{
    protected $signature = 'app:check-update-permissions
                            {--path= : Override the directory to scan (defaults to base_path())}';

    protected $description = 'Scan application files for write-permission issues that would block a self-update';

    public function handle(): int
    {
        $directory = $this->option('path') ?: base_path();

        $skipSegments = array_merge(
            ['.git'],
            array_map(
                static fn (string $f) => trim($f, DIRECTORY_SEPARATOR),
                (array) config('self-update.exclude_folders', [])
            )
        );

        $this->info("Scanning: {$directory}");
        $this->info('Excluded segments: '.implode(', ', $skipSegments));
        $this->newLine();

        $base         = rtrim(realpath($directory) ?: $directory, DIRECTORY_SEPARATOR)
                      . DIRECTORY_SEPARATOR;
        $flags        = \FilesystemIterator::SKIP_DOTS | \FilesystemIterator::FOLLOW_SYMLINKS;
        $dirIter      = new \RecursiveDirectoryIterator($directory, $flags);
        $iterator     = new \RecursiveIteratorIterator($dirIter);
        $failCount    = 0;
        $checkedCount = 0;

        foreach ($iterator as $file) {
            /** @var \SplFileInfo $file */
            if (! $file->isFile()) {
                continue;
            }

            $realPath = $file->getRealPath();
            if ($realPath === false) {
                continue;
            }

            $relative     = str_starts_with($realPath, $base)
                ? substr($realPath, \strlen($base))
                : ltrim(str_replace($base, '', $realPath), DIRECTORY_SEPARATOR);
            $firstSegment = strstr($relative, DIRECTORY_SEPARATOR, true) ?: $relative;

            if (in_array($firstSegment, $skipSegments, true)) {
                continue;
            }

            $checkedCount++;

            if (! $file->isWritable()) {
                $this->line("<fg=red>  NOT WRITABLE:</> {$realPath}");
                $failCount++;
            }
        }

        $this->newLine();

        if ($failCount === 0) {
            $this->info("All {$checkedCount} checked files are writable. Self-update should proceed.");

            return CommandAlias::SUCCESS;
        }

        $this->error("{$failCount} of {$checkedCount} checked files are NOT writable.");
        $this->comment('Fix file ownership or permissions for the files listed above before running an update.');

        return CommandAlias::FAILURE;
    }
}
