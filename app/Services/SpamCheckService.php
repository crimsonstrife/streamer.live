<?php

namespace App\Services;

use App\Models\Comment;
use Exception;
use nickurt\Akismet\Akismet;

class SpamCheckService
{
    /**
     * Returns an integer “spam score”: 1 for spam, 0 for ham.
     * could extend this to include StopForumSpam lookups
     * or counts of suspicious keywords/links.
     */
    public function getScore(Comment $comment): int
    {
        // Base on Akismet
        $score = $this->isSpam($comment) ? 1 : 0;
        // Additional heuristics
        $score += substr_count($comment->text, 'http');         // +1 per link
        // $score += $this->checkStopForumSpam($comment) ? 2 : 0;  // +2 if SFS flags it

        return $score;
    }

    /**
     * Returns true if Akismet considers this comment to be spam.
     *
     * @throws Exception
     */
    public function isSpam(Comment $comment): bool
    {
        Akismet::setCommentAuthor($comment->commentedBy?->name ?? 'Guest')
            ->setCommentAuthorEmail($comment->commentedBy?->email ?? '')
            ->setPermalink(route('posts.show', $comment->commented_on_id))
            ->setCommentContent($comment->text)
            ->setUserIp(request()->ip() ?? '')
            ->setUserAgent(request()->userAgent() ?? '');

        return Akismet::isSpam();
    }
}
