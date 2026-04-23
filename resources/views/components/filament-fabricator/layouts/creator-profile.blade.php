@props(['page'])
@php
    use App\Settings\TwitchSettings;
    use App\Utilities\StreamHelper;

    $twitch        = app(TwitchSettings::class);
    $channel       = $twitch->channel_name;
    $twitchEnabled = $twitch->enable_integration && ! empty($channel);

    $profileBundle = app(StreamHelper::class)->getProfile($channel);
    $profile       = $profileBundle['profile'] ?? [];
    $stats         = $profileBundle['stats'] ?? [];
    $isLive        = $profileBundle['is_live'] ?? false;

    $avatar      = $profile['profile_image_url'] ?? null;
    $banner      = $profile['offline_image_url'] ?? null;
    $displayName = $profile['display_name'] ?? $channel ?? $page->title;
    $bio         = trim($profile['description'] ?? '');
    $tagline     = $bio ?: \Illuminate\Support\Str::limit(strip_tags($page->seo_description ?? ''), 200);

    $data = [
        'page'        => $page,
        'post'        => null,
        'title'       => $page->seo_title ?? $page->title ?? ($displayName ? "{$displayName} — Creator Profile" : 'Creator Profile'),
        'description' => \Illuminate\Support\Str::limit(strip_tags($page->seo_description ?? ''), 160)
            ?: ($displayName ? "About {$displayName}" : 'Creator profile.'),
        'keywords'    => $page->tags->pluck('name')->implode(', '),
        'image'       => $avatar,
        'imageAlt'    => $displayName,
        'author'      => $displayName ?? '',
        'type'        => 'profile',
        'category'    => $page->type,
        'date'        => $page->created_at->toIso8601String(),
        'isLive'      => $isLive,
        'channel'     => $channel,
    ];
@endphp

@push('styles')
    <style>
        .profile-hero { position: relative; background: var(--stream-bg); }
        .profile-hero-banner {
            height: 280px;
            background-size: cover; background-position: center;
            background-color: var(--stream-surface);
            border-bottom: 1px solid var(--stream-border);
            position: relative;
        }
        .profile-hero-banner::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(180deg, rgba(11, 11, 14, 0) 40%, rgba(11, 11, 14, 0.55) 100%);
            pointer-events: none;
        }
        .profile-hero-banner--fallback {
            background-image: linear-gradient(135deg,
                color-mix(in srgb, var(--color-accent) 65%, #000) 0%,
                var(--stream-surface-2) 100%);
        }
        .profile-hero-content { background: var(--stream-surface); }
        .profile-hero-container {
            max-width: 1400px; margin: 0 auto; padding: 0 20px 24px;
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 24px; align-items: end;
        }
        .profile-hero-avatar {
            width: 160px; height: 160px; margin-top: -80px;
            border-radius: 50%; overflow: hidden;
            background: var(--stream-surface);
            border: 4px solid var(--stream-surface);
            box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.6);
            flex-shrink: 0;
        }
        .profile-hero-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .profile-hero-avatar-fallback {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            font-size: 64px; font-weight: 800;
            color: var(--stream-text);
            background: var(--stream-surface-2);
        }

        .profile-hero-meta { padding-bottom: 6px; min-width: 0; }
        .profile-hero-name {
            font-size: 30px; font-weight: 800; letter-spacing: -0.01em;
            margin: 0 0 6px; line-height: 1.15;
        }
        .profile-hero-tagline {
            color: var(--stream-muted); margin: 0 0 14px;
            font-size: 14px; line-height: 1.55;
            max-width: 65ch;
        }

        /* The _socials partial renders <ul class="list-unstyled d-flex"> with <li class="ms-4">.
           Override to remove left margin on first item and give a uniform gap that reads as a row. */
        .profile-hero-socials ul { margin: 0; padding: 0; gap: 16px; flex-wrap: wrap; }
        .profile-hero-socials li { margin: 0 !important; }
        .profile-hero-socials a {
            display: inline-flex; align-items: center; justify-content: center;
            width: 36px; height: 36px; border-radius: 8px;
            background: var(--stream-surface-2); color: var(--stream-text);
            border: 1px solid var(--stream-border);
            transition: border-color .15s, color .15s, transform .15s;
        }
        .profile-hero-socials a:hover {
            border-color: var(--color-accent); color: var(--color-accent);
            transform: translateY(-1px);
        }
        .profile-hero-socials svg { width: 18px; height: 18px; }

        .profile-hero-cta {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 20px; border-radius: 8px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 14px;
            margin-bottom: 8px; white-space: nowrap;
            transition: filter .15s;
        }
        .profile-hero-cta:hover { filter: brightness(1.1); color: #fff; }

        @media (max-width: 767.98px) {
            .profile-hero-banner { height: 180px; }
            .profile-hero-container {
                grid-template-columns: 1fr; gap: 12px;
                padding: 0 20px 20px;
            }
            .profile-hero-avatar { width: 120px; height: 120px; margin-top: -60px; }
            .profile-hero-name { font-size: 24px; }
            .profile-hero-cta { align-self: flex-start; }
        }

        /* Stats strip */
        .profile-stats {
            background: var(--stream-bg);
            border-top: 1px solid var(--stream-border);
            padding: 20px 0;
        }
        .profile-stats-container {
            max-width: 1400px; margin: 0 auto; padding: 0 20px;
            display: grid; gap: 12px;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        }
        .profile-stat {
            background: var(--stream-surface);
            border: 1px solid var(--stream-border);
            border-radius: 8px;
            padding: 16px 20px;
            display: flex; flex-direction: column; gap: 4px;
        }
        .profile-stat-value {
            font-size: 22px; font-weight: 800;
            color: var(--stream-text); line-height: 1.2;
            font-variant-numeric: tabular-nums;
        }
        .profile-stat-label {
            font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
            color: var(--stream-muted); font-weight: 600;
        }
        .profile-stat-chip {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 4px 10px; border-radius: 999px;
            font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
            text-transform: uppercase;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
            width: fit-content;
        }
        .profile-stat-chip.is-live {
            color: #fff; background: var(--stream-live); border-color: var(--stream-live);
        }
        .profile-stat-chip .dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; display: inline-block;
        }
        .profile-stat-chip.is-live .dot {
            background: #fff; animation: streamPulse 1.6s ease-in-out infinite;
        }
    </style>
@endpush

{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <section class="profile-hero" aria-label="Creator profile">
        <div class="profile-hero-banner {{ $banner ? '' : 'profile-hero-banner--fallback' }}"
             @if ($banner) style="background-image: url('{{ $banner }}');" @endif
             role="presentation"></div>

        <div class="profile-hero-content">
            <div class="profile-hero-container">
                <div class="profile-hero-avatar">
                    @if ($avatar)
                        <img src="{{ $avatar }}" alt="{{ $displayName }}"/>
                    @else
                        <div class="profile-hero-avatar-fallback">
                            {{ strtoupper(mb_substr($displayName ?? '?', 0, 1)) }}
                        </div>
                    @endif
                </div>

                <div class="profile-hero-meta">
                    <h1 class="profile-hero-name">{{ $displayName }}</h1>
                    @if ($tagline)
                        <p class="profile-hero-tagline">{{ $tagline }}</p>
                    @endif
                    <div class="profile-hero-socials">
                        @include('partials._socials', ['limit' => 8])
                    </div>
                </div>

                @if ($channel)
                    <a href="https://twitch.tv/{{ $channel }}" target="_blank" rel="noopener"
                       class="profile-hero-cta">
                        <i class="bi bi-twitch" aria-hidden="true"></i>
                        <span>Watch on Twitch</span>
                    </a>
                @endif
            </div>
        </div>
    </section>

    @if ($twitchEnabled)
        <section class="profile-stats" aria-label="Channel stats">
            <div class="profile-stats-container">
                @if (! is_null($stats['followers']))
                    <div class="profile-stat">
                        <div class="profile-stat-value">{{ number_format($stats['followers']) }}</div>
                        <div class="profile-stat-label">Followers</div>
                    </div>
                @endif
                @if (! empty($stats['subscribers']))
                    <div class="profile-stat">
                        <div class="profile-stat-value">{{ number_format($stats['subscribers']) }}</div>
                        <div class="profile-stat-label">Subscribers</div>
                    </div>
                @endif
                @if (! empty($stats['total_views']))
                    <div class="profile-stat">
                        <div class="profile-stat-value">{{ number_format($stats['total_views']) }}</div>
                        <div class="profile-stat-label">Total Views</div>
                    </div>
                @endif
                <div class="profile-stat">
                    <span class="profile-stat-chip {{ $isLive ? 'is-live' : '' }}">
                        <span class="dot"></span>{{ $isLive ? 'Live Now' : 'Offline' }}
                    </span>
                    <div class="profile-stat-label">Stream Status</div>
                </div>
            </div>
        </section>
    @endif

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
{!! App\View\Helpers\LayoutSection::footer('stream') !!}
