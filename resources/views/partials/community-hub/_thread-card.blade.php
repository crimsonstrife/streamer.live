@php
    /** @var \App\Models\CommunityObjects\Thread $thread */
    $url = route('community.thread.show', $thread->slug);
    $authorName = $thread->user?->name ?? 'Unknown';
    $excerpt = \Illuminate\Support\Str::limit(strip_tags($thread->body), 220);
    $isPinned = ! empty($pinned);
@endphp
<article class="hub-card {{ $isPinned ? 'hub-card--pinned' : '' }}">
    <div class="hub-card-badges">
        @if ($isPinned)
            <span class="hub-badge hub-badge--pinned">
                <i class="bi bi-pin-angle-fill" aria-hidden="true"></i> Pinned
            </span>
        @endif
        <span class="hub-badge" style="background: color-mix(in srgb, var(--color-accent) 18%, transparent); color: var(--color-accent); border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);">
            <i class="bi bi-chat-square-text" aria-hidden="true"></i> Thread
        </span>
        @if ($thread->category)
            <span class="hub-badge">{{ $thread->category->name }}</span>
        @endif
        @if ($thread->isLocked())
            <span class="hub-badge">
                <i class="bi bi-lock-fill" aria-hidden="true"></i> Locked
            </span>
        @endif
        @if ($thread->isPending())
            <span class="hub-badge" style="background: color-mix(in srgb, #f59e0b 18%, transparent); color: #fbbf24; border-color: color-mix(in srgb, #f59e0b 40%, transparent);">
                Pending review
            </span>
        @endif
    </div>

    <h3 class="hub-card-title">
        <a href="{{ $url }}">{{ $thread->title }}</a>
    </h3>

    @if ($excerpt)
        <p class="hub-card-excerpt">{{ $excerpt }}</p>
    @endif

    <div class="hub-card-meta">
        <span>{{ $authorName }}</span>
        <span class="hub-meta-dot" aria-hidden="true"></span>
        <time datetime="{{ ($thread->last_activity_at ?? $thread->created_at)?->toIso8601String() }}">
            @if ($thread->last_activity_at && $thread->last_activity_at->gt($thread->created_at))
                active {{ $thread->last_activity_at->diffForHumans() }}
            @else
                {{ $thread->created_at?->diffForHumans() }}
            @endif
        </time>
        <span class="hub-meta-dot" aria-hidden="true"></span>
        <span>
            <i class="bi bi-chat-left-text" aria-hidden="true"></i>
            {{ $thread->posts_count }}
        </span>
        @if ($thread->views_count > 0)
            <span class="hub-meta-dot" aria-hidden="true"></span>
            <span>
                <i class="bi bi-eye" aria-hidden="true"></i>
                {{ number_format($thread->views_count) }}
            </span>
        @endif
    </div>
</article>
