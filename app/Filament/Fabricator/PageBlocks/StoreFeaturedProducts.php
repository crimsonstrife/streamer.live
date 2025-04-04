<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Product;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreFeaturedProducts extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-featured-products')
            ->schema([
                TextInput::make('title')->label('Block Title')->default('Featured Products')->required(),
                TextInput::make('description')->label('Block Description')->required()->default('Featured product selections from our store.'),
                TextInput::make('product_count')->label('How many products to show?')->numeric()->required()->default(4),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'title' => $data['title'] ?? 'Featured Products',
            'description' => $data['description'] ?? 'Featured product selections from our store.',
            'products' => Product::where('is_featured', true)->take($data['product_count'])->orderByDesc('created_at')->get(),
        ];
    }
}
