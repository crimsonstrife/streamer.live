@php use App\Filament\Fabricator\PageBlocks\TwitchStreamStatus; @endphp
@aware(['page'])
@php
    $streamer_username = $channel ?? config('services.twitch.channel_name');
    $isLive = false;

    // Check if stream is live
    if ($streamer_username)
        {
            $streamHelper = app(\App\Utilities\StreamHelper::class);
            $streamStatus = $streamHelper->getStreamStatus($streamer_username);

            $isLive = ($streamStatus === 'live');
        }
@endphp
@once
    <link rel="stylesheet" href="{{ asset('css/live-bar.css') }}">
@endonce
<div class="livebar gold data-live="{{ $isLive ? '1' : '0' }}" >
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

