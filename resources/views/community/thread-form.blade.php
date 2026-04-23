@php
    /** @var \App\Models\CommunityObjects\Thread|null $thread */
    /** @var \Illuminate\Support\Collection $categories */
    /** @var \App\Settings\CommunitySettings $settings */

    $isEdit = ! empty($thread);
    $action = $isEdit
        ? route('community.thread.update', $thread->slug)
        : route('community.thread.store');

    $data = [
        'page'        => null,
        'post'        => null,
        'title'       => $isEdit ? "Edit — {$thread->title}" : 'New Thread',
        'description' => 'Start a new community thread.',
        'keywords'    => '',
        'image'       => null,
        'imageAlt'    => null,
        'author'      => '',
        'type'        => 'website',
        'category'    => 'community',
        'date'        => now()->toIso8601String(),
        'isLive'      => false,
        'channel'     => null,
    ];
@endphp

@push('styles')
    <style>
        .thread-form-wrap { max-width: 760px; margin: 0 auto; padding: 28px 20px 48px; }
        .thread-form-header {
            display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
            margin-bottom: 18px;
            padding-bottom: 14px; border-bottom: 1px solid var(--stream-border);
        }
        .thread-form-title { font-size: 24px; font-weight: 800; margin: 0; }
        .thread-form-hint { color: var(--stream-muted); font-size: 13px; margin: 0; }

        .thread-form {
            display: flex; flex-direction: column; gap: 14px;
        }
        .thread-form label {
            display: block; font-size: 12px; font-weight: 600;
            color: var(--stream-muted); margin-bottom: 4px; letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .thread-form input[type="text"],
        .thread-form textarea,
        .thread-form select {
            width: 100%;
            background: var(--stream-surface); color: var(--stream-text);
            border: 1px solid var(--stream-border); border-radius: 6px;
            padding: 10px 12px; font-size: 14px; font-family: inherit;
        }
        .thread-form textarea { min-height: 180px; resize: vertical; line-height: 1.5; }
        .thread-form input:focus, .thread-form textarea:focus, .thread-form select:focus {
            outline: none; border-color: var(--color-accent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent);
        }
        .thread-form .help {
            font-size: 12px; color: var(--stream-muted); margin-top: 4px;
        }
        .thread-form .error { color: #f87171; font-size: 12px; margin-top: 4px; }

        .thread-form-actions {
            display: flex; gap: 8px; justify-content: flex-end; align-items: center;
            margin-top: 6px;
        }
        .btn-primary-stream {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 10px 20px; border-radius: 6px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 14px; border: 0; cursor: pointer;
        }
        .btn-primary-stream:hover { filter: brightness(1.1); color: #fff; }
        .btn-cancel-stream {
            padding: 10px 18px; border-radius: 6px;
            background: var(--stream-surface); color: var(--stream-muted);
            border: 1px solid var(--stream-border); text-decoration: none;
            font-size: 14px;
        }
        .btn-cancel-stream:hover { color: var(--stream-text); border-color: var(--stream-muted); }

        .thread-form-alert {
            padding: 12px 16px; border-radius: 8px; font-size: 13px;
            margin-bottom: 8px;
        }
        .thread-form-alert--error {
            background: color-mix(in srgb, #ef4444 10%, var(--stream-surface));
            border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
            color: #f87171;
        }
    </style>
@endpush

{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <div class="thread-form-wrap">
        <div class="thread-form-header">
            <h1 class="thread-form-title">{{ $isEdit ? 'Edit Thread' : 'Start a Thread' }}</h1>
            @if (! $isEdit)
                <p class="thread-form-hint">
                    @if ($settings->require_thread_approval)
                        Threads are reviewed by a moderator before appearing in the community feed.
                    @else
                        Threads appear in the feed immediately after posting.
                    @endif
                </p>
            @endif
        </div>

        @if (session('error'))
            <div class="thread-form-alert thread-form-alert--error">{{ session('error') }}</div>
        @endif

        <form class="thread-form" method="POST" action="{{ $action }}">
            @csrf
            @if ($isEdit)
                @method('PUT')
            @endif

            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title"
                       value="{{ old('title', $thread?->title) }}"
                       required minlength="4" maxlength="255"
                       placeholder="A short, clear summary">
                @error('title')<div class="error">{{ $message }}</div>@enderror
            </div>

            @if ($categories->isNotEmpty())
                <div>
                    <label for="category_id">Category (optional)</label>
                    <select id="category_id" name="category_id">
                        <option value="">— choose —</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}"
                                @selected(old('category_id', $thread?->category_id) == $category->id)>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('category_id')<div class="error">{{ $message }}</div>@enderror
                </div>
            @endif

            <div>
                <label for="body">Body</label>
                <textarea id="body" name="body" required minlength="10" maxlength="10000"
                          placeholder="What do you want to talk about?">{{ old('body', $thread?->body) }}</textarea>
                <div class="help">Supports plain text; line breaks are preserved. Links are not clickable yet.</div>
                @error('body')<div class="error">{{ $message }}</div>@enderror
            </div>

            <div class="thread-form-actions">
                <a href="{{ $isEdit ? route('community.thread.show', $thread->slug) : url()->previous() }}"
                   class="btn-cancel-stream">Cancel</a>
                <button type="submit" class="btn-primary-stream">
                    {{ $isEdit ? 'Save changes' : 'Post thread' }}
                </button>
            </div>
        </form>
    </div>
</main>
</div> {{-- closes .stream-shell --}}
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer('stream') !!}
