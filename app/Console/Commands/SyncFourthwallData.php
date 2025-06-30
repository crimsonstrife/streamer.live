<?php

namespace App\Console\Commands;

use App\Services\FourthwallService;
use Illuminate\Console\Command;
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
    public function handle(FourthwallService $fourthwallService): void
    {
        $this->info('Starting sync with Fourthwall API...');

        try {
            // This method will handle syncing collections and products efficiently
            $fourthwallService->syncCollectionsAndProducts();
            $this->info('Products and Collections Sync completed successfully.');
        } catch (\Exception $e) {
            Log::error('Error during sync: '.$e->getMessage());
            $this->error('An error occurred during sync. Check logs for details.');

            return;
        }

        try {
            $fourthwallService->syncPromotions();
            $this->info('Promotions sync completed successfully.');
        } catch (\Exception $e) {
            Log::error('Error during sync: '.$e->getMessage());
            $this->error('An error occurred during sync. Check logs for details.');

            return;
        }
    }
}
