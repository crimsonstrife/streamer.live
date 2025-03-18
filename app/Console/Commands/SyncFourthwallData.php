<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\FourthwallService;
use Illuminate\Support\Facades\Log;

class SyncFourthwallData extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'sync:fourthwall';

    /**
     * The console command description.
     */
    protected $description = 'Sync products and collections from Fourthwall API';

    /**
     * Execute the console command.
     */
    public function handle(FourthwallService $fourthwallService)
    {
        $this->info('Starting sync with Fourthwall API...');

        try {
            // This method will handle syncing collections and products efficiently
            $fourthwallService->syncCollectionsAndProducts();
        } catch (\Exception $e) {
            Log::error('Error during sync: ' . $e->getMessage());
            $this->error('An error occurred during sync. Check logs for details.');
            return;
        }

        $this->info('Sync completed successfully.');
    }
}
