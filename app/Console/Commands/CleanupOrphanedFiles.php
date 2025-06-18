<?php

namespace App\Console\Commands;

use App\Models\BlogObjects\Post;
use App\Models\Folder;
use App\Models\Hero;
use App\Models\StoreObjects\Product;
use Illuminate\Console\Command;
use App\Models\Media;
use Spatie\MediaLibrary\HasMedia;

class CleanupOrphanedFiles extends Command
{
    protected $signature = 'media:cleanup-orphans';
    protected $description = 'Remove orphaned files from storage';

    public function handle()
    {
        // Collect media-specific directories
        $mediaDirectories = $this->getMediaDirectories();

        $this->info('Scanning media directories for orphaned files...');

        foreach ($mediaDirectories as $directory) {
            $files = collect(glob("{$directory}/*"));

            $orphans = $files->filter(function ($file) {
                $uuid = pathinfo($file, PATHINFO_FILENAME); // Assuming UUID as file name
                return ! $this->mediaRecordExists($uuid);
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
        }

        $this->info('Orphan cleanup completed.');
    }

    /**
     * Get all media storage directories for models implementing HasMedia.
     *
     * @return array
     */
    protected function getMediaDirectories(): array
    {
        // Define models that implement the HasMedia interface
        $mediaModels = [
            Product::class,
            Post::class,
            Hero::class,
            Media::class,
            Folder::class,
            // Add other models that use media here
        ];

        $directories = [];

        foreach ($mediaModels as $modelClass) {
            if (in_array(HasMedia::class, class_implements($modelClass))) {
                /** @var HasMedia $instance */
                $instance = new $modelClass();

                // Assuming 'getMediaDirectory' generates the storage directory path for media
                $directories[] = storage_path("public/{$instance->getTable()}"); // Adjust path format if needed
            }
        }

        return $directories;
    }

    /**
     * Check if a media record exists for the given UUID.
     *
     * @param string $uuid
     * @return bool
     */
    protected function mediaRecordExists(string $uuid): bool
    {
        // Adjust the query logic if needed for a specific app
        return \DB::table('media')->where('uuid', $uuid)->exists();
    }

}
