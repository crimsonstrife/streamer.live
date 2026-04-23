@props(['page'])
@php
    use App\Enums\ApprovalStatus;
    use App\Models\BlogObjects\Post;
    use App\Models\CommunityObjects\Thread;
    use App\Models\Event;
    use App\Models\SharedObjects\BrandPartner;
    use App\Settings\CommunitySettings;
    use App\Settings\DiscordSettings;
    use App\Settings\LookFeelSettings;
    use App\Settings\TwitchSettings;
    use App\Utilities\BlogHelper;
    use App\Utilities\StreamHelper;

    // --- Stream status (for sticky live chip in header + sidebar) ---
    $twitch        = app(TwitchSettings::class);
    $channel       = $twitch->channel_name;
    $twitchEnabled = $twitch->enable_integration && ! empty($channel);

    $profileBundle = app(StreamHelper::class)->getProfile($channel);
    $isLive        = $profileBundle['is_live'] ?? false;
    $liveProfile   = $profileBundle['profile'] ?? [];

    // --- Tab selection (announcements default, preserves Phase 1 behavior) ---
    $community     = app(CommunitySettings::class);
    $communityOn   = (bool) $community->enable_community;
    $allowedTabs   = $communityOn ? ['announcements', 'community'] : ['announcements'];
    $tab           = in_array(request('tab'), $allowedTabs, true) ? request('tab') : 'announcements';

    $pinned = collect();
    $feed = null;
    $authUser = auth()->user();

    if ($tab === 'community') {
        // Community threads (approved only for public; authors see own pending)
        $pinned = Thread::query()
            ->approved()
            ->pinned()
            ->with(['user', 'category'])
            ->orderBy('pinned_until', 'asc')
            ->take(3)
            ->get();

        $feed = Thread::query()
            ->where(function ($q) use ($authUser) {
                $q->where('approval_status', ApprovalStatus::Approved->value);
                if ($authUser) {
                    $q->orWhere(function ($q2) use ($authUser) {
                        $q2->where('user_id', $authUser->id)
                           ->whereIn('approval_status', [
                               ApprovalStatus::Pending->value,
                               ApprovalStatus::Approved->value,
                           ]);
                    });
                }
            })
            ->when($pinned->isNotEmpty(), fn ($q) => $q->whereNotIn('id', $pinned->pluck('id')))
            ->with(['user', 'category'])
            ->orderByDesc('last_activity_at')
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();
    } else {
        // Announcements (Phase 1 feed)
        $pinned = Post::withPublishedContext()
            ->pinned()
            ->withCount(['comments', 'reactions'])
            ->orderBy('pinned_until', 'asc')
            ->take(3)
            ->get();

        $feed = Post::withPublishedContext()
            ->announcements()
            ->published()
            ->when($pinned->isNotEmpty(), fn ($q) => $q->whereNotIn('id', $pinned->pluck('id')))
            ->withCount(['comments', 'reactions'])
            ->latest('published_at')
            ->paginate(15)
            ->withQueryString();
    }

    // --- Sidebar content ---
    $discord = app(DiscordSettings::class);
    $discordEnabled = $discord->enable_integration && ! empty($discord->guild_id);
    $lookFeel = app(LookFeelSettings::class);
    $discordTheme = $lookFeel->mode !== 'auto' ? $lookFeel->mode : 'dark';

    $upcomingEvents = Event::query()
        ->where('starts_at', '>', now())
        ->orderBy('starts_at')
        ->take(4)
        ->get();
    $nextEvent = $upcomingEvents->first();

    $sponsor = BrandPartner::query()->inRandomOrder()->first();

    // --- SEO data passed to header-stream ---
    $data = [
        'page'        => $page,
        'post'        => null,
        'title'       => $page->seo_title ?? $page->title ?? 'Community Hub',
        'description' => \Illuminate\Support\Str::limit(strip_tags($page->seo_description ?? ''), 160)
            ?: ($channel ? "Announcements, updates, and the community around {$channel}." : 'Community announcements and updates.'),
        'keywords'    => $page->tags->pluck('name')->implode(', '),
        'image'       => $liveProfile['profile_image_url'] ?? null,
        'imageAlt'    => $channel,
        'author'      => '',
        'type'        => 'website',
        'category'    => $page->type,
        'date'        => $page->created_at->toIso8601String(),
        'isLive'      => $isLive,
        'channel'     => $channel,
    ];
@endphp

@push('styles')
    <style>
        /* Hub hero */
        .hub-hero {
            background: linear-gradient(180deg, var(--stream-surface) 0%, var(--stream-bg) 100%);
            border-bottom: 1px solid var(--stream-border);
            padding: 28px 0 0;
        }
        .hub-hero-container {
            max-width: 1400px; margin: 0 auto; padding: 0 20px;
            display: flex; flex-direction: column; gap: 14px;
        }
        .hub-hero-heading {
            display: flex; align-items: baseline; flex-wrap: wrap; gap: 12px;
        }
        .hub-hero-title {
            font-size: 28px; font-weight: 800; letter-spacing: -0.01em; margin: 0;
        }
        .hub-hero-subtitle {
            color: var(--stream-muted); font-size: 14px; margin: 0;
        }
        .hub-hero-cta-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .hub-cta {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 8px 16px; border-radius: 6px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 14px; text-decoration: none;
        }
        .hub-cta:hover { filter: brightness(1.1); color: #fff; }
        .hub-cta--ghost {
            background: var(--stream-surface); color: var(--stream-text) !important;
            border: 1px solid var(--stream-border);
        }
        .hub-cta--ghost:hover { border-color: var(--color-accent); color: var(--color-accent) !important; }

        .hub-tabs {
            display: flex; gap: 0;
            border-bottom: 1px solid var(--stream-border);
            margin: 8px -20px 0;
            padding: 0 20px;
        }
        .hub-tab {
            padding: 10px 16px;
            color: var(--stream-muted); font-size: 14px; font-weight: 500;
            text-decoration: none;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
            transition: color .15s ease, border-color .15s ease;
        }
        .hub-tab:hover { color: var(--stream-text); }
        .hub-tab.is-active {
            color: var(--color-accent);
            border-bottom-color: var(--color-accent);
        }

        /* Main two-column */
        .hub-main { background: var(--stream-bg); padding: 24px 0 48px; }
        .hub-main-container {
            max-width: 1400px; margin: 0 auto; padding: 0 20px;
            display: grid; gap: 24px;
            grid-template-columns: minmax(0, 1fr);
        }
        @media (min-width: 992px) {
            .hub-main-container { grid-template-columns: minmax(0, 1fr) 340px; }
        }

        /* Feed */
        .hub-feed { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .hub-section-title {
            font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
            color: var(--stream-muted); margin: 8px 2px 4px;
        }
        .hub-card {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 10px;
            padding: 18px 20px;
            display: flex; flex-direction: column; gap: 10px;
            transition: border-color .15s ease, transform .15s ease;
        }
        .hub-card:hover { border-color: var(--color-accent); transform: translateY(-1px); }
        .hub-card--pinned {
            border-color: color-mix(in srgb, var(--color-accent) 45%, var(--stream-border));
            background: linear-gradient(180deg,
                color-mix(in srgb, var(--color-accent) 8%, var(--stream-surface)) 0%,
                var(--stream-surface) 100%);
        }
        .hub-card-badges {
            display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
        }
        .hub-badge {
            display: inline-flex; align-items: center; gap: 4px;
            padding: 2px 8px; border-radius: 999px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
            text-transform: uppercase;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
        }
        .hub-badge--pinned {
            background: color-mix(in srgb, var(--color-accent) 20%, transparent);
            color: var(--color-accent);
            border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
        }
        .hub-badge--announcement {
            background: color-mix(in srgb, #f59e0b 18%, transparent);
            color: #fbbf24;
            border-color: color-mix(in srgb, #f59e0b 40%, transparent);
        }
        .hub-card-title {
            font-size: 18px; font-weight: 700; line-height: 1.3; margin: 0;
        }
        .hub-card-title a { color: var(--stream-text); }
        .hub-card-title a:hover { color: var(--color-accent); }
        .hub-card-excerpt {
            color: var(--stream-muted); font-size: 14px; line-height: 1.55; margin: 0;
            display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3;
            -webkit-box-orient: vertical; overflow: hidden;
        }
        .hub-card-meta {
            font-size: 12px; color: var(--stream-muted);
            display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
        }
        .hub-card-meta .hub-meta-dot {
            width: 3px; height: 3px; border-radius: 50%;
            background: var(--stream-muted); display: inline-block;
        }

        .hub-empty {
            padding: 48px 20px; text-align: center;
            color: var(--stream-muted); font-size: 14px;
            border: 1px dashed var(--stream-border); border-radius: 10px;
        }

        .hub-pagination { margin-top: 12px; }
        .hub-pagination nav { color: var(--stream-muted); }
        .hub-pagination .pagination { gap: 4px; }
        .hub-pagination .page-link {
            background: var(--stream-surface); border: 1px solid var(--stream-border);
            color: var(--stream-text); border-radius: 6px;
        }
        .hub-pagination .page-item.active .page-link {
            background: var(--color-accent); border-color: var(--color-accent); color: #fff;
        }
        .hub-pagination .page-item.disabled .page-link {
            background: var(--stream-surface); color: var(--stream-muted);
        }

        /* Sidebar */
        .hub-sidebar { display: flex; flex-direction: column; gap: 16px; }
        @media (min-width: 992px) {
            .hub-sidebar { position: sticky; top: 72px; align-self: start; }
        }
        .hub-panel {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 10px;
            padding: 16px 18px;
        }
        .hub-panel-title {
            font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
            color: var(--stream-muted); margin: 0 0 10px;
        }
        .hub-panel-body { font-size: 14px; color: var(--stream-text); }
        .hub-panel-body .text-muted { color: var(--stream-muted) !important; font-size: 13px; }
        .hub-panel-cta {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 6px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 13px;
            margin-top: 8px;
        }
        .hub-panel-cta:hover { filter: brightness(1.1); color: #fff; }

        .hub-livechip {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 4px 10px; border-radius: 999px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
            text-transform: uppercase;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
        }
        .hub-livechip.is-live {
            color: #fff; background: var(--stream-live); border-color: var(--stream-live);
        }
        .hub-livechip .dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; display: inline-block;
        }
        .hub-livechip.is-live .dot {
            background: #fff; animation: streamPulse 1.6s ease-in-out infinite;
        }

        .hub-event-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .hub-event-list li {
            display: flex; flex-direction: column; gap: 2px;
            padding-bottom: 8px; border-bottom: 1px solid var(--stream-border);
        }
        .hub-event-list li:last-child { border-bottom: 0; padding-bottom: 0; }
        .hub-event-title { font-size: 13px; font-weight: 600; color: var(--stream-text); }
        .hub-event-time { font-size: 12px; color: var(--stream-muted); }

        .hub-countdown { font-size: 24px; font-weight: 800; letter-spacing: 0.02em; font-variant-numeric: tabular-nums; }
        .hub-countdown .unit { font-size: 11px; color: var(--stream-muted); font-weight: 600; margin-left: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

        .hub-sponsor {
            display: flex; align-items: center; gap: 12px;
        }
        .hub-sponsor img {
            width: 48px; height: 48px; border-radius: 8px; object-fit: cover;
            background: var(--stream-surface-2); border: 1px solid var(--stream-border);
        }
        .hub-sponsor-name { font-size: 14px; font-weight: 600; color: var(--stream-text); }
        .hub-sponsor-tag { font-size: 12px; color: var(--stream-muted); }

        .hub-discord-widget { border: 0; border-radius: 6px; display: block; }
    </style>
@endpush

{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <section class="hub-hero" aria-label="Community Hub header">
        <div class="hub-hero-container">
            <div class="hub-hero-heading">
                <h1 class="hub-hero-title">{{ $page->title ?? 'Community' }}</h1>
                <p class="hub-hero-subtitle">
                    Announcements, threads, and what's happening around the stream.
                </p>
            </div>

            @if ($communityOn)
                <div class="hub-hero-cta-row">
                    @auth
                        <a href="{{ route('community.thread.create') }}" class="hub-cta">
                            <i class="bi bi-plus-lg" aria-hidden="true"></i> Start a thread
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="hub-cta hub-cta--ghost">
                            Sign in to start a thread
                        </a>
                    @endauth
                </div>
            @endif

            @if (count($allowedTabs) > 1)
                <nav class="hub-tabs" aria-label="Community feed tabs">
                    <a href="?tab=announcements"
                       class="hub-tab {{ $tab === 'announcements' ? 'is-active' : '' }}">
                        Announcements
                    </a>
                    <a href="?tab=community"
                       class="hub-tab {{ $tab === 'community' ? 'is-active' : '' }}">
                        Community
                    </a>
                </nav>
            @endif
        </div>
    </section>

    <section class="hub-main">
        <div class="hub-main-container">
            {{-- LEFT: feed --}}
            <div class="hub-feed">
                @if ($pinned->isNotEmpty())
                    <h2 class="hub-section-title">Pinned</h2>
                    @foreach ($pinned as $item)
                        @if ($tab === 'community')
                            @include('partials.community-hub._thread-card', ['thread' => $item, 'pinned' => true])
                        @else
                            @include('partials.community-hub._post-card', ['post' => $item, 'pinned' => true])
                        @endif
                    @endforeach
                @endif

                @if ($feed && $feed->isNotEmpty())
                    <h2 class="hub-section-title">{{ $tab === 'community' ? 'Recent Threads' : 'Latest' }}</h2>
                    @foreach ($feed as $item)
                        @if ($tab === 'community')
                            @include('partials.community-hub._thread-card', ['thread' => $item, 'pinned' => false])
                        @else
                            @include('partials.community-hub._post-card', ['post' => $item, 'pinned' => false])
                        @endif
                    @endforeach

                    @if ($feed->hasPages())
                        <div class="hub-pagination">
                            {{ $feed->links() }}
                        </div>
                    @endif
                @elseif ($pinned->isEmpty())
                    <div class="hub-empty">
                        @if ($tab === 'community')
                            No community threads yet. Be the first to start one!
                        @else
                            No announcements yet. Mark a blog post as an announcement in the admin to surface it here.
                        @endif
                    </div>
                @endif
            </div>

            {{-- RIGHT: sidebar --}}
            <aside class="hub-sidebar" aria-label="Community sidebar">
                {{-- Live chip --}}
                @if ($twitchEnabled)
                    <div class="hub-panel">
                        <div class="hub-panel-title">Stream Status</div>
                        <div class="hub-panel-body">
                            <a href="https://twitch.tv/{{ $channel }}" target="_blank" rel="noopener"
                               class="hub-livechip {{ $isLive ? 'is-live' : '' }}">
                                <span class="dot"></span>{{ $isLive ? 'Live Now' : 'Offline' }}
                            </a>
                            @if ($isLive)
                                <div class="text-muted mt-2">{{ $channel }} is streaming — tap to watch.</div>
                            @endif
                        </div>
                    </div>
                @endif

                {{-- Next stream countdown --}}
                @if ($nextEvent)
                    <div class="hub-panel">
                        <div class="hub-panel-title">Next Stream</div>
                        <div class="hub-panel-body">
                            <div class="hub-event-title">{{ $nextEvent->title }}</div>
                            <div class="hub-event-time" x-data x-init="$nextTick(() => {})">
                                <time datetime="{{ $nextEvent->starts_at->toIso8601String() }}">
                                    {{ $nextEvent->starts_at->format('D M j, g:i a') }}
                                </time>
                            </div>
                            <div class="hub-countdown mt-2"
                                 data-countdown-target="{{ $nextEvent->starts_at->toIso8601String() }}"
                                 aria-live="polite">—</div>
                        </div>
                    </div>
                @endif

                {{-- Discord --}}
                @if ($discordEnabled)
                    <div class="hub-panel">
                        <div class="hub-panel-title">Discord</div>
                        <div class="hub-panel-body">
                            <iframe class="hub-discord-widget"
                                    src="https://discord.com/widget?id={{ $discord->guild_id }}&theme={{ $discordTheme }}"
                                    width="100%" height="300"
                                    allowtransparency="true"
                                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                                    title="Discord community widget"></iframe>
                        </div>
                    </div>
                @endif

                {{-- Upcoming schedule (beyond just the next one) --}}
                @if ($upcomingEvents->count() > 1)
                    <div class="hub-panel">
                        <div class="hub-panel-title">Upcoming</div>
                        <div class="hub-panel-body">
                            <ul class="hub-event-list">
                                @foreach ($upcomingEvents->skip(1) as $event)
                                    <li>
                                        <span class="hub-event-title">{{ $event->title }}</span>
                                        <time class="hub-event-time" datetime="{{ $event->starts_at->toIso8601String() }}">
                                            {{ $event->starts_at->format('D M j, g:i a') }}
                                        </time>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                @endif

                {{-- Sponsor spotlight --}}
                @if ($sponsor)
                    <div class="hub-panel">
                        <div class="hub-panel-title">Sponsor Spotlight</div>
                        <div class="hub-panel-body">
                            <div class="hub-sponsor">
                                @if (method_exists($sponsor, 'getFirstMediaUrl') && $sponsor->getFirstMediaUrl('logo'))
                                    <img src="{{ $sponsor->getFirstMediaUrl('logo') }}" alt="{{ $sponsor->name ?? 'Sponsor' }}"/>
                                @endif
                                <div>
                                    <div class="hub-sponsor-name">{{ $sponsor->name ?? 'Our Sponsor' }}</div>
                                    @if (! empty($sponsor->tagline))
                                        <div class="hub-sponsor-tag">{{ \Illuminate\Support\Str::limit($sponsor->tagline, 60) }}</div>
                                    @endif
                                </div>
                            </div>
                            @if (! empty($sponsor->url))
                                <a href="{{ $sponsor->url }}" target="_blank" rel="noopener sponsored"
                                   class="hub-panel-cta">Visit</a>
                            @endif
                        </div>
                    </div>
                @endif
            </aside>
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
            var el = document.querySelector('[data-countdown-target]');
            if (!el) return;
            var target = new Date(el.getAttribute('data-countdown-target')).getTime();
            function pad(n) { return n < 10 ? '0' + n : '' + n; }
            function tick() {
                var diff = target - Date.now();
                if (diff <= 0) {
                    el.innerHTML = '<span>Live soon</span>';
                    return;
                }
                var d = Math.floor(diff / 86400000);
                var h = Math.floor((diff % 86400000) / 3600000);
                var m = Math.floor((diff % 3600000) / 60000);
                var s = Math.floor((diff % 60000) / 1000);
                el.innerHTML = (d > 0 ? d + '<span class="unit">d</span> ' : '') +
                    pad(h) + '<span class="unit">h</span> ' +
                    pad(m) + '<span class="unit">m</span> ' +
                    pad(s) + '<span class="unit">s</span>';
            }
            tick();
            setInterval(tick, 1000);
        })();
    </script>
@endpush

{!! App\View\Helpers\LayoutSection::footer('stream') !!}
