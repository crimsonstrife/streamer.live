<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\StoreObjects\Product;
use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class StoreRelatedProducts extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('store-related-products')
            ->schema([
                //
            ]);
    }

    public static function mutateData(array $data): array
    {
        // Try to get product from the page (Fabricator-aware)
        $page = request()->attributes->get('page');
        $product = $page->product ?? null;

        // Fallback: try to get from the URL slug (e.g., /shop/product/{slug})
        if (! $product && $slug = request()->segment(3)) {
            $product = Product::with(['tags', 'categories'])->where('slug', $slug)->first();
        }

        $data['product'] = $product;

        if (! $product) {
            $data['related'] = collect();

            return $data;
        }

        // Related by tags
        $relatedByTags = Product::withAnyTags($product->tags, 'product')
            ->where('id', '!=', $product->id)
            ->take(6)
            ->get();

        $related = $relatedByTags;

        if ($relatedByTags->count() < 6) {
            $relatedByCategories = Product::whereHas('categories', function ($query) use ($product) {
                $query->whereIn('categories.id', $product->categories->pluck('id'));
            })
                ->where('id', '!=', $product->id)
                ->take(6 - $relatedByTags->count())
                ->get();

            $related = $relatedByTags->merge($relatedByCategories)->unique('id');
        }

        $data['related'] = $related;

        return $data;
    }
}
