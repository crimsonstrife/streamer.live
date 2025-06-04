<?php

namespace App\Search\Aspects;

use App\Models\StoreObjects\Product;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class ProductSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Product::with(['categories', 'tags'])
            ->get()
            ->filter(function (Product $product) use ($term) {
                $score = 0;
                $matchedFields = [];

                if (strcasecmp($product->name, $term) === 0) {
                    $score += 100;
                    $matchedFields[] = 'Name (Exact)';
                } elseif (stripos($product->name, $term) !== false) {
                    $score += 50;
                    $matchedFields[] = 'Name';
                }

                if ($product->description && stripos($product->description, $term) !== false) {
                    $score += 30;
                    $matchedFields[] = 'Description';
                }

                foreach ($product->categories as $category) {
                    if (stripos($category->name, $term) !== false) {
                        $score += 25;
                        $matchedFields[] = 'Category';
                    }
                }

                foreach ($product->tags as $tag) {
                    if (stripos($tag->name, $term) !== false) {
                        $score += 20;
                        $matchedFields[] = 'Tag';
                    }
                }

                if (property_exists($product, 'is_featured') && $product->is_featured) {
                    $score += 20;
                    $matchedFields[] = 'Featured';
                }

                $product->search_score = $score;
                $product->matched_fields = $matchedFields;

                return $score > 0;
            });
    }
}
