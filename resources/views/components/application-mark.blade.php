{{-- application-mark.blade.php --}}
@props([
    'height' => 50,
    'width'  => 50,
])

@php
    // Grab whatever the user uploaded (path or URL) from Spatie settings:
    $logo = app(\App\Settings\SiteSettings::class)->site_logo;
    // Fallback name for alt text:
    $alt  = app(\App\Settings\SiteSettings::class)->site_name ?? config('app.name');
@endphp

@if ($logo)
    @php
        // Quick‐and‐dirty extension check:
        $ext = strtolower(pathinfo($logo, PATHINFO_EXTENSION));
    @endphp

    @if ($ext === 'svg'
          && \Illuminate\Support\Facades\Storage::disk('public')->exists($logo))
        {{-- Inline the SVG so it inherits CSS, can be styled/scaled natively --}}
        {!! \Illuminate\Support\Facades\Storage::disk('public')->get($logo) !!}
    @else
        {{-- Standard <img> for PNG/JPG/GIF or a remote URL --}}
        <img
            src="{{ \Illuminate\Support\Str::startsWith($logo, ['http://','https://'])
                    ? $logo
                    : \Illuminate\Support\Facades\Storage::url($logo) }}"
            height="{{ $height }}"
            width="{{ $width }}"
            alt="{{ $alt }}"
            {{ $attributes->merge(['class' => 'd-block']) }}
        />
    @endif
@else
    {{-- Default SVG --}}
    <svg viewBox="0 0 48 48" fill="none" height="{{ $height }}" width="{{ $width }}" xmlns="http://www.w3.org/2000/svg" {{ $attributes }}>
        <path d="M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z"
            fill="#6875F5"/>
        <path d="M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z"
            fill="#6875F5"/>
    </svg>
@endif

