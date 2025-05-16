<?php

namespace App\Services\Spam;

use App\Contracts\SpamEvaluator;
use App\Models\Comment;
use Exception;

class AkismetEvaluator implements SpamEvaluator
{
    public function __construct(protected AkismentSpamService $checker) {}

    /**
     * @throws Exception
     */
    public function evaluate(Comment $comment): int
    {
        // if Akismet flags it, give it 5 points; otherwise 0
        return $this->checker->checkAkismet($comment) ? 5 : 0;
    }
}
