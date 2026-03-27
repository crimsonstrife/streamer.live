<?php

/**
 * Override codedge/laravel-selfupdater's checkPermissions helper.
 *
 * The package's version scans ALL files recursively (including vendor/, storage/)
 * but does not respect exclude_folders, causing silent update failures when any
 * file in those directories is not writable by the PHP process.
 *
 * This file must be required before vendor/autoload.php (see public/index.php and
 * artisan) so the function_exists() guard in the package's helpers.php prevents
 * it from redefining our version.
 */
if (! function_exists('checkPermissions')) {
    function checkPermissions(string $directory): bool
    {
        // Mirror the self-update exclude_folders config defaults.
        // config() is not available at autoload time, so we hard-code the same values.
        $excludedFolders = [
            'vendor',
            'node_modules',
            'storage',
            'bootstrap/cache',
            '.git',
            'bower',
            '__MACOSX',
        ];

        $directoryIterator = new \RecursiveDirectoryIterator(
            $directory,
            \FilesystemIterator::SKIP_DOTS
        );

        $filterIterator = new \RecursiveCallbackFilterIterator(
            $directoryIterator,
            function (\SplFileInfo $file) use ($directory, $excludedFolders): bool {
                if ($file->isDir()) {
                    $relative = ltrim(
                        str_replace($directory, '', $file->getRealPath()),
                        DIRECTORY_SEPARATOR
                    );
                    foreach ($excludedFolders as $excluded) {
                        if ($relative === $excluded || str_starts_with($relative, $excluded.DIRECTORY_SEPARATOR)) {
                            return false;
                        }
                    }
                }

                return true;
            }
        );

        foreach (new \RecursiveIteratorIterator($filterIterator) as $file) {
            if ($file->isFile() && ! $file->isWritable()) {
                return false;
            }
        }

        return true;
    }
}
