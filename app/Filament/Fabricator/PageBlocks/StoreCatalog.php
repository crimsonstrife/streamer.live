<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\Category;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductVariant;
use App\Models\StoreObjects\Promotion;
use Filament\Forms\Components\Builder\Block;
use Spatie\Tags\Tag;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreCatalog extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-catalog') // unique key (used as the block's "type")
            ->label('Store Catalog')        // this is just the label shown in the panel
            ->schema([
            ]);
    }

    public static function mutateData(array $data): array
    {
        $query = Product::query()->with(['categories', 'tags', 'variants', 'collections']);

        // Collection Filter
        if (request()->filled('collection')) {
            $query->whereHas(
                'collections',
                fn ($q) => $q->whereIn('slug', (array) request('collection'))
            );
        }

        // Category filter
        if (request()->filled('category')) {
            $query->whereHas(
                'categories',
                fn ($q) => $q->whereIn('slug', (array) request('category'))
            );
        }

        // Tag filter
        if (request()->filled('tag')) {
            $query->withAnyTags((array) request('tag'), 'product');
        }

        // Size filter (via variant)
        if (request()->filled('size')) {
            $query->whereHas(
                'variants',
                fn ($q) => $q->where('size', request('size'))
            );
        }

        // pull LIVE promotions from database
        $orderPromotions = Promotion::where('status', 'Live')
            ->where('applies_to', 'ENTIRE_ORDER')
            ->get();

        $productPromotions = Promotion::where('status', 'Live')
            ->where('applies_to', 'SELECTED_PRODUCTS')
            ->with('products')   // eager-load the pivot
            ->get();

        // Paginate
        $products = $query->latest()->paginate(9)->withQueryString();

        // Available sizes for sidebar
        $sizes = ProductVariant::select('size')
            ->whereNotNull('size')
            ->distinct()
            ->orderBy('size')
            ->pluck('size');

        return [
            'products' => $products,
            'collections' => Collection::orderBy('name')->get(),
            'categories' => Category::where('type', 'product')->orderBy('name')->get(),
            'tags' => Tag::getWithType('product'),
            'sizes' => $sizes,
            'filters' => request()->only(['category', 'tag', 'size']),
            'orderPromotions'  => $orderPromotions,
            'productPromotions' => $productPromotions,
        ];
    }
}
