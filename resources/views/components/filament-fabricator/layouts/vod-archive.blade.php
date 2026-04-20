@props(['page'])
@php
    use App\Settings\TwitchSettings;
    use App\Utilities\StreamHelper;
    use Carbon\Carbon;

    $twitch         = app(TwitchSettings::class);
    $channel        = $twitch->channel_name;
    $twitchEnabled  = $twitch->enable_integration && ! empty($channel);

    $allowedTypes   = ['archive', 'highlight', 'upload'];
    $type           = in_array(request('type'), $allowedTypes, true) ? request('type') : 'archive';
    $cursor         = request('cursor') ?: null;
    $perPage        = 24;

    $videos = ['data' => [], 'pagination' => null];
    if ($twitchEnabled) {
        $helper     = app(StreamHelper::class);
        $videos = $helper->getVods($perPage, $cursor, $type);
        $streamData = $helper->getStreamInfo($channel);
        $streamInfo = $streamData[0] ?? null;
        $isLive     = ($streamInfo['type'] ?? null) === 'live';
    }

    $typeLabels = [
        'archive'   => 'Past Streams',
        'highlight' => 'Highlights',
        'upload'    => 'Uploads',
    ];

    $data = [
        'page'        => $page,
        'post'        => null,
        'title'       => $page->seo_title ?? $page->title ?? 'VOD Archive',
        'description' => \Illuminate\Support\Str::limit(strip_tags($page->seo_description ?? ''), 160)
            ?: ($channel ? "Browse past streams, highlights, and uploads from {$channel}." : 'Browse the VOD archive.'),
        'keywords'    => $page->tags->pluck('name')->implode(', '),
        'image'       => null,
        'imageAlt'    => null,
        'author'      => '',
        'type'        => 'website',
        'category'    => $page->type,
        'date'        => $page->created_at->toIso8601String(),
        'isLive'      => $isLive ?? false,
        'channel'     => $channel,
    ];
@endphp

@push('styles')
    <style>
        .vod-hero {
            background: linear-gradient(180deg, var(--stream-surface) 0%, var(--stream-bg) 100%);
            border-bottom: 1px solid var(--stream-border);
            padding: 32px 0 24px;
        }
        .vod-hero-container {
            max-width: 1400px; margin: 0 auto; padding: 0 20px;
            display: flex; flex-direction: column; gap: 16px;
        }
        .vod-hero-header {
            display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
        }
        .vod-hero-title { font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.01em; }
        .vod-hero-subtitle { color: var(--stream-muted); margin: 0; font-size: 14px; }

        .vod-controls {
            display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-top: 4px;
        }
        .vod-search {
            flex: 1 1 260px; min-width: 200px;
            background: var(--stream-surface-2); color: var(--stream-text);
            border: 1px solid var(--stream-border); border-radius: 6px;
            padding: 8px 12px; font-size: 14px;
            transition: border-color .15s, box-shadow .15s;
        }
        .vod-search::placeholder { color: var(--stream-muted); }
        .vod-search:focus {
            outline: none; border-color: var(--color-accent);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent);
        }
        .vod-type-tabs {
            display: inline-flex; gap: 2px;
            background: var(--stream-surface-2); border: 1px solid var(--stream-border);
            border-radius: 6px; padding: 3px;
        }
        .vod-type-tab {
            padding: 5px 14px; border-radius: 4px;
            font-size: 13px; font-weight: 500;
            color: var(--stream-muted); text-decoration: none;
            transition: color .15s, background .15s;
        }
        .vod-type-tab:hover { color: var(--stream-text); }
        .vod-type-tab.is-active { background: var(--stream-bg); color: var(--stream-text); }

        .vod-grid-section { background: var(--stream-bg); padding: 28px 0 48px; }
        .vod-grid-container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        .vod-grid {
            display: grid; gap: 24px 20px;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        .vod-card { display: flex; flex-direction: column; gap: 10px; }
        .vod-card.is-hidden { display: none; }
        .vod-thumb {
            position: relative; display: block;
            aspect-ratio: 16 / 9; overflow: hidden; border-radius: 8px;
            background: var(--stream-surface); border: 1px solid var(--stream-border);
            transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .vod-thumb:hover {
            transform: translateY(-2px); border-color: var(--color-accent);
            box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.6);
        }
        .vod-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .vod-thumb-fallback {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            color: var(--stream-muted); font-size: 13px;
        }
        .vod-duration {
            position: absolute; right: 8px; bottom: 8px;
            padding: 2px 6px; border-radius: 3px;
            background: rgba(0, 0, 0, 0.82); color: #fff;
            font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
        }
        .vod-meta { display: flex; flex-direction: column; gap: 4px; padding: 0 2px; }
        .vod-title {
            font-size: 14px; font-weight: 600; line-height: 1.4; margin: 0;
            display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;
            -webkit-box-orient: vertical; overflow: hidden;
        }
        .vod-title a { color: var(--stream-text); }
        .vod-title a:hover { color: var(--color-accent); }
        .vod-submeta {
            font-size: 12px; color: var(--stream-muted);
            display: flex; gap: 8px; flex-wrap: wrap;
        }

        .vod-empty {
            padding: 72px 20px; text-align: center;
            color: var(--stream-muted); font-size: 15px;
        }

        .vod-pagination {
            display: flex; gap: 12px; justify-content: center;
            margin-top: 36px;
        }
        .vod-page-btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 8px 18px; border-radius: 6px;
            background: var(--stream-surface); color: var(--stream-text);
            border: 1px solid var(--stream-border);
            font-size: 13px; font-weight: 500;
            transition: border-color .15s, color .15s;
        }
        .vod-page-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
    </style>
@endpush

{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <section class="vod-hero" aria-label="VOD archive header">
        <div class="vod-hero-container">
            <div class="vod-hero-header">
                <h1 class="vod-hero-title">{{ $page->title ?? 'VOD Archive' }}</h1>
                @if ($channel)
                    <span class="vod-hero-subtitle">from {{ $channel }}</span>
                @endif
            </div>
            <div class="vod-controls">
                <input type="search" class="vod-search js-vod-search"
                       placeholder="Search titles…" aria-label="Search videos" autocomplete="off"/>
                <div class="vod-type-tabs" role="tablist" aria-label="Video type">
                    @foreach ($typeLabels as $key => $label)
                        <a href="?type={{ $key }}"
                           class="vod-type-tab {{ $type === $key ? 'is-active' : '' }}"
                           role="tab"
                           aria-selected="{{ $type === $key ? 'true' : 'false' }}">
                            {{ $label }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    <section class="vod-grid-section">
        <div class="vod-grid-container">
            @if (! $twitchEnabled)
                <div class="vod-empty">
                    Twitch integration isn't configured yet. VODs will appear here once it's enabled.
                </div>
            @elseif (empty($videos['data']))
                <div class="vod-empty">
                    No {{ strtolower($typeLabels[$type]) }} found. Check back after the next stream.
                </div>
            @else
                <div class="vod-grid js-vod-grid">
                    @foreach ($videos['data'] as $video)
                        @php
                            $thumb = str_replace(
                                ['%{width}', '%{height}', '{width}', '{height}'],
                                ['640', '360', '640', '360'],
                                $video['thumbnail_url'] ?? ''
                            );
                            $publishedAt = ! empty($video['published_at']) ? Carbon::parse($video['published_at']) : null;
                        @endphp
                        <article class="vod-card" data-title="{{ strtolower($video['title'] ?? '') }}">
                            <a class="vod-thumb"
                               href="{{ $video['url'] ?? '#' }}"
                               target="_blank" rel="noopener"
                               aria-label="Open {{ $video['title'] ?? 'video' }} on Twitch">
                                @if (! empty($thumb))
                                    <img loading="lazy"
                                         src="{{ $thumb }}"
                                         alt="{{ $video['title'] ?? '' }}"/>
                                @else
                                    <div class="vod-thumb-fallback">
                                        <i class="bi bi-film" aria-hidden="true"></i>
                                    </div>
                                @endif
                                @if (! empty($video['duration']))
                                    <span class="vod-duration">{{ $video['duration'] }}</span>
                                @endif
                            </a>
                            <div class="vod-meta">
                                <h3 class="vod-title">
                                    <a href="{{ $video['url'] ?? '#' }}" target="_blank" rel="noopener">
                                        {{ $video['title'] ?? 'Untitled' }}
                                    </a>
                                </h3>
                                <div class="vod-submeta">
                                    @if ($publishedAt)
                                        <time datetime="{{ $publishedAt->toIso8601String() }}"
                                              title="{{ $publishedAt->toDayDateTimeString() }}">
                                            {{ $publishedAt->diffForHumans() }}
                                        </time>
                                    @endif
                                    @if (isset($video['view_count']))
                                        <span aria-hidden="true">·</span>
                                        <span>{{ number_format((int) $video['view_count']) }} views</span>
                                    @endif
                                </div>
                            </div>
                        </article>
                    @endforeach
                </div>

                @if ($cursor || ! empty($videos['pagination']))
                    <nav class="vod-pagination" aria-label="VOD pagination">
                        @if ($cursor)
                            <a href="?type={{ $type }}" class="vod-page-btn" rel="prev">
                                <i class="bi bi-arrow-left" aria-hidden="true"></i> Latest
                            </a>
                        @endif
                        @if (! empty($videos['pagination']))
                            <a href="?type={{ $type }}&cursor={{ $videos['pagination'] }}" class="vod-page-btn" rel="next">
                                Older <i class="bi bi-arrow-right" aria-hidden="true"></i>
                            </a>
                        @endif
                    </nav>
                @endif
            @endif
        </div>
    </section>

    @if (! empty($page->blocks))
        <section class="stream-blocks">
            <div class="stream-blocks-container">
                <x-filament-fabricator::page-blocks :blocks="$page->blocks"/>
            </div>
        </section>
    @endif
</main>
</div> {{-- closes .stream-shell opened in partials.header-stream --}}
@stack('modals')

@push('scripts')
    <script>
        (function () {
            const input = document.querySelector('.js-vod-search');
            const grid = document.querySelector('.js-vod-grid');
            if (!input || !grid) return;

            const cards = Array.from(grid.querySelectorAll('.vod-card'));
            input.addEventListener('input', function () {
                const q = input.value.trim().toLowerCase();
                cards.forEach(function (card) {
                    const match = !q || (card.dataset.title || '').includes(q);
                    card.classList.toggle('is-hidden', !match);
                });
            });
        })();
    </script>
@endpush

{!! App\View\Helpers\LayoutSection::footer('stream') !!}
