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
