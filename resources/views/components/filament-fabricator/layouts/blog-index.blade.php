@props(['page'])
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>

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
    @livewire('navigation-menu')

    <!-- Page Heading -->
    @if (isset($header))
        <header class="bg-white shadow-sm">
            <div class="container py-3">
                <h1 class="mb-0 h5">{{ $header }}</h1>
            </div>
        </header>
    @endif

    <!-- Page Content -->
    <main class="flex-grow-1">
        <div class="container py-4">
            <x-filament-fabricator::page-blocks :blocks="$page->blocks"/>
        </div>
    </main>
</div>

@stack('modals')

@livewireScripts

<!-- Page Specific Scripts -->
@stack('scripts')

</body>
</html>

