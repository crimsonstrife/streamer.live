<?php

namespace App\Utilities;

use App\Models\Product;
use App\Models\Collection;
use Illuminate\Support\Str;

class PageResolver
{
    public static function match(string $slug): ?array
    {
        // Attempt to match as product
        if (Str::contains($slug, '/product/')) {
            $productSlug = Str::afterLast($slug, '/product/');
            $product = Product::with(['images', 'variants'])->where('slug', $productSlug)->first();

            if ($product) {
                return [
                    'layout' => 'store-product',
                    'data' => ['product' => $product],
                ];
            }
        }

        // Attempt to match as collection
        if (Str::contains($slug, '/collection/')) {
            $collectionSlug = Str::afterLast($slug, '/collection/');
            $collection = Collection::with(['products.images', 'products.variants'])->where('slug', $collectionSlug)->first();

            if ($collection) {
                return [
                    'layout' => 'store-collection',
                    'data' => ['collection' => $collection],
                ];
            }
        }

        return null;
    }
}
