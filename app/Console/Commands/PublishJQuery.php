<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Command\Command as CommandAlias;

class PublishJQuery extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jquery:publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish JQuery assets to public directory';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Publishing JQuery assets...');

        $source = base_path('node_modules/jquery/dist');
        $destination = public_path('vendor/jquery');

        // Check if JQuery source directory exists
        if (!File::exists($source)) {
            $this->error('JQuery source directory not found at: {$source}');
            return CommandAlias::FAILURE;
        }

        // Remove existing JQuery directory if it exists
        if (File::exists($destination)) {
            $this->info('Removing existing JQuery directory...');
            File::deleteDirectory($destination);
        }

        // Copy JQuery source directory to public directory
        $this->info('Copying JQuery assets to public directory...');
        $status = File::copyDirectory($source, $destination);

        $mentionPluginSource = resource_path('node_modules/jquery-ui/');
        $mentionPluginDestination = public_path('vendor/jquery-ui');

        if ($status) {
            if (File::exists($mentionPluginSource)) {
                File::copyDirectory($mentionPluginSource, $mentionPluginDestination);
            }
        }

        if ($status && File::exists($mentionPluginDestination)) {
            $this->info('JQuery assets published successfully!');
            return CommandAlias::SUCCESS;
        } else {
            $this->error('Failed to publish JQuery assets!');
            return CommandAlias::FAILURE;
        }
    }
}
