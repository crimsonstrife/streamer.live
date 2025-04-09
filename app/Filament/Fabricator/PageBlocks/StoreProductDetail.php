<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Page;
use App\Models\Product;
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
        return $data;
    }
}
