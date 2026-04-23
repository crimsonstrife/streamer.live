<?php

namespace App\Http\Controllers\Community;

use App\Enums\ApprovalStatus;
use App\Http\Controllers\Controller;
use App\Models\CommunityObjects\Thread;
use App\Models\SharedObjects\Category;
use App\Services\CommunityContentService;
use App\Settings\CommunitySettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ThreadController extends Controller
{
    public function __construct(
        private readonly CommunityContentService $content,
    ) {
    }

    /**
     * Public thread detail page. Hidden from everyone except author/mods
     * when the thread is not approved.
     */
    public function show(Thread $thread): View|Response
    {
        $thread->load(['user', 'category', 'reviewer']);

        $user = auth()->user();
        if (! $thread->isVisibleTo($user)) {
            abort(404);
        }

        // Bump view count cheaply — skip for author to reduce noise.
        if (! $user || $user->id !== $thread->user_id) {
            $thread->increment('views_count');
        }

        $replies = $thread->posts()
            ->with(['user', 'parentPost.user'])
            ->where(function ($query) use ($user) {
                $query->where('approval_status', ApprovalStatus::Approved->value);
                if ($user) {
                    // Authors still see their own pending replies
                    $query->orWhere('user_id', $user->id);
                    // Mods see everything
                    if ($user->isModerator() || $user->isAdmin()) {
                        $query->orWhereIn('approval_status', [
                            ApprovalStatus::Pending->value,
                            ApprovalStatus::Rejected->value,
                        ]);
                    }
                }
            })
            ->orderBy('created_at')
            ->paginate(20);

        return view('community.thread-show', [
            'thread'  => $thread,
            'replies' => $replies,
            'canReply' => $thread->canReply($user),
            'canEdit'  => $thread->canEdit($user),
        ]);
    }

    /**
     * Form: create a new thread.
     */
    public function create(Request $request): View|RedirectResponse
    {
        $settings = app(CommunitySettings::class);

        if (! $settings->enable_community) {
            return redirect()->route('fabricator.page.home')
                ->with('error', 'Community threads are currently disabled.');
        }

        if (! $this->passesAccountAgeGate($request->user(), $settings)) {
            return redirect()->route('fabricator.page.home')
                ->with('error', "Your account must be at least {$settings->min_account_age_days} day(s) old before creating a community thread.");
        }

        return view('community.thread-form', [
            'thread'     => null,
            'categories' => $this->availableCategories(),
            'settings'   => $settings,
        ]);
    }

    /**
     * Persist a new thread. Rate-limited, Purified, Blasp-checked, mention-parsed.
     */
    public function store(Request $request): RedirectResponse
    {
        $settings = app(CommunitySettings::class);

        if (! $settings->enable_community) {
            return back()->with('error', 'Community threads are currently disabled.');
        }

        if (! $this->passesAccountAgeGate($request->user(), $settings)) {
            return back()->with('error', "Your account must be at least {$settings->min_account_age_days} day(s) old before creating a community thread.");
        }

        $limiterKey = 'community-thread-create:'.$request->user()->id;
        if (RateLimiter::tooManyAttempts($limiterKey, $settings->rate_limit_threads_per_hour)) {
            $seconds = RateLimiter::availableIn($limiterKey);

            return back()->withInput()->with('error', "Too many threads submitted. Try again in {$seconds} seconds.");
        }

        $data = $request->validate([
            'title'       => 'required|string|min:4|max:255',
            'body'        => 'required|string|min:10|max:10000',
            'category_id' => 'nullable|integer|exists:categories,id',
        ]);

        $categoryId = $this->resolveCategoryId($data['category_id'] ?? null, $settings);

        try {
            $processed = $this->content->process($data['body']);

            $thread = Thread::create([
                'user_id'         => $request->user()->id,
                'category_id'     => $categoryId,
                'title'           => $data['title'],
                'body'            => $processed['clean'],
                'approval_status' => $this->content->resolveApprovalStatus(
                    $settings->require_thread_approval,
                    $processed['should_force_pending'],
                )->value,
                'last_activity_at' => now(),
            ]);

            $this->content->parseMentions($thread);

            RateLimiter::hit($limiterKey, 3600); // 1 hour window
        } catch (Throwable $e) {
            Log::error('ThreadController::store failed', ['error' => $e->getMessage()]);

            return back()->withInput()->with('error', 'Could not submit thread. Please try again.');
        }

        $flash = $thread->isPending()
            ? 'Thread submitted! A moderator will review it before it appears in the community feed.'
            : 'Thread published.';

        return redirect()->route('community.thread.show', $thread->slug)
            ->with('success', $flash);
    }

    /**
     * Form: edit an existing thread (author or mod).
     */
    public function edit(Thread $thread, Request $request): View|RedirectResponse
    {
        if (! $thread->canEdit($request->user())) {
            abort(403);
        }

        return view('community.thread-form', [
            'thread'     => $thread,
            'categories' => $this->availableCategories(),
            'settings'   => app(CommunitySettings::class),
        ]);
    }

    /**
     * Update an existing thread.
     */
    public function update(Thread $thread, Request $request): RedirectResponse
    {
        if (! $thread->canEdit($request->user())) {
            abort(403);
        }

        $data = $request->validate([
            'title'       => 'required|string|min:4|max:255',
            'body'        => 'required|string|min:10|max:10000',
            'category_id' => 'nullable|integer|exists:categories,id',
        ]);

        $settings = app(CommunitySettings::class);
        $processed = $this->content->process($data['body']);

        $thread->fill([
            'title'       => $data['title'],
            'body'        => $processed['clean'],
            'category_id' => $this->resolveCategoryId($data['category_id'] ?? null, $settings),
        ])->save();

        $this->content->parseMentions($thread);

        return redirect()->route('community.thread.show', $thread->slug)
            ->with('success', 'Thread updated.');
    }

    /**
     * Soft-delete a thread.
     */
    public function destroy(Thread $thread, Request $request): RedirectResponse
    {
        $user = $request->user();
        $isOwner = $user && $user->id === $thread->user_id;
        $isMod = $user && ($user->isModerator() || $user->isAdmin());

        if (! $isOwner && ! $isMod) {
            abort(403);
        }

        $thread->delete();

        return redirect()->route('fabricator.page.global.fallback', 'community')
            ->with('success', 'Thread removed.');
    }

    // -----------------------------------------------------------------

    /**
     * Only categories with type='community' can host community threads.
     * Keeps blog categories out of the community namespace.
     */
    private function availableCategories()
    {
        return Category::query()
            ->where('type', 'community')
            ->orderBy('name')
            ->get();
    }

    /**
     * Snap to the default community category if the user didn't pick one
     * OR picked a non-community category (defence-in-depth).
     */
    private function resolveCategoryId(?int $submitted, CommunitySettings $settings): ?int
    {
        if ($submitted) {
            $category = Category::find($submitted);
            if ($category && $category->type === 'community') {
                return $category->id;
            }
        }

        return $settings->default_community_category_id;
    }

    private function passesAccountAgeGate($user, CommunitySettings $settings): bool
    {
        if (! $user || $settings->min_account_age_days <= 0) {
            return true;
        }

        return $user->created_at?->diffInDays(now()) >= $settings->min_account_age_days;
    }
}
