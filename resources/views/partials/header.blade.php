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
    $style       = app(LookFeelSettings::class);
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

    <x-layout.theme-init :default="$style->mode ?? 'light'" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @cookieconsentscripts

    <!-- Styles -->
    <x-layout.theme-vars />
    @livewireStyles

    <!-- Conditional Styles -->
    @stack('styles')

    <!-- Conditional Scripts -->
    @stack('head-scripts')

</head>
<body>
<x-banner/>
<div class="min-vh-100 d-flex flex-column">
    <div id="header" class="container-fluid sticky-top">
        <x-filament-menu menu="header-nav-main"/>
        <!-- Page Heading -->
        <header class="py-3 border-bottom">
            <div class="container d-flex flex-wrap justify-content-center align-items-center">
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
                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" method="GET" action="{{ route('search') }}">
                    <input type="search" name="query" class="form-control" placeholder="Search..." aria-label="Search">
                </form>
                <x-layout.theme-toggle/>
            </div>
        </header>
    </div>
    <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::header() -->
    {{-- Per-page custom CSS --}}
    @if($page?->custom_css)
        <style>{!! app(\App\Services\CssSanitizerService::class)->sanitize($page->custom_css) !!}</style>
@endif

{{-- Per-page custom head HTML --}}
@if($page?->custom_head_html)
    {!! \Mews\Purifier\Facades\Purifier::clean($page->custom_head_html, 'head_html') !!}
@endif
