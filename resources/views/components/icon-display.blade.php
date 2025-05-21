@props([
    'svg_url'  => null,
    'svg_code' => null,
])

@if ($svg_url)
    <img src="{{ $svg_url }}" alt="" {{ $attributes }} />
@elseif ($svg_code)
    {!! $svg_code !!}
@else
    <span class="text-xs text-gray-500">No icon</span>
@endif
