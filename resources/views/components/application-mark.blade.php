{{-- application-mark.blade.php --}}
@props([
    'height' => null,
    'width'  => null,
])

@php
    $settings = app(\App\Settings\SiteSettings::class);
    $logo     = $settings->site_logo;
    $alt      = $settings->site_name ?? config('app.name', 'Streamer.live');
    $disk     = \Illuminate\Support\Facades\Storage::disk('public');

    // Pre-build our optional attributes
    $heightAttr = $height  ? 'height="' . e($height) . '"' : '';
    $widthAttr  = $width   ? 'width="'  . e($width)  . '"' : '';
@endphp

@if ($logo)
    @php
        $ext = strtolower(pathinfo($logo, PATHINFO_EXTENSION));
    @endphp

    @if ($ext === 'svg' && $disk->exists($logo))
        {{-- Inline the SVG --}}
        {!! $disk->get($logo) !!}
    @else
        {{-- <img> fallback for raster or remote files --}}
        <img
            src="{{ \Illuminate\Support\Str::startsWith($logo, ['http://','https://']) ? $logo : $disk->url($logo) }}"
            {!! $heightAttr !!}
            {!! $widthAttr !!}
            alt="{{ $alt }}"
            {{ $attributes->merge(['class' => 'd-block']) }}
        />
    @endif

@else
    {{-- Default hard-coded SVG --}}
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {!! $heightAttr !!} {!! $widthAttr !!} {{ $attributes }}>
        <path d="M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z" fill="#6875F5"/>
        <path d="M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z" fill="#6875F5"/>
    </svg>
@endif

