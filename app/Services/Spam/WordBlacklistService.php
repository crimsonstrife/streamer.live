<?php

namespace App\Services\Spam;

use App\Models\BlogObjects\Comment;
use App\Models\SpamFilterPattern;
use Exception;
use RuntimeException;

class WordBlacklistService
{
    public function __construct() {}

    /**
     * @throws Exception
     */
    public function checkWordBlacklists(Comment $comment): bool
    {
        // Load all patterns once
        $patterns = SpamFilterPattern::pluck('pattern');

        // Get Comment text
        $text = $comment->text;

        foreach ($patterns as $regex) {
            $ok = @preg_match("#{$regex}#i", $text);
            if ($ok === false) {
                throw new RuntimeException("Invalid regex: /{$regex}/");
            }
            if ($ok === 1) {
                return true;
            }
        }

        return false;
    }

    /**
     * Count how many distinct patterns match the given text.
     *
     * @throws Exception
     */
    public function countBlacklistMatches(string $text): int
    {
        // load all patterns once
        $patterns = SpamFilterPattern::pluck('pattern');

        $matches = 0;

        foreach ($patterns as $regex) {
            $ok = @preg_match("#{$regex}#i", $text);
            if ($ok === false) {
                throw new RuntimeException("Invalid spam regex: /{$regex}/");
            }
            if ($ok === 1) {
                $matches++;
            }
        }

        return $matches;
    }
}
