<?php

namespace App\Observers;

use App\Models\Comment;
use App\Services\SpamCheckService;
use Exception;

class CommentObserver
{
    /**
     * @throws Exception
     */
    public function creating(Comment $comment): void
    {
        $checker = app(SpamCheckService::class);

        $score = $checker->getScore($comment);
        $comment->spam_score = $score;
        $comment->is_spam_auto = $checker->isSpam($comment);
    }
}
