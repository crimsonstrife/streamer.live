@props(['active'])

@php
$classes = ($active ?? false)
            ? 'nav-link active text-primary fw-semibold border-bottom border-primary'
            : 'nav-link text-dark fw-medium border-bottom border-transparent';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>