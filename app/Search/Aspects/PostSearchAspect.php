<?php

namespace App\Search\Aspects;

use App\Models\Post;
use Illuminate\Support\Collection;
use Spatie\Searchable\SearchAspect;

class PostSearchAspect extends SearchAspect
{
    public function getResults(string $term): Collection
    {
        return Post::all()
            ->filter(function (Post $post) use ($term) {
                $score = 0;

                // Exact match on title
                if (strcasecmp($post->title, $term) === 0) {
                    $score += 100;
                } // Partial match on title
                elseif (stripos($post->title, $term) !== false) {
                    $score += 50;
                }

                // Match in excerpt
                if ($post->excerpt && stripos($post->excerpt, $term) !== false) {
                    $score += 30;
                }

                // Match in content
                if ($post->content && stripos($post->content, $term) !== false) {
                    $score += 20;
                }

                // Match inside category name
                if ($post->category && stripos($post->category->name, $term) !== false) {
                    $score += 15;
                }

                // Match inside tags
                if ($post->tags->isNotEmpty()) {
                    foreach ($post->tags as $tag) {
                        if (stripos($tag->name, $term) !== false) {
                            $score += 10;
                        }
                    }
                }

                $post->search_score = $score;

                return $score > 0;
            });
    }
}
