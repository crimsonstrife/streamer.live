@props(['page','post','product'])
@php
    /** @var \App\Settings\LookFeelSettings $style */
    $style = app(\App\Settings\LookFeelSettings::class);
@endphp

{!! App\View\Helpers\LayoutSection::header() !!}

<style>
    :root {
        --color-primary:   {{ $style->primary_color }};
        --color-secondary: {{ $style->secondary_color }};
        --color-accent: {{ $style->accent_color }};
    }
</style>

<!-- Page Content -->
<main class="flex-grow-1">
    <div class="container py-4">
        {{ $slot }}
    </div>
</main>
</div> <!-- Tag match is actually contained in the header, pulled in via LayoutSection::header() -->

@stack('modals')
{!! App\View\Helpers\LayoutSection::footer() !!}
