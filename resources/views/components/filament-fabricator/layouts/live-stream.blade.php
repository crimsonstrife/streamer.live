@props(['page'])
@php
    use App\Settings\TwitchSettings;
    use App\Utilities\StreamHelper;

    $twitch        = app(TwitchSettings::class);
    $channel       = $twitch->channel_name;
    $twitchEnabled = $twitch->enable_integration && ! empty($channel);
    $host          = request()->getHost();

    $streamInfo = null;
    $isLive     = false;
    if ($twitchEnabled) {
        $helper     = app(StreamHelper::class);
        $streamData = $helper->getStreamInfo($channel);
        $streamInfo = $streamData[0] ?? null;
        $isLive     = ($streamInfo['type'] ?? null) === 'live';
    }

    $data = [
        'page'        => $page,
        'post'        => null,
        'title'       => $page->seo_title ?? $page->title ?? ($channel ? "Watch {$channel} Live" : 'Live Stream'),
        'description' => \Illuminate\Support\Str::limit(strip_tags($page->seo_description ?? ''), 160)
            ?: ($channel ? "Watch {$channel} live and chat with the community." : 'Watch the live stream.'),
        'keywords'    => $page->tags->pluck('name')->implode(', '),
        'image'       => null,
        'imageAlt'    => null,
        'author'      => '',
        'type'        => 'website',
        'category'    => $page->type,
        'date'        => $page->created_at->toIso8601String(),
        'isLive'      => $isLive,
        'channel'     => $channel,
    ];
@endphp
{!! App\View\Helpers\LayoutSection::header('stream', $data) !!}

<main class="stream-main flex-grow-1">
    <section class="stream-hero" aria-label="Live stream">
        @if ($twitchEnabled)
            <div class="stream-player">
                <iframe
                    src="https://player.twitch.tv/?channel={{ $channel }}&parent={{ $host }}&muted=true"
                    allowfullscreen
                    title="{{ $channel }} Twitch player"
                ></iframe>
            </div>
            <div class="stream-chat">
                <iframe
                    src="https://www.twitch.tv/embed/{{ $channel }}/chat?parent={{ $host }}&darkpopout"
                    title="{{ $channel }} Twitch chat"
                ></iframe>
            </div>
        @else
            <div class="stream-placeholder">
                <div>
                    <h2 class="mb-2">Stream Offline</h2>
                    <p class="mb-0 text-muted-stream">
                        Twitch integration isn't configured yet. Check back soon.
                    </p>
                </div>
            </div>
        @endif
    </section>

    @if ($twitchEnabled)
        <section class="stream-info-strip" aria-label="Stream info">
            <div class="stream-info-container">
                <span class="stream-status-chip {{ $isLive ? 'is-live' : 'is-offline' }}">
                    <span class="dot"></span>{{ $isLive ? 'Live' : 'Offline' }}
                </span>
                <div class="stream-meta">
                    <div class="stream-title-line">
                        {{ $streamInfo['title'] ?? ($isLive ? 'Streaming now' : 'Stream is offline — follow to be notified when it starts.') }}
                    </div>
                    @if ($streamInfo)
                        <div class="stream-sub-line">
                            @if (! empty($streamInfo['game_name']))
                                <span class="stream-game">{{ $streamInfo['game_name'] }}</span>
                            @endif
                            @if ($isLive && isset($streamInfo['viewer_count']))
                                <span class="stream-viewers">
                                    <i class="bi bi-eye-fill" aria-hidden="true"></i>
                                    {{ number_format($streamInfo['viewer_count']) }}
                                </span>
                            @endif
                        </div>
                    @endif
                </div>
                <a href="https://twitch.tv/{{ $channel }}" target="_blank" rel="noopener" class="stream-cta">
                    Open on Twitch
                </a>
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
