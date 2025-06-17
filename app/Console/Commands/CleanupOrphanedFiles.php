<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Media;

class CleanupOrphanedFiles extends Command
{
    protected $signature = 'media:cleanup-orphans';
    protected $description = 'Remove orphaned files from storage';

    public function handle()
    {
        $files = collect(glob(storage_path('public/*'))); // TODO: Adjust path as needed, need to assemble the subdirecties for media supporting models, since other folders and files are here.

        $orphans = $files->filter(function ($file) {
            $uuid = pathinfo($file, PATHINFO_FILENAME); // Assuming UUID as file name
            return ! Media::where('uuid', $uuid)->exists();
        });

        $orphans->each(function ($file) {
            try {
                unlink($file);
                $this->info("Deleted orphaned file: {$file}");
            } catch (\Throwable $e) {
                \Log::error('Failed to delete orphaned file.', [
                    'file_path' => $file,
                    'error_message' => $e->getMessage(),
                ]);
            }
        });

        $this->info('Orphan cleanup completed.');
    }
}
