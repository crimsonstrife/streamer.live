@php
    use App\Settings\LookFeelSettings;use App\Settings\TwitchSettings;use App\Utilities\StreamHelper;$settings = app(TwitchSettings::class);
    $style = app(LookFeelSettings::class);
    $display_mode = $style->mode;
@endphp
@if (! $settings->enable_integration)
    <div class="filament-alert filament-alert-warning">
        <strong>Warning:</strong> Twitch integration is disabled.
        Please enable it in
        <a href="{{ route('filament.admin.integrations.pages.twitch-settings') }}">
            Twitch Settings
        </a>
        before using the Stream Status Bar.
    </div>
@else
    @php
        $streamer_username = $channel ?? $settings->channel_name;
        $streamHelper      = app(StreamHelper::class);
        $streamStatus      = $streamHelper->getStreamStatus($streamer_username);
        $isLive            = ($streamStatus === 'live');
    @endphp

    @once
        <link rel="stylesheet" href="{{ asset('css/live-bar.css') }}">
    @endonce

    <div class="{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }} livebar active"
         data-live="{{ $isLive ? '1' : '0'}}">
        <div class="livebar content">
            <div class="text">{{ strtoupper($streamer_username) }} IS LIVE NOW</div>
            <div class="pulses">
                <div class="pulse"></div>
            </div>
        </div>
    </div>

    @push('scripts')
        <script src="{{ asset('js/live-bar.js') }}"></script>
    @endpush
@endif
