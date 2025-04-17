<?php

namespace App\Search\Aspects;

use App\Models\Product;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class ProductSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Product::query()
            ->with(['categories', 'tags'])
            ->get()
            ->filter(function (Product $product) use ($term) {
                // Calculate score
                $score = 0;

                if (strcasecmp($product->name, $term) === 0) {
                    $score += 100;
                } elseif (stripos($product->name, $term) !== false) {
                    $score += 50;
                }

                if (stripos($product->description ?? '', $term) !== false) {
                    $score += 30;
                }

                foreach ($product->categories as $category) {
                    if (stripos($category->name, $term) !== false) {
                        $score += 25;
                    }
                }

                foreach ($product->tags as $tag) {
                    if (stripos($tag->name, $term) !== false) {
                        $score += 20;
                    }
                }

                $product->search_score = $score; // Attach a virtual attribute

                return $score > 0; // Only keep matching results
            });
    }
}
