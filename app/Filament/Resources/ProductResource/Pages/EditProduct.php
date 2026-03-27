<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Filament\Traits\EnsuresDraftContext;
use DB;
use Indra\RevisorFilament\Filament\EditRecord;

class EditProduct extends EditRecord
{
    use EnsuresDraftContext;

    protected static string $resource = ProductResource::class;

    protected function afterSave(): void
    {
        $product = $this->record;

        // Extract the custom fields from form data
        $moreDetails = $this->data['more_details'] ?? null;
        $productInfo = $this->data['product_information'] ?? null;

        // Store or update in additional_product_data
        DB::table('additional_product_data')->updateOrInsert(
            ['product_id' => $product->id],
            [
                'more_details' => $moreDetails,
                'product_information' => $productInfo,
                'updated_at' => now(),
            ]
        );
    }
}
