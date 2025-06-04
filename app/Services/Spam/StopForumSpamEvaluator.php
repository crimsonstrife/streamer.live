<?php

namespace App\Services\Spam;

use App\Contracts\SpamEvaluator;
use App\Models\BlogObjects\Comment;
use Illuminate\Contracts\Container\BindingResolutionException;

class StopForumSpamEvaluator implements SpamEvaluator
{
    public function __construct(protected StopForumSpamService $checker)
    {
    }

    /**
     * @throws BindingResolutionException
     */
    public function evaluate(Comment $comment): int
    {
        // 3 points if SFS flags it
        return $this->checker->checkStopForumSpam($comment) ? 3 : 0;
    }
}
