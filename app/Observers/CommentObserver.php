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

        // run before the comment is saved
        $comment->is_spam_auto = $checker->isSpam($comment);

        // write back a numeric score
        $comment->spam_score = $checker->getScore($comment);

        // auto‐flag spam based on banned words
        $banned = ['viagra', 'casino', 'free money', 'lotto']; // TODO: Make the word blacklist configurable.
        foreach ($banned as $word) {
            if (stripos($comment->text, $word) !== false) {
                $comment->is_spam = true;
                // increase the spam risk score for each match
                $comment->spam_score++;
                break;
            }
        }
    }
}
