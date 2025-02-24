<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Command\Command as CommandAlias;

class PublishTinyMCE extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tinymce:publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish TinyMCE assets to public directory';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Publishing TinyMCE assets...');

        $source = base_path('vendor/tinymce/tinymce');
        $destination = public_path('vendor/tinymce');

        // Check if TinyMCE source directory exists
        if (!File::exists($source)) {
            $this->error('TinyMCE source directory not found at: {$source}');
            return CommandAlias::FAILURE;
        }

        // Remove existing TinyMCE directory if it exists
        if (File::exists($destination)) {
            $this->info('Removing existing TinyMCE directory...');
            File::deleteDirectory($destination);
        }

        // Copy TinyMCE source directory to public directory
        $this->info('Copying TinyMCE assets to public directory...');
        $status = File::copyDirectory($source, $destination);

        $mentionPluginSource = resource_path('tinymce-addons/mention');
        $mentionPluginDestination = public_path('vendor/tinymce/plugins/mention');

        if ($status) {
            if (File::exists($mentionPluginSource)) {
                File::copyDirectory($mentionPluginSource, $mentionPluginDestination);
            }
        }

        if ($status && File::exists($mentionPluginDestination)) {
            $this->info('TinyMCE assets published successfully!');
            return CommandAlias::SUCCESS;
        } else {
            $this->error('Failed to publish TinyMCE assets!');
            return CommandAlias::FAILURE;
        }
    }
}
