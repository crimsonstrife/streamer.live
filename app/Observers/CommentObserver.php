<?php

namespace App\Observers;

use App\Models\Comment;
use App\Services\SpamCheckService;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class CommentObserver
{
    /**
     * @throws Exception
     */
    public function created(Comment $comment): void
    {
        try {
            $checker = app(SpamCheckService::class);

            $score = 0;
            try {
                $score = $checker->getScore($comment);
            } catch (Exception $e) {
                Log::error('SpamScore failed to calculate: ', $e->getMessage());
            }

            $isSpam = false;
            try {
                $isSpam = $checker->isSpam($comment);
            } catch (Exception $e) {
                Log::error('Failed to check for spam: ', $e->getMessage());
            }

            $approved = true;
            if ($score > 6) {
                $approved = false;
            }

            $comment->update([
                'spam_score' => $score,
                'is_spam_auto' => $isSpam,
                'approved' => $approved,
            ]);
        } catch (Throwable $e) {
            // Log for post-mortem, but don't abort!
            Log::error('SpamCheckService failed on Comment create: ', [
                'error' => $e->getMessage(),
                'comment' => $comment->toArray(),
            ]);
        }
    }
}
