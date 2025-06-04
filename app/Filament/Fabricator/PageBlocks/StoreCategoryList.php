<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\Category;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreCategoryList extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-category-list')
            ->schema([
                TextInput::make('title')->label('Section Title')->required()->default('Shop by Category'),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'title' => $data['title'] ?? 'Shop by Category',
            'categories' => Category::where('type', 'product')->withCount('products')->orderBy('name')->get(),
        ];
    }
}
