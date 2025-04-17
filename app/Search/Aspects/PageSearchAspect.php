<?php

namespace App\Search\Aspects;

use App\Models\Page;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class PageSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Page::all()
            ->filter(function (Page $page) use ($term) {
                $score = 0;
                $matchedFields = [];

                if (strcasecmp($page->title, $term) === 0) {
                    $score += 100;
                    $matchedFields[] = 'Title (Exact)';
                } elseif (stripos($page->title, $term) !== false) {
                    $score += 50;
                    $matchedFields[] = 'Title';
                }

                foreach ($page->blocks ?? [] as $block) {
                    if (! empty($block['data'])) {
                        foreach ($block['data'] as $value) {
                            if (is_string($value) && stripos($value, $term) !== false) {
                                $score += 20;
                                $matchedFields[] = 'Content';
                                break 2;
                            }
                        }
                    }
                }

                $page->search_score = $score;
                $page->matched_fields = $matchedFields;

                return $score > 0;
            });
    }
}
