@props([
    'alias' => null,
    'class' => '',
    'icon' => null,
])

@php
    $resolvedAlias = $alias ? \Filament\Support\Facades\FilamentIcon::resolve($alias) : null;
    $resolvedIcon = $resolvedAlias ?: ($icon ?? $slot);
@endphp

@if ($icon instanceof \Illuminate\Contracts\Support\Htmlable)
    <span {{ $attributes->class($class) }}>
        {{ $icon }}
    </span>
@elseif (str_contains($icon, '/'))
    <img
        {{
            $attributes
                ->merge(['src' => $icon])
                ->class($class)
        }}
     alt="{{ $resolvedAlias }}"/>
@else
    @svg(
        $icon,
        $class,
        array_filter($attributes->getAttributes()),
    )
@endif
