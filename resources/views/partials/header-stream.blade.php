@php use App\Settings\SiteSettings; @endphp
@php use App\Settings\LookFeelSettings; @endphp
@php use App\Settings\TwitchSettings; @endphp
{{-- header-stream.blade.php — creator-site "live stream" variant --}}
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
    'isLive'      => false,
    'channel'     => null,
])
@php
    $settings  = app(SiteSettings::class);
    $siteName  = $settings->site_name ?? config('app.name', 'Streamer.live');
    $showName  = $settings->show_site_name;
    $twitch    = app(TwitchSettings::class);
    $channel   = $channel ?? $twitch->channel_name;
    $style     = app(LookFeelSettings::class);
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

    <link rel="stylesheet" href="{{ route('assets.fonts.css') }}"/>
    <title>{{ $siteName }}</title>

    <x-layout.theme-vars />
    @livewireStyles
    <x-layout.theme-init :default="$style->mode ?? 'light'" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @cookieconsentscripts
    @stack('styles')

    <style>
        [data-bs-theme='light'], [data-bs-theme='dark'] {
            --stream-bg:         var(--bs-body-bg);
            --stream-surface:    var(--bs-tertiary-bg);
            --stream-surface-2:  var(--bs-secondary-bg);
            --stream-border:     var(--bs-border-color);
            --stream-text:       var(--bs-body-color);
            --stream-muted:      var(--bs-secondary-color);
            --stream-live:       var(--bs-danger);
            --stream-topbar-bg:  rgba(var(--bs-body-bg-rgb), 0.88);
        }
        :root {
            --stream-nav-h: 56px;
        }

        body.stream-body {
            background: var(--stream-bg);
            color: var(--stream-text);
            font-family: var(--font-secondary);
            margin: 0;
        }
        body.stream-body h1, body.stream-body h2, body.stream-body h3,
        body.stream-body h4, body.stream-body h5, body.stream-body h6 {
            font-family: var(--font-primary);
            color: var(--stream-text);
        }
        body.stream-body p { color: var(--stream-text); }
        body.stream-body a { color: var(--stream-text); text-decoration: none; }
        body.stream-body a:hover { color: var(--color-accent); }
        body.stream-body .text-muted-stream { color: var(--stream-muted) !important; }

        .stream-shell {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Top bar */
        .stream-topbar {
            position: sticky; top: 0; z-index: 1030;
            height: var(--stream-nav-h);
            display: flex; align-items: center; gap: 18px;
            padding: 0 20px;
            background: var(--stream-topbar-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--stream-border);
        }
        .stream-topbar-brand {
            display: inline-flex; align-items: center; gap: 10px;
            color: var(--stream-text); font-weight: 700;
            letter-spacing: 0.02em; white-space: nowrap;
        }
        .stream-topbar-brand:hover { color: var(--stream-text); opacity: 0.9; }
        .stream-topbar-nav { flex: 1 1 auto; min-width: 0; display: flex; }
        .stream-nav-list {
            display: flex; align-items: center; gap: 2px;
            margin: 0; padding: 0; list-style: none;
            overflow-x: auto; white-space: nowrap;
            scrollbar-width: none;
        }
        .stream-nav-list::-webkit-scrollbar { display: none; }
        .stream-nav-link {
            display: inline-flex; align-items: center;
            padding: 6px 12px; border-radius: 6px;
            color: var(--stream-muted); font-size: 14px; font-weight: 500;
            transition: background .15s ease, color .15s ease;
        }
        .stream-nav-link:hover { background: var(--stream-surface); color: var(--stream-text); }
        .stream-nav-link.is-active { color: var(--stream-text); background: var(--stream-surface-2); }

        .stream-live-chip {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 4px 10px; border-radius: 999px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
            text-transform: uppercase;
            background: var(--stream-surface); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
            white-space: nowrap;
        }
        .stream-live-chip.is-live {
            color: #fff; background: var(--stream-live); border-color: var(--stream-live);
        }
        .stream-live-chip .dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; display: inline-block;
        }
        .stream-live-chip.is-live .dot {
            background: #fff; animation: streamPulse 1.6s ease-in-out infinite;
        }
        @keyframes streamPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%      { opacity: 0.5; transform: scale(1.35); }
        }

        /* Hero */
        .stream-hero {
            display: flex; background: #000;
            height: 75vh; min-height: 480px; max-height: 900px;
            border-bottom: 1px solid var(--stream-border);
        }
        .stream-hero .stream-player { flex: 1 1 auto; min-width: 0; }
        .stream-hero .stream-player iframe { width: 100%; height: 100%; border: 0; display: block; }
        .stream-hero .stream-chat { flex: 0 0 340px; border-left: 1px solid var(--stream-border); }
        .stream-hero .stream-chat iframe { width: 100%; height: 100%; border: 0; display: block; }
        .stream-placeholder {
            flex: 1 1 auto; display: flex; align-items: center; justify-content: center;
            padding: 48px 16px; text-align: center;
        }
        @media (max-width: 991.98px) {
            .stream-hero { flex-direction: column; height: auto; max-height: none; }
            .stream-hero .stream-player { aspect-ratio: 16 / 9; }
            .stream-hero .stream-chat {
                flex: 0 0 auto; height: 520px; width: 100%;
                border-left: 0; border-top: 1px solid var(--stream-border);
            }
        }

        /* Info strip */
        .stream-info-strip {
            background: var(--stream-surface);
            border-bottom: 1px solid var(--stream-border);
        }
        .stream-info-container {
            max-width: 1400px; margin: 0 auto; padding: 12px 20px;
            display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .stream-status-chip {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 4px 10px; border-radius: 4px;
            font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
            text-transform: uppercase;
            background: var(--stream-surface-2); color: var(--stream-muted);
            border: 1px solid var(--stream-border);
        }
        .stream-status-chip.is-live {
            color: #fff; background: var(--stream-live); border-color: var(--stream-live);
        }
        .stream-status-chip .dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; display: inline-block;
        }
        .stream-status-chip.is-live .dot {
            background: #fff; animation: streamPulse 1.6s ease-in-out infinite;
        }
        .stream-meta { flex: 1 1 300px; min-width: 0; }
        .stream-meta .stream-title-line {
            font-size: 14px; font-weight: 600; line-height: 1.35;
            color: var(--stream-text);
            overflow: hidden; text-overflow: ellipsis;
        }
        .stream-meta .stream-sub-line {
            font-size: 12px; color: var(--stream-muted);
            display: flex; gap: 14px; flex-wrap: wrap; margin-top: 2px;
        }
        .stream-meta .stream-game { color: var(--stream-text); font-weight: 500; }
        .stream-cta {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 14px; border-radius: 6px;
            background: var(--color-accent); color: #fff !important;
            font-weight: 600; font-size: 13px;
            border: 1px solid transparent;
            transition: filter .15s ease;
            margin-left: auto;
        }
        .stream-cta:hover { filter: brightness(1.1); color: #fff; }

        /* Page blocks below */
        .stream-blocks { background: var(--stream-bg); padding: 32px 0; }
        .stream-blocks-container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
    </style>

    @stack('head-scripts')
</head>
<body class="stream-body">
<x-banner/>
<div class="stream-shell">
    <nav class="stream-topbar" aria-label="Primary">
        <a href="{{ route('fabricator.page.home') }}" class="stream-topbar-brand">
            <x-application-mark height="28"/>
            @if ($showName)
                <span>{{ $siteName }}</span>
            @endif
        </a>
        <div class="stream-topbar-nav">
            <x-filament-menu menu="header-nav-main" view="filament-menus::menu-stream"/>
        </div>
        @if ($channel)
            <a href="https://twitch.tv/{{ $channel }}" target="_blank" rel="noopener"
               class="stream-live-chip {{ $isLive ? 'is-live' : '' }}">
                <span class="dot"></span>{{ $isLive ? 'Live' : 'Offline' }}
            </a>
        @endif
        <x-layout.theme-toggle />
    </nav>

    @if ($page?->custom_css)
        <style>{!! app(\App\Services\CssSanitizerService::class)->sanitize($page->custom_css) !!}</style>
    @endif
    @if ($page?->custom_head_html)
        {!! \Mews\Purifier\Facades\Purifier::clean($page->custom_head_html, 'head_html') !!}
    @endif
