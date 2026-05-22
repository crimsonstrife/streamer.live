@php
    /** @var \App\Settings\LookFeelSettings $style */
    $style = app(\App\Settings\LookFeelSettings::class);

    $fontPrimary = $style->font_family === 'system' || ! $style->font_family
        ? 'system-ui, sans-serif'
        : '"'.$style->font_family.'", system-ui, sans-serif';

    $fontSecondary = $style->font_family_alt === 'system' || ! $style->font_family_alt
        ? 'system-ui, sans-serif'
        : '"'.$style->font_family_alt.'", system-ui, sans-serif';
@endphp
<style>
    [data-bs-theme='light'], [data-bs-theme='dark'] {
        --font-primary: {!! $fontPrimary !!};
        --font-secondary: {!! $fontSecondary !!};
        --color-primary: {{ $style->primary_color }};
        --color-secondary: {{ $style->secondary_color }};
        --color-accent: {{ $style->accent_color }};
        --color-font: {{ $style->font_color }};
        --color-font-alt: {{ $style->font_alt_color }};
        --color-disabled: {{ $style->disabled_color }};
        --color-active: {{ $style->active_color }};
        --color-hover: {{ $style->hover_color }};
        --color-link: {{ $style->link_color }};
        --color-success: {{ $style->success_color }};
        --color-info: {{ $style->info_color }};
        --color-warning: {{ $style->warning_color }};
        --color-error: {{ $style->error_color }};
        --bs-primary: var(--color-primary);
        --bs-secondary: var(--color-secondary);
        --bs-nav-link-color: var(--color-link);
        --bs-pagination-active-bg: var(--color-active);
        --bs-pagination-active-border-color: var(--color-active);
    }
</style>
