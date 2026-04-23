@php
    use App\Utilities\BlogHelper;
    /** @var \App\Models\BlogObjects\Post $post */
    $url = route(BlogHelper::getBlogSlug() . '.post', $post->slug);
    $authorName = $post->author?->name;
    $excerpt = $post->excerpt ?: \Illuminate\Support\Str::limit(strip_tags($post->content), 220);
@endphp
<article class="hub-card {{ ! empty($pinned) ? 'hub-card--pinned' : '' }}">
    <div class="hub-card-badges">
        @if (! empty($pinned))
            <span class="hub-badge hub-badge--pinned">
                <i class="bi bi-pin-angle-fill" aria-hidden="true"></i> Pinned
            </span>
        @endif
        @if ($post->is_announcement)
            <span class="hub-badge hub-badge--announcement">
                <i class="bi bi-megaphone-fill" aria-hidden="true"></i> Announcement
            </span>
        @endif
    </div>

    <h3 class="hub-card-title">
        <a href="{{ $url }}">{{ $post->title }}</a>
    </h3>

    @if ($excerpt)
        <p class="hub-card-excerpt">{{ $excerpt }}</p>
    @endif

    <div class="hub-card-meta">
        @if ($authorName)
            <span>{{ $authorName }}</span>
            <span class="hub-meta-dot" aria-hidden="true"></span>
        @endif
        @if ($post->published_at)
            <time datetime="{{ $post->published_at->toIso8601String() }}"
                  title="{{ $post->published_at->toDayDateTimeString() }}">
                {{ $post->published_at->diffForHumans() }}
            </time>
        @endif
        @if (isset($post->comments_count))
            <span class="hub-meta-dot" aria-hidden="true"></span>
            <span>
                <i class="bi bi-chat-left-text" aria-hidden="true"></i>
                {{ $post->comments_count }}
            </span>
        @endif
        @if (isset($post->reactions_count))
            <span class="hub-meta-dot" aria-hidden="true"></span>
            <span>
                <i class="bi bi-heart" aria-hidden="true"></i>
                {{ $post->reactions_count }}
            </span>
        @endif
    </div>
</article>
