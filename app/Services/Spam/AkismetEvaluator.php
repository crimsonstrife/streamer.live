<?php

namespace App\Services\Spam;

use App\Contracts\SpamEvaluator;
use App\Models\Comment;
use App\Services\SpamCheckService;
use Exception;

// your existing wrapper

class AkismetEvaluator implements SpamEvaluator
{
    public function __construct(protected SpamCheckService $checker) {}

    /**
     * @throws Exception
     */
    public function evaluate(Comment $comment): int
    {
        // if Akismet flags it, give it 5 points; otherwise 0
        return $this->checker->checkAkismet($comment) ? 5 : 0;
    }
}
