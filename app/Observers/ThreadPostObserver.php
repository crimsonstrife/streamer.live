<?php

namespace App\Observers;

use App\Enums\ApprovalStatus;
use App\Models\CommunityObjects\ThreadPost;
use Illuminate\Support\Facades\DB;

class ThreadPostObserver
{
    /**
     * On create: bump the parent thread's last_activity_at + posts_count
     * (only if the reply is approved — pending replies should NOT surface as activity).
     */
    public function created(ThreadPost $post): void
    {
        if (! $post->isApproved()) {
            return;
        }

        $this->bumpParent($post->thread_id, +1);
    }

    /**
     * On update: if approval_status flipped into "approved", count it as new activity.
     */
    public function updated(ThreadPost $post): void
    {
        if (! $post->wasChanged('approval_status')) {
            return;
        }

        // getOriginal() respects the enum cast and returns the enum (or null);
        // use getRawOriginal() to get the underlying string then hydrate via tryFrom.
        $previous = ApprovalStatus::tryFrom((string) $post->getRawOriginal('approval_status'));
        $current = $post->approval_status;

        if ($current === ApprovalStatus::Approved && $previous !== ApprovalStatus::Approved) {
            $this->bumpParent($post->thread_id, +1);
        } elseif ($current !== ApprovalStatus::Approved && $previous === ApprovalStatus::Approved) {
            // An approved reply was demoted — keep the count honest.
            $this->bumpParent($post->thread_id, -1, touchActivity: false);
        }
    }

    /**
     * On delete: decrement parent posts_count (if the post was approved).
     */
    public function deleted(ThreadPost $post): void
    {
        if (! $post->isApproved()) {
            return;
        }

        $this->bumpParent($post->thread_id, -1, touchActivity: false);
    }

    /**
     * Atomic update on the threads row. Bypasses the Eloquent save pipeline
     * to avoid touching model observers / dirty-state issues and guarantees
     * the counter is correct under concurrent replies.
     */
    private function bumpParent(int $threadId, int $delta, bool $touchActivity = true): void
    {
        if ($threadId <= 0) {
            return;
        }

        $updates = [
            'posts_count' => DB::raw('GREATEST(0, posts_count + ' . ((int) $delta) . ')'),
        ];

        if ($touchActivity) {
            $updates['last_activity_at'] = now();
        }

        DB::table('threads')
            ->where('id', $threadId)
            ->update($updates);
    }
}
