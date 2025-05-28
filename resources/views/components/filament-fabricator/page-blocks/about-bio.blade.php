@aware(['page'])
@php
    $portrait   = $portraitImage;
    $bioContent = $bio;
    $readMore   = $readMoreUrl;
    $stats      = $stats;
    $uid        = 'bio-' . uniqid();
@endphp

<div id="{{ $uid }}" class="about-bio-block text-center">
    @if($portrait)
        <img
            src="{{ Storage::url($portrait) }}"
            alt="Portrait"
            class="rounded-circle mb-4"
            style="width:150px;height:150px;object-fit:cover;"
        >
    @endif

    <div class="bio-content mb-3">
        {!! $bioContent !!}
    </div>

    <div class="bio-stats d-flex justify-content-center gap-4 mb-3">
        <div>
            <strong>{{ $stats['years_streaming'] }}</strong><br>
            <small>Years Streaming</small>
        </div>
        <div>
            <strong>{{ number_format($stats['followers']) }}</strong><br>
            <small>Followers</small>
        </div>
        <div>
            <strong>{{ number_format($stats['subscribers']) }}</strong><br>
            <small>Subscribers</small>
        </div>
    </div>

    @if($readMore)
        <a href="{{ $readMore }}" class="btn btn-primary">Read More</a>
    @endif
</div>
