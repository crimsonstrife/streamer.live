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
            /* add more as needed, e.g.: */
        }

        /* Overrides */
        .nav-link {
            --bs-nav-link-color: {{ $style->accent_color }};
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
    </style>

    <!-- Conditional Scripts -->
    @stack('head-scripts')

</head>
<body class="bg-light">
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
