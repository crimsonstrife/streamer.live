<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\Category;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\Promotion;
use App\Utilities\SchemaCache;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreProductGrid extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-product-grid')
            ->schema([
                TextInput::make('title')->label('Section Title')->required()->default('Products'),
                Select::make('category_id')->label('Filter by Category')->searchable()->nullable()
                    ->options(function () {
                        // if the table isn't there yet, return an empty list
                        if (! SchemaCache::hasTable('categories')) {
                            return [];
                        }

                        return Category::where('type', 'product')->orderBy('name')->pluck('name', 'id');
                    })
                    ->placeholder('All Categories'),
                TextInput::make('product_count')->label('Number of products to show')->numeric()->required()->default(12),
            ]);
    }

    public static function mutateData(array $data): array
    {
        $productQuery = Product::query()->with('categories');

        if (! empty($data['category_id'])) {
            $productQuery->whereHas('categories', function ($query) use ($data) {
                $query->where('categories.id', $data['category_id']);
            });
        }

        // pull LIVE promotions from database
        $orderPromotions = Promotion::live()
            ->visibleOnStorefront()
            ->entireOrder()
            ->get();

        $productPromotions = Promotion::live()
            ->visibleOnStorefront()
            ->selectedProducts()
            ->with('products')   // eager-load the pivot
            ->get();

        return [
            'title' => $data['title'] ?? 'Products',
            'products' => $productQuery->latest()->take($data['product_count'])->orderByDesc('created_at')->get(),
            'orderPromotions' => $orderPromotions,
            'productPromotions' => $productPromotions,
        ];
    }
}
