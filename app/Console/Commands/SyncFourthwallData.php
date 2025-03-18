<?php

namespace App\Console\Commands;

use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Console\Command;
use App\Services\FourthwallService;
use Illuminate\Support\Facades\Log;
use App\Jobs\ProcessProductImage;

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

        // Fetch collections
        $collections = $fourthwallService->getCollections();

        if (!isset($collections['results'])) {
            $this->error('No collections found.');
            Log::error('Failed to retrieve collections from Fourthwall API.');
            return;
        }

        // Process collections in chunks
        foreach (array_chunk($collections['results'], 5) as $collectionBatch) {
            foreach ($collectionBatch as $collectionData) {
                $collection = Collection::updateOrCreate(
                    ['provider_id' => $collectionData['id']],
                    [
                        'name' => $collectionData['name'],
                        'slug' => $collectionData['slug'],
                        'description' => $collectionData['description'] ?? null
                    ]
                );

                $this->info("Synced collection: {$collection->name}");

                // Fetch products for the collection
                $products = $fourthwallService->getCollectionProducts($collection->slug);

                if (!isset($products['results'])) {
                    Log::warning("No products found for collection: {$collection->name}");
                    continue;
                }

                // Process products in chunks
                foreach (array_chunk($products['results'], 5) as $productBatch) {
                    foreach ($productBatch as $productData) {
                        $product = Product::updateOrCreate(
                            ['provider_id' => $productData['id']],
                            [
                                'collection_id' => $collection->id,
                                'name' => $productData['name'],
                                'slug' => $productData['slug'],
                                'description' => $productData['description'] ?? null
                            ]
                        );

                        $this->info("Synced product: {$product->name}");

                        // Process variants in chunks
                        if (!empty($productData['variants'])) {
                            foreach (array_chunk($productData['variants'], 5) as $variantBatch) {
                                foreach ($variantBatch as $variantData) {
                                    ProductVariant::updateOrCreate(
                                        ['provider_id' => $variantData['id']],
                                        [
                                            'product_id' => $product->id,
                                            'name' => $variantData['name'],
                                            'price' => $variantData['unitPrice']['value'], // No need to multiply
                                            'currency' => $variantData['unitPrice']['currency']
                                        ]
                                    );
                                }
                            }
                        }

                        // Dispatch image processing jobs
                        if (!empty($productData['images'])) {
                            foreach ($productData['images'] as $imageData) {
                                // Ensure image data is valid before dispatching job
                                if (is_array($imageData) && isset($imageData['url'], $imageData['id'])) {
                                    ProcessProductImage::dispatch($product, $imageData);
                                } else {
                                    Log::warning("Skipping invalid image data for product: {$product->id}", $imageData ?? []);
                                }
                            }
                        }

                        // Clear product data to free memory
                        unset($productData);
                    }
                }

                // Collect garbage after processing a collection to free memory
                gc_collect_cycles();
            }
        }

        $this->info('Sync completed successfully.');
    }
}
