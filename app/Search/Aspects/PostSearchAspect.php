<?php

namespace App\Search\Aspects;

use App\Models\Post;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class PostSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Post::query()
            ->where('title', 'like', "%{$term}%")
            ->orWhere('content', 'like', "%{$term}%")
            ->orWhere('excerpt', 'like', "%{$term}%")
            ->orWhereHas('category', fn ($q) => $q->where('name', 'like', "%{$term}%"))
            ->orWhereHas('tags', fn ($q) => $q->where('name->en', 'like', "%{$term}%"))
            ->get();
    }
}
