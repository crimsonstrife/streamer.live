<?php

if (! \function_exists('checkPermissions')) {
    /**
     * Override of codedge/laravel-selfupdater's global checkPermissions().
     *
     * The vendor version iterates ALL files under base_path() — including .git/ objects,
     * vendor/, storage/, etc. — and returns false on the first non-writable file found.
     * In production these paths are typically not writable by the PHP process, so the
     * check always silently fails before a single application file is evaluated.
     *
     * This override skips:
     *   - .git/  (never part of a release update)
     *   - Every path listed in config('self-update.exclude_folders')
     *
     * It logs a warning naming the exact non-writable file so administrators have a
     * concrete diagnostic path when an update fails.
     */
    function checkPermissions(string $directory): bool
    {
        $base = rtrim(realpath($directory) ?: $directory, DIRECTORY_SEPARATOR)
              . DIRECTORY_SEPARATOR;

        $skipSegments = array_merge(
            ['.git'],
            array_map(
                static fn (string $f) => trim($f, DIRECTORY_SEPARATOR),
                (array) config('self-update.exclude_folders', [])
            )
        );

        $flags    = \FilesystemIterator::SKIP_DOTS | \FilesystemIterator::FOLLOW_SYMLINKS;
        $dirIter  = new \RecursiveDirectoryIterator($directory, $flags);
        $iterator = new \RecursiveIteratorIterator($dirIter);

        foreach ($iterator as $file) {
            /** @var \SplFileInfo $file */
            $realPath = $file->getRealPath();
            if ($realPath === false) {
                continue;
            }

            // Derive the first path segment relative to the base directory.
            $relative     = str_starts_with($realPath, $base)
                ? substr($realPath, \strlen($base))
                : ltrim(str_replace($base, '', $realPath), DIRECTORY_SEPARATOR);
            $firstSegment = strstr($relative, DIRECTORY_SEPARATOR, true) ?: $relative;

            if (in_array($firstSegment, $skipSegments, true)) {
                continue;
            }

            if ($file->isFile() && ! $file->isWritable()) {
                \Illuminate\Support\Facades\Log::warning(
                    'self-update: checkPermissions found non-writable file',
                    ['path' => $realPath]
                );

                return false;
            }
        }

        return true;
    }
}
