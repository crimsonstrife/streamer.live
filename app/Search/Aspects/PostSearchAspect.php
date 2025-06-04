<?php

namespace App\Search\Aspects;

use App\Models\BlogObjects\Post;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class PostSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Post::with(['tags', 'category'])
            ->get()
            ->filter(function (Post $post) use ($term) {
                $score = 0;
                $matchedFields = [];

                if (strcasecmp($post->title, $term) === 0) {
                    $score += 100;
                    $matchedFields[] = 'Title (Exact)';
                } elseif (stripos($post->title, $term) !== false) {
                    $score += 50;
                    $matchedFields[] = 'Title';
                }

                if ($post->excerpt && stripos($post->excerpt, $term) !== false) {
                    $score += 30;
                    $matchedFields[] = 'Excerpt';
                }

                if ($post->content && stripos($post->content, $term) !== false) {
                    $score += 20;
                    $matchedFields[] = 'Content';
                }

                if ($post->category && stripos($post->category->name, $term) !== false) {
                    $score += 15;
                    $matchedFields[] = 'Category';
                }

                if ($post->tags->isNotEmpty()) {
                    foreach ($post->tags as $tag) {
                        if (stripos($tag->name, $term) !== false) {
                            $score += 10;
                            $matchedFields[] = 'Tag';
                            break; // only boost once per tags
                        }
                    }
                }

                // Featured Posts could get bonus points
                if (property_exists($post, 'is_featured') && $post->is_featured) {
                    $score += 20;
                    $matchedFields[] = 'Featured';
                }

                $post->search_score = $score;
                $post->matched_fields = $matchedFields;

                return $score > 0;
            });
    }
}
