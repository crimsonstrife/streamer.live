<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Page;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\Promotion;
use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreProductDetail extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-product-detail')
            ->label('Store: Product Detail')
            ->schema([]); // This block is dynamic, no input fields required.
    }

    public static function mutateData(array $data): array
    {
        // all live, entire-order promos
        $orderPromotions = Promotion::live()
            ->visibleOnStorefront()
            ->entireOrder()
            ->get();

        // all live, item-specific promos (with their products)
        $productPromotions = Promotion::live()
            ->visibleOnStorefront()
            ->selectedProducts()
            ->with('products')
            ->get();

        // merge back into the data array
        return array_merge($data, [
            'orderPromotions'   => $orderPromotions,
            'productPromotions' => $productPromotions,
        ]);
    }
}
