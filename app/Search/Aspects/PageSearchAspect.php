<?php

namespace App\Search\Aspects;

use App\Models\Page;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;
use Spatie\Searchable\SearchResult;

class PageSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Page::all()
            ->filter(function (Page $page) use ($term) {
                // Match against the title
                if (stripos($page->title, $term) !== false) {
                    return true;
                }

                // Match against any block type or data field
                foreach ($page->blocks as $block) {
                    // Check data values
                    if (! empty($block['data'])) {
                        foreach ($block['data'] as $value) {
                            if (is_string($value) && stripos($value, $term) !== false) {
                                return true;
                            }
                        }
                    }
                }

                return false;
            })
            ->map(fn (Page $page) => new SearchResult(
                $page,
                $page->title,
                url(route('fabricator.page.global.fallback', $page->slug))
            ));
    }
}
