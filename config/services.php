<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'fourthwall' => [
        'enabled' => env('FOURTHWALL_ENABLE', false),
        'base_url' => env('FOURTHWALL_BASE_URL', 'https://storefront-api.fourthwall.com'),
        'storefront_token' => env('FOURTHWALL_STOREFRONT_TOKEN'),
        'storefront_url' => env('FOURTHWALL_STOREFRONT_URL', 'https://storefront.fourthwall.com'),
        'webhook_secret' => env('FOURTHWALL_WEBHOOK_SECRET'),
        'verify' => env('FOURTHWALL_VERIFY', true),
    ],

    'twitch' => [
        'enabled' => env('TWITCH_ENABLED', false),
        'channel_name' => env('TWITCH_CHANNEL'),
        'client_id' => env('TWITCH_CLIENT_ID'),
        'client_secret' => env('TWITCH_CLIENT_SECRET'),
        'redirect'      => env('TWITCH_OAUTH_REDIRECT'), // e.g. https://your.app/auth/twitch/callback
        'verify' => env('TWITCH_VERIFY', true),
    ],

    'discord' => [
        'client_id' => env('DISCORD_CLIENT_ID'),
        'client_secret' => env('DISCORD_CLIENT_SECRET'),
        'redirect' => env('DISCORD_REDIRECT_URI'),
        // optional
        'allow_gif_avatars' => (bool)env('DISCORD_AVATAR_GIF', true),
        'avatar_default_extension' => env('DISCORD_EXTENSION_DEFAULT', 'png'), // only pick from jpg, png, webp
    ],

    'tiktok' => [
        'client_id' => env('TIKTOK_CLIENT_ID'),
        'client_secret' => env('TIKTOK_CLIENT_SECRET'),
        'redirect' => env('TIKTOK_REDIRECT_URI')
    ],

    'youtube' => [
        'client_id' => env('YOUTUBE_CLIENT_ID'),
        'client_secret' => env('YOUTUBE_CLIENT_SECRET'),
        'redirect' => env('YOUTUBE_REDIRECT_URI')
    ],

    'twitter' => [
        'client_id' => env('TWITTER_CLIENT_ID'),
        'client_secret' => env('TWITTER_CLIENT_SECRET'),
        'redirect' => env('TWITTER_REDIRECT_URI')
    ],

    'maxmind' => [
        'license_key' => env('MAXMIND_KEY'),
        'account_id' => env('MAXMIND_ACCOUNT_ID'),
    ],

    'abuseipdb' => [
        'api_key' => env('ABUSEIP_DB_KEY'),
    ],
];
