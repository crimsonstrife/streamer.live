<?php

namespace App\Services\Spam;

use App\Contracts\SpamEvaluator;
use App\Models\Comment;
use App\Services\SpamCheckService;
use Exception;

class BlacklistEvaluator implements SpamEvaluator
{
    public function __construct(protected SpamCheckService $checker)
    {
    }

    /**
     * @throws Exception
     */
    public function evaluate(Comment $comment): int
    {
        // +1 point for every registry match
        return $this->checker->countBlacklistMatches($comment->text);
    }
}
