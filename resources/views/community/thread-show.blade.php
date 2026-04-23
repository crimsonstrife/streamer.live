@php
    use App\Enums\ApprovalStatus;
    /** @var \App\Models\CommunityObjects\Thread $thread */
    /** @var \Illuminate\Pagination\LengthAwarePaginator $replies */

    $user = auth()->user();
    $isMod = $user && ($user->isModerator() || $user->isAdmin());

    $data = [
        'page'        => null,
        'post'        => null,
        'title'       => $thread->title,
        'description' => \Illuminate\Support\Str::limit(strip_tags($thread->body), 160),
        'keywords'    => $thread->tags?->pluck('name')->implode(', ') ?? '',
        'image'       => null,
        'imageAlt'    => null,
        'author'      => $thread->user?->name ?? '',
        'type'        => 'article',
        'category'    => $thread->category?->name ?? 'community',
        'date'        => $thread->created_at?->toIso8601String(),
        'isLive'      => false,
        'channel'     => null,
    ];
@endphp

@push('styles')
    <style>
        .thread-wrap {
            max-width: 960px; margin: 0 auto;
            padding: 28px 20px 48px;
        }
        .thread-header {
            display: flex; flex-direction: column; gap: 10px;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--stream-border);
        }
        .thread-badges {
            display: flex; gap: 6px; flex-wrap: wrap;
        }
        .thread-badge {
            display: inline-flex; align-items: center; gap: 4px;
            padding: 2px 8px; border-radius: 999px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
            text-transform: uppercase;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
        }
        .thread-badge--pinned {
            background: color-mix(in srgb, var(--color-accent) 20%, transparent);
            color: var(--color-accent);
            border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
        }
        .thread-badge--pending {
            background: color-mix(in srgb, #f59e0b 18%, transparent);
            color: #fbbf24;
            border-color: color-mix(in srgb, #f59e0b 40%, transparent);
        }
        .thread-badge--rejected {
            background: color-mix(in srgb, #ef4444 18%, transparent);
            color: #f87171;
            border-color: color-mix(in srgb, #ef4444 40%, transparent);
        }
        .thread-badge--locked {
            background: color-mix(in srgb, #64748b 18%, transparent);
            color: #94a3b8;
            border-color: color-mix(in srgb, #64748b 40%, transparent);
        }
        .thread-title {
            font-size: 28px; font-weight: 800; letter-spacing: -0.01em; margin: 0;
            color: var(--stream-text);
        }
        .thread-meta {
            font-size: 13px; color: var(--stream-muted);
            display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
        }
        .thread-meta a { color: var(--stream-text); }

        .thread-alert {
            padding: 12px 16px; border-radius: 8px;
            background: color-mix(in srgb, #f59e0b 12%, var(--stream-surface));
            border: 1px solid color-mix(in srgb, #f59e0b 35%, transparent);
            color: #fbbf24; font-size: 13px;
            margin-bottom: 16px;
        }
        .thread-body {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 28px;
            color: var(--stream-text);
            line-height: 1.65; font-size: 15px;
            word-wrap: break-word; overflow-wrap: anywhere;
        }
        .thread-body p { margin: 0 0 12px; }
        .thread-body p:last-child { margin: 0; }
        .thread-body a { color: var(--color-accent); }

        .thread-actions {
            display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;
        }
        .thread-actions .btn-ghost {
            display: inline-flex; align-items: center; gap: 4px;
            padding: 6px 12px; border-radius: 6px;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border); font-size: 13px;
            text-decoration: none;
        }
        .thread-actions .btn-ghost:hover {
            color: var(--stream-text); border-color: var(--color-accent);
        }
        .thread-actions .btn-danger-ghost {
            color: #f87171;
            border-color: color-mix(in srgb, #ef4444 30%, var(--stream-border));
        }
        .thread-actions .btn-danger-ghost:hover {
            color: #fff; background: color-mix(in srgb, #ef4444 80%, transparent);
        }

        .replies-section-title {
            font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
            color: var(--stream-muted);
            margin: 20px 0 12px;
        }
        .reply-card {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 10px;
            padding: 14px 16px;
            margin-bottom: 12px;
        }
        .reply-card--pending {
            border-color: color-mix(in srgb, #f59e0b 35%, transparent);
            background: color-mix(in srgb, #f59e0b 6%, var(--stream-surface));
        }
        .reply-meta {
            font-size: 12px; color: var(--stream-muted);
            display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
            margin-bottom: 6px;
        }
        .reply-author { color: var(--stream-text); font-weight: 600; }
        .reply-to {
            padding: 2px 6px; border-radius: 4px;
            background: var(--stream-surface-2); color: var(--stream-muted);
            font-size: 11px;
        }
        .reply-to .username { color: var(--stream-text); }
        .reply-body {
            font-size: 14px; color: var(--stream-text); line-height: 1.6;
            word-wrap: break-word; overflow-wrap: anywhere;
        }
        .reply-body p { margin: 0 0 8px; }
        .reply-body p:last-child { margin: 0; }

        .reply-form {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 10px;
            padding: 16px;
            margin-top: 20px;
        }
        .reply-form textarea {
            width: 100%;
            background: var(--stream-bg); color: var(--stream-text);
            border: 1px solid var(--stream-border); border-radius: 6px;
            padding: 10px 12px; font-size: 14px; min-height: 100px;
            resize: vertical; font-family: inherit;
        }
        .reply-form textarea:focus {
            outline: none; border-color: var(--color-accent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent);
        }
        .reply-form .form-actions {
            display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end;
        }
        .btn-primary-stream {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 8px 18px; border-radius: 6px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 14px; border: 0; cursor: pointer;
        }
        .btn-primary-stream:hover { filter: brightness(1.1); color: #fff; }
        .btn-primary-stream:disabled { opacity: 0.5; cursor: not-allowed; }

        .locked-notice {
            padding: 14px 16px; border-radius: 8px;
            background: var(--stream-surface); border: 1px solid var(--stream-border);
            color: var(--stream-muted); text-align: center; font-size: 14px;
            margin-top: 16px;
        }

        .reply-field-error { color: #f87171; font-size: 12px; margin-top: 4px; }

        /* BBCode-rendered body tweaks so quote/code/lists look at home in the dark theme */
        .bbcode-rendered blockquote {
            border-left: 3px solid var(--color-accent);
            background: var(--stream-surface-2);
            margin: 8px 0;
            padding: 8px 14px;
            border-radius: 6px;
            color: var(--stream-muted);
        }
        .bbcode-rendered code, .bbcode-rendered pre {
            background: #0f0f13; border: 1px solid var(--stream-border);
            border-radius: 4px; padding: 2px 6px; font-family: ui-monospace, monospace;
            font-size: 13px;
        }
        .bbcode-rendered pre { padding: 10px 12px; overflow-x: auto; }
        .bbcode-rendered pre code { border: 0; padding: 0; background: transparent; }
        .bbcode-rendered a { color: var(--color-accent); }
        .bbcode-rendered img { max-width: 100%; border-radius: 6px; }
        .bbcode-rendered ul, .bbcode-rendered ol { padding-left: 20px; }
    </style>

    {{-- SCEditor (dark theme). Loaded on thread-show for the reply form. --}}
    <link rel="stylesheet" href="{{ asset('build/vendors/sceditor/themes/defaultdark.min.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('build/vendors/sceditor/sceditor.min.js') }}" defer></script>
    <script src="{{ asset('build/vendors/sceditor/icons/monocons.js') }}" defer></script>
    <script src="{{ asset('build/vendors/sceditor/formats/bbcode.js') }}" defer></script>
    <script defer>
        window.addEventListener('DOMContentLoaded', function () {
            if (typeof sceditor === 'undefined') return;
            document.querySelectorAll('textarea.js-bbcode-editor').forEach(function (ta) {
                if (ta.dataset.sceditorInit) return;
                sceditor.create(ta, {
                    format: 'bbcode',
                    icons: 'monocons',
                    toolbar: 'bold,italic,underline,strike|bulletlist,orderedlist|quote,code|link,unlink,image|source',
                    style: @json(asset('build/vendors/sceditor/themes/content/content-dark.css')),
                    emoticonsEnabled: false,
                    width: '100%',
                    height: 160,
                    resizeEnabled: true,
                    autofocus: false,
                });
                ta.dataset.sceditorInit = '1';
            });
        });
    </script>
@endpush

{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <div class="thread-wrap">
        @if (session('success'))
            <div class="thread-alert" style="background: color-mix(in srgb, #22c55e 12%, var(--stream-surface)); border-color: color-mix(in srgb, #22c55e 35%, transparent); color: #4ade80;">
                {{ session('success') }}
            </div>
        @endif
        @if (session('error'))
            <div class="thread-alert" style="background: color-mix(in srgb, #ef4444 12%, var(--stream-surface)); border-color: color-mix(in srgb, #ef4444 35%, transparent); color: #f87171;">
                {{ session('error') }}
            </div>
        @endif

        @if ($thread->isPending())
            <div class="thread-alert">
                This thread is pending moderator review. Only you and moderators can see it right now.
            </div>
        @endif
        @if ($thread->approval_status === ApprovalStatus::Rejected)
            <div class="thread-alert thread-badge--rejected" style="color:#f87171;border-color:color-mix(in srgb,#ef4444 40%,transparent);background:color-mix(in srgb,#ef4444 10%,var(--stream-surface));">
                This thread was rejected during moderation.
                @if ($thread->approval_notes)
                    <div style="margin-top:6px;color:var(--stream-muted);font-size:12px;">Note: {{ $thread->approval_notes }}</div>
                @endif
            </div>
        @endif

        <header class="thread-header">
            <div class="thread-badges">
                @if ($thread->isPinned())
                    <span class="thread-badge thread-badge--pinned"><i class="bi bi-pin-angle-fill"></i> Pinned</span>
                @endif
                @if ($thread->isLocked())
                    <span class="thread-badge thread-badge--locked"><i class="bi bi-lock-fill"></i> Locked</span>
                @endif
                @if ($thread->isPending())
                    <span class="thread-badge thread-badge--pending">Pending review</span>
                @endif
                @if ($thread->category)
                    <span class="thread-badge">{{ $thread->category->name }}</span>
                @endif
            </div>
            <h1 class="thread-title">{{ $thread->title }}</h1>
            <div class="thread-meta">
                <span>by <span class="reply-author">{{ $thread->user?->name ?? 'Unknown' }}</span></span>
                @if ($thread->created_at)
                    <span>·</span>
                    <time datetime="{{ $thread->created_at->toIso8601String() }}"
                          title="{{ $thread->created_at->toDayDateTimeString() }}">
                        {{ $thread->created_at->diffForHumans() }}
                    </time>
                @endif
                @if ($thread->posts_count > 0)
                    <span>·</span>
                    <span><i class="bi bi-chat-left-text"></i> {{ $thread->posts_count }}</span>
                @endif
                @if ($thread->views_count > 0)
                    <span>·</span>
                    <span><i class="bi bi-eye"></i> {{ number_format($thread->views_count) }}</span>
                @endif
            </div>
        </header>

        <div class="thread-body bbcode-rendered">
            {!! $thread->body_html !!}
        </div>

        @if ($canEdit || $isMod)
            <div class="thread-actions">
                @if ($canEdit)
                    <a href="{{ route('community.thread.edit', $thread->slug) }}" class="btn-ghost">
                        <i class="bi bi-pencil"></i> Edit
                    </a>
                @endif
                @if ($user && ($user->id === $thread->user_id || $isMod))
                    <form method="POST" action="{{ route('community.thread.destroy', $thread->slug) }}" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn-ghost btn-danger-ghost"
                                onclick="return confirm('Delete this thread? This cannot be undone.');">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </form>
                @endif
            </div>
        @endif

        <h2 class="replies-section-title">{{ $thread->posts_count }} {{ \Illuminate\Support\Str::plural('Reply', $thread->posts_count) }}</h2>

        @forelse ($replies as $reply)
            <article class="reply-card {{ $reply->isPending() ? 'reply-card--pending' : '' }}">
                <div class="reply-meta">
                    <span class="reply-author">{{ $reply->user?->name ?? 'Unknown' }}</span>
                    @if ($reply->created_at)
                        <span>·</span>
                        <time datetime="{{ $reply->created_at->toIso8601String() }}"
                              title="{{ $reply->created_at->toDayDateTimeString() }}">
                            {{ $reply->created_at->diffForHumans() }}
                        </time>
                    @endif
                    @if ($reply->reply_to_post_id && $reply->parentPost?->user)
                        <span class="reply-to">
                            ↳ <span class="username">@{{ $reply->parentPost->user->username ?? $reply->parentPost->user->name }}</span>
                        </span>
                    @endif
                    @if ($reply->isPending())
                        <span class="thread-badge thread-badge--pending">Pending</span>
                    @endif
                </div>
                <div class="reply-body bbcode-rendered">{!! $reply->body_html !!}</div>
            </article>
        @empty
            <p class="text-muted-stream" style="color: var(--stream-muted); text-align: center; padding: 20px;">
                No replies yet. Be the first.
            </p>
        @endforelse

        @if ($replies->hasPages())
            <div class="hub-pagination" style="margin-top: 12px;">{{ $replies->links() }}</div>
        @endif

        @if ($canReply)
            <form class="reply-form" method="POST" action="{{ route('community.thread.post.store', $thread->slug) }}">
                @csrf
                <textarea name="body" class="js-bbcode-editor" placeholder="Write a reply…"
                          required minlength="1" maxlength="5000">{{ old('body') }}</textarea>
                @error('body')
                    <div class="reply-field-error">{{ $message }}</div>
                @enderror
                <div class="form-actions">
                    <button type="submit" class="btn-primary-stream">Post reply</button>
                </div>
            </form>
        @elseif ($thread->isLocked())
            <div class="locked-notice">
                <i class="bi bi-lock-fill"></i> This thread is locked. No new replies.
            </div>
        @elseif (! $user)
            <div class="locked-notice">
                <a href="{{ route('login') }}" style="color: var(--color-accent);">Sign in</a>
                to join the conversation.
            </div>
        @elseif (! $thread->isApproved())
            <div class="locked-notice">
                Replies open once a moderator approves this thread.
            </div>
        @endif
    </div>
</main>
</div> {{-- closes .stream-shell --}}
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer('stream') !!}
