@props(['icon']) {{-- an instance of App\Models\Icon --}}

@if ($icon->svg_url)
    <img src="{{ $icon->svg_url }}" alt="{{ $icon->name }}" {{ $attributes }} />
@elseif ($icon->svg_code)
    {!! $icon->svg_code !!}
@else
    <span class="text-xs text-gray-500">No icon</span>
@endif

