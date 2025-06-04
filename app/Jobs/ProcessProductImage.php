<?php

namespace App\Jobs;

use App\Models\StoreObjects\Product;
use App\Services\FourthwallService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessProductImage implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public Product $product;
    public array $imageData;

    public function __construct(Product $product, array $imageData)
    {
        $this->product = $product;
        $this->imageData = $imageData;

        logger()->info("Job dispatched for product {$this->product->id}");
    }

    public function handle(FourthwallService $fourthwallService)
    {
        // Call the storeImage() method to process this image
        $fourthwallService->storeImage($this->product, null, $this->imageData);

        // Log that the image has been processed
        logger()->info("Processed image for product {$this->product->id}");
    }

    public function tags()
    {
        return ['ProcessProductImage', 'product:' . $this->product->id];
    }
}
