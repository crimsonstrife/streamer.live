@php use App\Models\Icon; @endphp
@props([
    'icon_id',
])

@php
    $iconModel = new Icon();
    // get Icon record by ID
    $icon = $iconModel->find($icon_id);

    $rawSvg = $icon->svg_code;

    $fillColor = "currentColor";
    $strokeColor = "currentColor";

    if ($icon->style === 'outline') {
        $fillColor = "none";
    }

    if ($rawSvg) {
        // Ensure the <svg> tag gets fill="currentColor" stroke="currentColor"
        // (only replace the first <svg …> to avoid accidental inner replacements)
        $rawSvg = preg_replace(
            '/<svg\b([^>]*)>/',
            '<svg$1 fill="' . $fillColor . '" stroke="' . $strokeColor . '" height="50" width="50">',
            $rawSvg,
            1
        );
    }
@endphp

@if ($rawSvg)
    <span class="text-xs text-gray-500">
        {{-- Render the modified SVG inline --}}
        {!! $rawSvg !!}
    </span>
@elseif($icon->blade_code)
    <x-{{ $icon->blade_code }}/>
@else
    <span class="text-xs text-gray-500">No icon</span>
@endif
