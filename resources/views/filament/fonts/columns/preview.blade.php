@php
    /** @var \App\Models\Font $font */
    $fontRecord = $getRecord();
    $fonts = App\Models\Font::all();
@endphp

<style>
    @foreach($fonts as $font)
        @php
            $url = $font->is_builtin ? asset("{$font->file_path}") : $font->getFirstMediaUrl('fonts');
            // determine range, either from model or default:
            $wMin = $font->weight_min ?? 100;
            $wMax = $font->weight_max ?? 900;
        @endphp
@font-face {
        font-family: '{{ $font->slug }}';
        src: url('{{ $url }}') format('woff2');
        font-weight: {{ $wMin }} {{ $wMax }};
        font-style: normal;
        font-display: swap;
    }
    @endforeach
</style>

<span
    style="
        font-family: '{{ $fontRecord->slug }}', system-ui, sans-serif;
        font-variation-settings: 'wght' {{ $fontRecord->weight_min }};
        font-size: 1.25rem;
    "
>
    The quick brown fox
</span>
