<?php

namespace App\Services\Spam;

use App\Contracts\SpamEvaluator;
use App\Models\BlogObjects\Comment;

class UrlEvaluator implements SpamEvaluator
{
    public function evaluate(Comment $comment): int
    {
        $text = $comment->text;

        // Count all http:// or https:// links (case-insensitive),
        // stopping at whitespace, quotes, or angle-brackets.
        preg_match_all(
            '/https?:\/\/[^\s\'"<>()]+/i',
            $text,
            $matches
        );

        return count($matches[0]);
    }
}
