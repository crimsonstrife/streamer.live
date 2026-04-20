<?php

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;

$appUrl = rtrim((string) config('app.url'), '/');
$appHost = parse_url($appUrl, PHP_URL_HOST);
$appScheme = parse_url($appUrl, PHP_URL_SCHEME) ?: 'https';

$appUrlVariant = null;
if ($appHost) {
    $appUrlVariant = str_starts_with($appHost, 'www.')
        ? $appScheme.'://'.substr($appHost, 4)
        : $appScheme.'://www.'.$appHost;
}

$assetUrl = config('app.asset_url') ?: null;

$selfOrigins = array_values(array_unique(array_filter([
    $appUrl ?: null,
    $appUrlVariant,
    $assetUrl,
])));

return [

    /*
     * Presets will determine which CSP headers will be set. A valid CSP preset is
     * any class that implements `Spatie\Csp\Preset`
     */
    'presets' => [
        Spatie\Csp\Presets\Basic::class,
    ],

    /**
     * Register additional global CSP directives here.
     */
    'directives' => [
        [Directive::SCRIPT, [
            Keyword::SELF,
            Keyword::UNSAFE_INLINE,
            Keyword::UNSAFE_EVAL,
            ...$selfOrigins,
            'https://embed.twitch.tv',
            'https://player.twitch.tv',
            'https://cdn.discordapp.com',
            'https://cdn.jsdelivr.net',
            'https://static.cloudflareinsights.com',
        ]],
        [Directive::SCRIPT_ELEM, [
            Keyword::SELF,
            ...$selfOrigins,
            Keyword::UNSAFE_INLINE,
            'https://cdn.jsdelivr.net',
            'https://static.cloudflareinsights.com',
        ]],
        [Directive::SCRIPT_ATTR, [
            Keyword::SELF,
            ...$selfOrigins,
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::STYLE, [
            Keyword::SELF,
            ...$selfOrigins,
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::STYLE_ELEM, [
            Keyword::SELF,
            ...$selfOrigins,
            Keyword::UNSAFE_INLINE,
            'https://fonts.bunny.net',
            'https://cdn.jsdelivr.net',
        ]],
        [Directive::STYLE_ATTR, [
            Keyword::SELF,
            ...$selfOrigins,
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::CONNECT, [
            Keyword::SELF,
            ...$selfOrigins,
            'https://api.twitch.tv',
            'wss://eventsub-beta.twitch.tv',
            'https://discord.com',
            'https://discordapp.com',
            'https://cloudflareinsights.com',
        ]],
        [Directive::FRAME, [
            Keyword::SELF,
            ...$selfOrigins,
            'https://player.twitch.tv',
            'https://www.twitch.tv',
            'https://discord.com/widget',
        ]],
        [Directive::FRAME_ANCESTORS, [
            Keyword::SELF,
            ...$selfOrigins,
            'https://www.twitch.tv',
            'https://discord.com',
        ]],
        [Directive::IMG, array_values(array_filter([
            Keyword::SELF,
            ...$selfOrigins,
            'data:',
            'https://static-cdn.jtvnw.net',
            'https://cdn.discordapp.com',
            'https://ui-avatars.com',
            'https://gravatar.com',
            'https://www.gravatar.com',
            env('AWS_URL'),
        ]))],
        [Directive::MEDIA, array_values(array_filter([
            Keyword::SELF,
            ...$selfOrigins,
            env('AWS_URL'),
        ]))],
        [Directive::FONT, [
            Keyword::SELF,
            ...$selfOrigins,
            'data:',
            'https://fonts.bunny.net',
        ]],
    ],

    /*
     * These presets which will be put in a report-only policy. This is great for testing out
     * a new policy or changes to existing CSP policy without breaking anything.
     */
    'report_only_presets' => [
        //
    ],

    /**
     * Register additional global report-only CSP directives here.
     */
    'report_only_directives' => [
        // [Directive::SCRIPT, [Keyword::UNSAFE_EVAL, Keyword::UNSAFE_INLINE]],
    ],

    /*
     * All violations against a policy will be reported to this url.
     * A great service you could use for this is https://report-uri.com/
     */
    'report_uri' => env('CSP_REPORT_URI', ''),

    /*
     * Headers will only be added if this setting is set to true.
     */
    'enabled' => env('CSP_ENABLED', true),

    /**
     * Headers will be added when Vite is hot reloading.
     */
    'enabled_while_hot_reloading' => env('CSP_ENABLED_WHILE_HOT_RELOADING', false),

    /*
     * The class responsible for generating the nonces used in inline tags and headers.
     */
    'nonce_generator' => Spatie\Csp\Nonce\RandomString::class,

    /*
     * Set false to disable automatic nonce generation and handling.
     * This is useful when you want to use 'unsafe-inline' for scripts/styles
     * and cannot add inline nonces.
     * Note that this will make your CSP policy less secure.
     */
    'nonce_enabled' => env('CSP_NONCE_ENABLED', true),
];
