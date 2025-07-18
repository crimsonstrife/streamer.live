@php
    use App\Settings\LookFeelSettings;use App\Settings\TwitchSettings;use function PHPUnit\Framework\isFalse;$settings = app(TwitchSettings::class);
    $themeSettings = app(LookFeelSettings::class);
@endphp

@if (! $settings->enable_integration)
    <div class="filament-alert filament-alert-warning">
        <strong>Warning:</strong> Twitch integration is disabled.
        Please enable it in
        <a href="{{ route('filament.admin.integrations.pages.twitch-settings') }}">
            Twitch Settings
        </a> to embed streams.
    </div>
@else
    @php
        // fall back to the saved default channel if none was provided
        $channel           = $channel ?? ($data['channel'] ?? $settings->channel_name);
        $chat              = $chat ?? ($data['chat'] ?? false);
        $autoplay          = $autoplay ?? ($data['autoplay'] ?? false);
        $muted             = false;
        if($autoplay) { $muted = true; };
        $horizontal_layout = $horizontal_layout ?? ($data['horizontal_layout'] ?? false);
        $theme             = $themeSettings->theme ?? 'light';
        $host              = parse_url(config('app.url'), PHP_URL_HOST);
    @endphp

    <div class="px-4 py-4 md:py-8">
        <div class="mx-auto max-w-7xl">
            <div style="display: flex; flex-direction: {{ $horizontal_layout ? 'row' : 'column' }};">
                <div class="aspect-w-16 aspect-h-9">
                    <iframe
                        src="https://player.twitch.tv/?channel={{ $channel }}&parent={{ $host }}&muted={{ $muted }}$autoplay={{ $autoplay }}"
                        height="auto"
                        width="100%"
                        allowfullscreen>
                    </iframe>
                </div>

                @if ($chat)
                    <div class="{{ $horizontal_layout ? 'w-full md:w-1/3' : '' }} mt-4 md:mt-0">
                        <iframe
                            src="https://www.twitch.tv/embed/{{ $channel }}/chat?parent={{ $host }}"
                            width="100%" height="500"
                            id="chat_embed">
                        </iframe>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endif
