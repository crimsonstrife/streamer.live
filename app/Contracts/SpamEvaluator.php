<?php

namespace App\Contracts;

use App\Models\BlogObjects\Comment;

interface SpamEvaluator
{
    /**
     * Examine the $comment and return a non-negative integer “points” value.
     */
    public function evaluate(Comment $comment): int;
}
