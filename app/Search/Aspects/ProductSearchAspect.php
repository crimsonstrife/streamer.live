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
            ->where('name', 'like', "%{$term}%")
            ->orWhere('description', 'like', "%{$term}%")
            ->orWhereHas('categories', fn ($q) => $q->where('name', 'like', "%{$term}%"))
            ->orWhereHas('tags', fn ($q) => $q->where('name->en', 'like', "%{$term}%"))
            ->get();
    }
}
