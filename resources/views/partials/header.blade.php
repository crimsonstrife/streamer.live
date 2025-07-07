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
    $settings    = app(\App\Settings\SiteSettings::class);
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

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>
    <title>{{ $siteName }}</title>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Styles -->
    @livewireStyles

    <!-- Conditional Styles -->
    @stack('styles')

    @php
        $style = app(\App\Settings\LookFeelSettings::class);
        $display_mode = $style->mode;
    @endphp

    <style>
        :root {
            --color-primary:   {{ $style->primary_color }};
            --color-secondary: {{ $style->secondary_color }};
            --color-accent: {{ $style->accent_color }};
            /* override Bootstrap vars */
            --bs-primary:   {{ $style->primary_color }};
            --bs-secondary: {{ $style->secondary_color }};
            --bs-nav-link-color: {{ $style->accent_color }};
            --bs-pagination-active-bg: {{ $style->accent_color }};
            --bs-pagination-active-border-color: {{ $style->accent_color }};
            /* add more as needed, e.g.: */
        }

        /* Overrides */
        a {
            color: {{ $style->accent_color }};
        }

        .nav-link {
            --bs-nav-link-color: {{ $style->accent_color }};
        }

        .nav {
            --bs-nav-link-hover-color: {{ $style->accent_color }};
        }

        .nav:hover {
            filter: brightness(0.9);
        }

        .text-primary{
            color: {{ $style->accent_color }} !important;
        }

        .btn-primary {
            --bs-btn-bg:             var(--color-accent);
            --bs-btn-border-color:   var(--color-accent);
            --bs-btn-hover-color: #fff;
            --bs-btn-hover-bg: var(--color-accent);
            --bs-btn-hover-border-color: var(--color-accent);
            --bs-btn-focus-shadow-rgb: 49, 132, 253;
            --bs-btn-active-color: #fff;
            --bs-btn-active-bg: var(--color-accent);
            --bs-btn-active-border-color: var(--color-accent);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: #fff;
            --bs-btn-disabled-bg: var(--color-accent);
            --bs-btn-disabled-border-color: var(--color-accent);
            /* if you want the text always white you can leave this: */
            --bs-btn-color:          #fff;
        }

        .btn-outline-primary {
            --bs-btn-color: var(--color-accent);
            --bs-btn-border-color: var(--color-accent);
            --bs-btn-hover-color: #fff;
            --bs-btn-hover-bg: var(--color-accent);
            --bs-btn-hover-border-color: var(--color-accent);
            --bs-btn-focus-shadow-rgb: 13, 110, 253;
            --bs-btn-active-color: #fff;
            --bs-btn-active-bg: var(--color-accent);
            --bs-btn-active-border-color: var(--color-accent);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            --bs-btn-disabled-color: var(--color-accent);
            --bs-btn-disabled-bg: transparent;
            --bs-btn-disabled-border-color: var(--color-accent);
            --bs-gradient: none;
        }

        .btn-primary:hover,
        .btn-primary:focus {
            filter: brightness(0.9);
        }

        .btn-primary:disabled {
            filter: brightness(0.3);
        }

        .btn-secondary:disabled {
            filter: brightness(0.3);
        }

        .btn-link {
            --bs-btn-font-weight: 400;
            --bs-btn-color: var(--color-accent);
            --bs-btn-bg: transparent;
            --bs-btn-border-color: transparent;
            --bs-btn-hover-color: var(--color-accent);
            --bs-btn-hover-border-color: transparent;
            --bs-btn-active-color: var(--color-accent);
            --bs-btn-active-border-color: transparent;
            --bs-btn-disabled-color: #6c757d;
            --bs-btn-disabled-border-color: transparent;
            --bs-btn-box-shadow: 0 0 0 #000;
            --bs-btn-focus-shadow-rgb: 49, 132, 253;
            text-decoration: underline;
        }

        .page-link {
            --bs-pagination-active-bg: {{ $style->accent_color }};
            --bs-pagination-active-border-color: {{ $style->accent_color }};
            --bs-pagination-color: {{ $style->accent_color }};
        }

        .accordion {
            --bs-primary-bg-subtle: {{ $style->accent_color }};
            --bs-primary-text-emphasis: {{ $style->secondary_color }};
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
