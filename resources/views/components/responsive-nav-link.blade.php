@props(['active'])

@php
$classes = ($active ?? false)
            ? 'nav-link active fw-medium text-primary'
            : 'nav-link fw-medium text-dark';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>