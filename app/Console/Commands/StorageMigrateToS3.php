<?php

namespace App\Console\Commands;

use App\Models\Media;
use App\Models\User;
use App\Services\CustomMediaPathGenerator;
use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StorageMigrateToS3 extends Command
{
    protected $signature = 'storage:migrate-to-s3
        {--disk=s3 : Target disk name (any S3-compatible disk defined in config/filesystems.php)}
        {--dry-run : Show what would be copied, write nothing, do not update database rows}
        {--media : Limit scope to Spatie Media Library + user profile photos}
        {--public : Limit scope to public/ static assets (build, vendor, js, css)}
        {--only= : Comma-separated subset of public/ subdirs (default: build,vendor,js,css)}
        {--force : Re-upload files even if already present on the target disk}';

    protected $description = 'Copy locally-stored media and public assets to an S3-compatible disk (idempotent).';

    private string $targetDisk;

    private bool $dryRun;

    private bool $force;

    private int $copied = 0;

    private int $skipped = 0;

    private int $failed = 0;

    public function handle(): int
    {
        $this->targetDisk = (string) $this->option('disk');
        $this->dryRun = (bool) $this->option('dry-run');
        $this->force = (bool) $this->option('force');

        if (! $this->validateTargetDisk()) {
            return self::FAILURE;
        }

        $doMedia = (bool) $this->option('media') || ! $this->option('public');
        $doPublic = (bool) $this->option('public') || ! $this->option('media');

        $this->line("Target disk: <info>{$this->targetDisk}</info>");
        if ($this->dryRun) {
            $this->warn('DRY-RUN mode — no files will be copied and no database rows updated.');
        }

        if (! $this->dryRun && ! $this->confirm("Proceed with migration to '{$this->targetDisk}'?", true)) {
            $this->comment('Aborted.');

            return self::SUCCESS;
        }

        if ($doMedia) {
            $this->migrateMediaLibrary();
            $this->migrateProfilePhotos();
        }

        if ($doPublic) {
            $this->migratePublicAssets();
        }

        $this->newLine();
        $this->info("Done. Copied: {$this->copied} | Skipped: {$this->skipped} | Failed: {$this->failed}");

        return $this->failed > 0 ? self::FAILURE : self::SUCCESS;
    }

    private function validateTargetDisk(): bool
    {
        $config = config("filesystems.disks.{$this->targetDisk}");

        if (! $config) {
            $this->error("Disk '{$this->targetDisk}' is not defined in config/filesystems.php.");

            return false;
        }

        if (($config['driver'] ?? null) === 's3') {
            $missing = [];
            foreach (['key' => 'AWS_ACCESS_KEY_ID', 'secret' => 'AWS_SECRET_ACCESS_KEY', 'region' => 'AWS_DEFAULT_REGION', 'bucket' => 'AWS_BUCKET'] as $k => $env) {
                if (empty($config[$k])) {
                    $missing[] = $env;
                }
            }
            if ($missing) {
                $this->error('Missing credentials for S3 target: '.implode(', ', $missing));

                return false;
            }
        }

        return true;
    }

    private function migrateMediaLibrary(): void
    {
        $this->newLine();
        $this->line('<comment>→ Spatie Media Library</comment>');

        $total = Media::query()->count();
        if ($total === 0) {
            $this->line('  No media records — skipping.');

            return;
        }

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $pathGen = app(CustomMediaPathGenerator::class);

        Media::query()->orderBy('id')->chunkById(100, function ($batch) use ($bar, $pathGen) {
            foreach ($batch as $media) {
                $this->migrateSingleMedia($media, $pathGen);
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine();
    }

    private function migrateSingleMedia(Media $media, CustomMediaPathGenerator $pathGen): void
    {
        if ($media->disk === $this->targetDisk) {
            $this->skipped++;

            return;
        }

        try {
            $source = Storage::disk($media->disk);
            $target = Storage::disk($this->targetDisk);

            $directory = rtrim($pathGen->getPath($media), '/');
            foreach ($source->allFiles($directory) as $path) {
                $this->copyFile($source, $target, $path);
            }

            if (! $this->dryRun) {
                DB::table('media')
                    ->where('id', $media->id)
                    ->update([
                        'disk' => $this->targetDisk,
                        'conversions_disk' => $this->targetDisk,
                    ]);
            }
        } catch (\Throwable $e) {
            $this->failed++;
            $this->newLine();
            $this->error("  Media #{$media->id}: {$e->getMessage()}");
        }
    }

    private function migrateProfilePhotos(): void
    {
        if (! class_exists(User::class) || ! \Schema::hasColumn((new User)->getTable(), 'profile_photo_path')) {
            return;
        }

        $query = User::query()->whereNotNull('profile_photo_path');
        $total = $query->count();
        if ($total === 0) {
            return;
        }

        $sourceDiskName = config('jetstream.profile_photo_disk', 'public');
        if ($sourceDiskName === $this->targetDisk) {
            return;
        }

        $this->newLine();
        $this->line('<comment>→ User profile photos</comment>');

        $source = Storage::disk($sourceDiskName);
        $target = Storage::disk($this->targetDisk);

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $query->orderBy('id')->chunkById(200, function ($users) use ($bar, $source, $target) {
            foreach ($users as $user) {
                try {
                    $path = $user->profile_photo_path;
                    if ($path && $source->exists($path)) {
                        $this->copyFile($source, $target, $path);
                    }
                } catch (\Throwable $e) {
                    $this->failed++;
                    $this->newLine();
                    $this->error("  User #{$user->id}: {$e->getMessage()}");
                }
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine();
    }

    private function migratePublicAssets(): void
    {
        $this->newLine();
        $this->line('<comment>→ public/ static assets</comment>');

        $only = (string) ($this->option('only') ?? '');
        $dirs = $only !== ''
            ? array_values(array_filter(array_map('trim', explode(',', $only))))
            : ['build', 'vendor', 'js', 'css'];

        $target = Storage::disk($this->targetDisk);

        foreach ($dirs as $sub) {
            $root = public_path($sub);
            if (! is_dir($root)) {
                $this->line("  <comment>{$sub}/ not present — skipping.</comment>");

                continue;
            }

            $files = $this->collectFiles($root);
            $count = count($files);
            if ($count === 0) {
                continue;
            }

            $this->line("  {$sub}/ — {$count} files");
            $bar = $this->output->createProgressBar($count);
            $bar->start();

            $publicRootLen = strlen(public_path()) + 1;

            foreach ($files as $abs) {
                try {
                    $rel = str_replace('\\', '/', substr($abs, $publicRootLen));

                    if (! $this->force && $target->exists($rel) && $target->size($rel) === filesize($abs)) {
                        $this->skipped++;
                        $bar->advance();

                        continue;
                    }

                    if (! $this->dryRun) {
                        $stream = fopen($abs, 'rb');
                        $target->writeStream($rel, $stream);
                        if (is_resource($stream)) {
                            fclose($stream);
                        }
                    }
                    $this->copied++;
                } catch (\Throwable $e) {
                    $this->failed++;
                    $this->newLine();
                    $this->error("  {$abs}: {$e->getMessage()}");
                }
                $bar->advance();
            }

            $bar->finish();
            $this->newLine();
        }
    }

    private function collectFiles(string $root): array
    {
        $out = [];
        $iter = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($root, \FilesystemIterator::SKIP_DOTS)
        );
        foreach ($iter as $entry) {
            if ($entry->isFile() && $entry->getFilename() !== '.DS_Store') {
                $out[] = $entry->getPathname();
            }
        }

        return $out;
    }

    private function copyFile(Filesystem $source, Filesystem $target, string $path): void
    {
        if (! $this->force && $target->exists($path) && $target->size($path) === $source->size($path)) {
            $this->skipped++;

            return;
        }

        if (! $this->dryRun) {
            $stream = $source->readStream($path);
            $target->writeStream($path, $stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }

        $this->copied++;
    }
}
