<?php

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;

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
            config('app.url'),
            'https://embed.twitch.tv',
            'https://player.twitch.tv',
            'https://cdn.discordapp.com',
        ]],
        [Directive::SCRIPT_ELEM, [
            Keyword::SELF,
            config('app.url'),
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::SCRIPT_ATTR, [
            Keyword::SELF,
            config('app.url'),
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::STYLE, [
            Keyword::SELF,
            config('app.url'),
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::STYLE_ELEM, [
            Keyword::SELF,
            config('app.url'),
            Keyword::UNSAFE_INLINE,
            'https://fonts.bunny.net',
        ]],
        [Directive::STYLE_ATTR, [
            Keyword::SELF,
            config('app.url'),
            Keyword::UNSAFE_INLINE,
        ]],
        [Directive::CONNECT, [
            Keyword::SELF,
            config('app.url'),
            'https://api.twitch.tv',
            'wss://eventsub-beta.twitch.tv',
            'https://discord.com',
            'https://discordapp.com',
        ]],
        [Directive::FRAME, [
            Keyword::SELF,
            config('app.url'),
            'https://player.twitch.tv',
            'https://www.twitch.tv',
            'https://discord.com/widget',
        ]],
        [Directive::FRAME_ANCESTORS, [
            Keyword::SELF,
            config('app.url'),
            'https://www.twitch.tv',
            'https://discord.com',
        ]],
        [Directive::IMG, [
            Keyword::SELF,
            config('app.url'),
            'data:',
            'https://static-cdn.jtvnw.net',
            'https://cdn.discordapp.com',
            'https://ui-avatars.com',
        ]],
        [Directive::FONT, [
            Keyword::SELF,
            config('app.url'),
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
