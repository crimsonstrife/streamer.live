<?php

namespace App\Http\Controllers\Community;

use App\Http\Controllers\Controller;
use App\Models\CommunityObjects\Thread;
use App\Models\CommunityObjects\ThreadPost;
use App\Services\CommunityContentService;
use App\Settings\CommunitySettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Throwable;

class ThreadPostController extends Controller
{
    public function __construct(
        private readonly CommunityContentService $content,
    ) {
    }

    /**
     * Post a reply to a thread.
     */
    public function store(Thread $thread, Request $request): RedirectResponse
    {
        $settings = app(CommunitySettings::class);

        if (! $settings->enable_community) {
            return back()->with('error', 'Community threads are currently disabled.');
        }

        if (! $thread->canReply($request->user())) {
            return back()->with('error', 'Replies are not allowed on this thread.');
        }

        $limiterKey = 'community-reply-create:'.$request->user()->id;
        if (RateLimiter::tooManyAttempts($limiterKey, $settings->rate_limit_replies_per_hour)) {
            $seconds = RateLimiter::availableIn($limiterKey);

            return back()->withInput()->with('error', "Too many replies submitted. Try again in {$seconds} seconds.");
        }

        $data = $request->validate([
            'body'             => 'required|string|min:1|max:5000',
            'reply_to_post_id' => 'nullable|integer|exists:thread_posts,id',
        ]);

        // If replying to a specific post, make sure it belongs to this thread
        $parent = null;
        if (! empty($data['reply_to_post_id'])) {
            $parent = ThreadPost::where('id', $data['reply_to_post_id'])
                ->where('thread_id', $thread->id)
                ->first();
            if (! $parent) {
                return back()->with('error', 'Parent reply not found.');
            }
        }

        try {
            $processed = $this->content->process($data['body']);

            $reply = ThreadPost::create([
                'thread_id'        => $thread->id,
                'user_id'          => $request->user()->id,
                'reply_to_post_id' => $parent?->id,
                'body'             => $processed['clean'],
                'approval_status'  => $this->content->resolveApprovalStatus(
                    $settings->require_reply_approval,
                    $processed['should_force_pending'],
                )->value,
            ]);

            $this->content->parseMentions($reply);

            RateLimiter::hit($limiterKey, 3600);
        } catch (Throwable $e) {
            Log::error('ThreadPostController::store failed', ['error' => $e->getMessage()]);

            return back()->withInput()->with('error', 'Could not post reply. Please try again.');
        }

        $flash = $reply->isPending()
            ? 'Reply submitted for review.'
            : 'Reply posted.';

        return redirect()->route('community.thread.show', $thread->slug)
            ->with('success', $flash);
    }

    /**
     * Edit an existing reply (author or mod).
     */
    public function update(ThreadPost $post, Request $request): RedirectResponse
    {
        if (! $post->canEdit($request->user())) {
            abort(403);
        }

        $data = $request->validate([
            'body' => 'required|string|min:1|max:5000',
        ]);

        $processed = $this->content->process($data['body']);

        $post->body = $processed['clean'];
        $post->save();

        $this->content->parseMentions($post);

        return redirect()->route('community.thread.show', $post->thread->slug)
            ->with('success', 'Reply updated.');
    }

    /**
     * Soft-delete a reply.
     */
    public function destroy(ThreadPost $post, Request $request): RedirectResponse
    {
        $user = $request->user();
        $isOwner = $user && $user->id === $post->user_id;
        $isMod = $user && ($user->isModerator() || $user->isAdmin());

        if (! $isOwner && ! $isMod) {
            abort(403);
        }

        $threadSlug = $post->thread?->slug;
        $post->delete();

        return $threadSlug
            ? redirect()->route('community.thread.show', $threadSlug)->with('success', 'Reply removed.')
            : back()->with('success', 'Reply removed.');
    }
}
