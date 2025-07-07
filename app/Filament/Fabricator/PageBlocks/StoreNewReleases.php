<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\Promotion;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreNewReleases extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-new-releases')
            ->schema([
                TextInput::make('title')->label('Section Title')->default('New Releases')->required(),
                TextInput::make('product_count')->label('Number of Products to show')->numeric()->default(4)->required(),
            ]);
    }

    public static function mutateData(array $data): array
    {
        // pull LIVE promotions from database
        $orderPromotions = Promotion::where('status', 'Live')
            ->where('applies_to', 'ENTIRE_ORDER')
            ->get();

        $productPromotions = Promotion::where('status', 'Live')
            ->where('applies_to', 'SELECTED_PRODUCTS')
            ->with('products')   // eager-load the pivot
            ->get();

        return [
            'title' => $data['title'] ?? 'New Releases',
            'products' => Product::latest()->take($data['product_count'])->get(),
            'orderPromotions'  => $orderPromotions,
            'productPromotions' => $productPromotions,
        ];
    }
}
