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
    public function creating(Comment $comment, SpamCheckService $checker): void
    {
        // run before the comment is saved
        $comment->is_spam_auto = $checker->isSpam($comment);

        // write back a numeric score
        $comment->spam_score = $checker->getScore($comment);
    }
}
