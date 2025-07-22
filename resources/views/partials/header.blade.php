@php use App\Settings\SiteSettings; @endphp
@php use App\Settings\LookFeelSettings; @endphp
{{-- header.blade.php --}}
@props([
    'page'        => null,
    'post'        => null,
    'title'       => null,
    'description' => null,
    'keywords'    => null,
    'image'       => null,
    'imageAlt'    => null,
    'author'      => null,
    'type'        => null,
    'category'    => null,
    'date'        => null,
])
@php
    $settings    = app(SiteSettings::class);
    $siteName    = $settings->site_name ?? config('app.name', 'Streamer.live');
    $showName    = $settings->show_site_name;
    $logoHeight  = 50;
    $logoWidth   = null;
@endphp
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <x-seo.tags
        :page="$page"
        :title="$title"
        :description="$description"
        :keywords="$keywords"
        :image="$image"
        :image-alt="$imageAlt"
        :author="$author"
        :type="$type"
        :category="$category"
        :date="$date"
    />

    <x-seo.directive/>

    <!-- Fonts (self-hosted variable fonts) -->
    <link rel="stylesheet" href="{{ route('assets.fonts.css') }}"/>

    <title>{{ $siteName }}</title>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @cookieconsentscripts

    <!-- Styles -->
    @livewireStyles

    <!-- Conditional Styles -->
    @stack('styles')

    @php
        $style = app(LookFeelSettings::class);
        $display_mode = $style->mode;
    @endphp
    <style>
        :root {
            /* the chosen font slug */
            @if($style->font_family === 'system')
                  --font-primary: system-ui, sans-serif;
            @else
                  --font-primary: "{{ $style->font_family }}", system-ui, sans-serif;
        @endif
            @if($style->font_family_alt === 'system')
                   --font-secondary: system-ui, sans-serif;
            @else
                   --font-secondary: "{{ $style->font_family_alt }}", system-ui, sans-serif;
        @endif

            /* expose a CSS var for weight if you want dynamic control */
            --font-weight: {{ $settings->font_weight ?? 400 }};
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
            /* override Bootstrap vars */
            --bs-primary: var(--color-primary);
            --bs-secondary: var(--color-secondary);
            --bs-nav-link-color: var(--color-link);
            --bs-pagination-active-bg: var(--color-active);
            --bs-pagination-active-border-color: var(--color-active);
            /* add more as needed, e.g.: */
        }

        /* Overrides */
        body {
            font-family: var(--font-secondary);
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-primary);
        }
        a {
            color: var(--color-link);
        }

        .nav-link {
            --bs-nav-link-color: var(--color-link);
        }

        .nav {
            --bs-nav-link-hover-color: var(--color-hover);
        }

        .nav:hover {
            filter: brightness(0.9);
        }

        .text-primary {
            color: var(--color-font) !important;
        }

        .btn-primary {
            --bs-btn-bg: var(--color-accent);
            --bs-btn-border-color: var(--color-accent);
            --bs-btn-hover-color: var(--color-font-alt);
            --bs-btn-hover-bg: var(--color-hover);
            --bs-btn-hover-border-color: var(--color-hover);
            --bs-btn-focus-shadow-rgb: 49, 132, 253;
            --bs-btn-active-color: var(--color-font-alt);
            --bs-btn-active-bg: var(--color-active);
            --bs-btn-active-border-color: var(--color-active);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: var(--color-font-alt);
            --bs-btn-disabled-bg: var(--color-disabled);
            --bs-btn-disabled-border-color: var(--color-disabled);
            --bs-btn-color: var(--color-font-alt);
        }

        .btn-outline-primary {
            --bs-btn-color: var(--color-accent);
            --bs-btn-border-color: var(--color-accent);
            --bs-btn-hover-color: var(--color-font-alt);
            --bs-btn-hover-bg: var(--color-hover);
            --bs-btn-hover-border-color: var(--color-hover);
            --bs-btn-focus-shadow-rgb: 13, 110, 253;
            --bs-btn-active-color: var(--color-font-alt);
            --bs-btn-active-bg: var(--color-active);
            --bs-btn-active-border-color: var(--color-active);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: var(--color-disabled);
            --bs-btn-disabled-bg: transparent;
            --bs-btn-disabled-border-color: var(--color-disabled);
            --bs-gradient: none;
        }

        .btn-primary:hover,
        .btn-primary:focus {
            filter: brightness(0.9);
        }

        .btn-primary:disabled {
            filter: brightness(0.3);
        }

        .btn-secondary {
            --bs-btn-color: var(--color-font-alt);
            --bs-btn-bg: var(--color-secondary);
            --bs-btn-border-color: var(--color-secondary);
            --bs-btn-hover-color: var(--color-font-alt);
            --bs-btn-hover-bg: var(--color-hover);
            --bs-btn-hover-border-color: var(--color-hover);
            --bs-btn-focus-shadow-rgb: 130, 138, 145;
            --bs-btn-active-color: var(--color-font-alt);
            --bs-btn-active-bg: var(--color-active);
            --bs-btn-active-border-color: var(--color-active);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: var(--color-font-alt);
            --bs-btn-disabled-bg: var(--color-disabled);
            --bs-btn-disabled-border-color: var(--color-disabled);
        }

        .btn-secondary:disabled {
            filter: brightness(0.3);
        }

        .btn-link {
            --bs-btn-font-weight: 400;
            --bs-btn-color: var(--color-accent);
            --bs-btn-bg: transparent;
            --bs-btn-border-color: transparent;
            --bs-btn-hover-color: var(--color-hover);
            --bs-btn-hover-border-color: transparent;
            --bs-btn-active-color: var(--color-active);
            --bs-btn-active-border-color: transparent;
            --bs-btn-disabled-color: var(--color-disabled);
            --bs-btn-disabled-border-color: transparent;
            --bs-btn-box-shadow: 0 0 0 #000;
            --bs-btn-focus-shadow-rgb: 49, 132, 253;
            text-decoration: underline;
        }

        .btn-danger {
            --bs-btn-color: var(--color-font-alt);
            --bs-btn-bg: var(--color-error);
            --bs-btn-border-color: var(--color-error);
            --bs-btn-hover-color: var(--color-font-alt);
            --bs-btn-hover-bg: var(--color-hover);
            --bs-btn-hover-border-color: var(--color-hover);
            --bs-btn-focus-shadow-rgb: 225, 83, 97;
            --bs-btn-active-color: var(--color-font-alt);
            --bs-btn-active-bg: var(--color-active);
            --bs-btn-active-border-color: var(--color-active);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: var(--color-font-alt);
            --bs-btn-disabled-bg: var(--color-disabled);
            --bs-btn-disabled-border-color: var(--color-disabled);
        }

        .page-link {
            --bs-pagination-active-bg: var(--color-active);
            --bs-pagination-active-border-color: var(--color-active);
            --bs-pagination-color: var(--color-font);
        }

        .accordion {
            --bs-primary-bg-subtle: var(--color-active);
            --bs-primary-text-emphasis: var(--color-font-alt);
        }

        .bg-primary {
            --bs-bg-opacity: 1;
            background-color: var(--color-primary) !important;
        }

        .bg-warning {
            --bs-bg-opacity: 1;
            background-color: var(--color-warning) !important;
        }

        .bg-info {
            --bs-bg-opacity: 1;
            background-color: var(--color-info) !important;
        }

        .bg-secondary {
            --bs-bg-opacity: 1;
            background-color: var(--color-secondary) !important;
        }

        .bg-danger {
            --bs-bg-opacity: 1;
            background-color: var(--color-error) !important;
        }

        .alert-info {
            --bs-alert-color: var(--color-font-alt);
            --bs-alert-bg: var(--color-info);
            --bs-alert-border-color: var(--color-info);
            --bs-alert-link-color: var(--color-font-alt);
        }

        .alert-warning {
            --bs-alert-color: var(--color-font-alt);
            --bs-alert-bg: var(--color-warning);
            --bs-alert-border-color: var(--color-warning);
            --bs-alert-link-color: var(--color-font-alt);
        }

        .alert-success {
            --bs-alert-color: var(--color-font-alt);
            --bs-alert-bg: var(--color-success);
            --bs-alert-border-color: var(--color-success);
            --bs-alert-link-color: var(--color-font-alt);
        }

        .alert-danger {
            --bs-alert-color: var(--color-font-alt);
            --bs-alert-bg: var(--color-error);
            --bs-alert-border-color: var(--color-error);
            --bs-alert-link-color: var(--color-font-alt);
        }

        /* Twitch purple background + white text */
        .bg-twitch {
            background-color: #6441A4 !important;
            color: #ffffff !important;
            --bs-alert-border-color: #6441A4;
        }

        .badge {
            width: 100%;
            height: auto;
            display: block;
            text-wrap: auto;
        }

        /* badge variant */
        .badge-twitch {
            background-color: #6441A4;
            color: #ffffff;
        }
    </style>

    <!-- Conditional Scripts -->
    @stack('head-scripts')

</head>
<body class="{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }}">
<x-banner/>
<div class="min-vh-100 d-flex flex-column">
    <x-filament-menu menu="header-nav-main"/>
    <!-- Page Heading -->
    <header class="py-3 mb-4 border-bottom">
        <div class="container d-flex flex-wrap justify-content-center">
            <a href="{{ route('fabricator.page.home') }}"
               class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                <span class="fs-4" style="margin-right: 10%;">
                    <x-application-mark
                        :height="$logoHeight"
                        :width="$logoWidth"
                        class="me-2"
                    />
                </span>
                @if ($showName)
                    <span class="fs-4">{{ $siteName }}</span>
                @endif
            </a>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search" method="GET" action="{{ route('search') }}">
                <input type="search" name="query" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
        </div>
    </header>
    <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::header() -->
