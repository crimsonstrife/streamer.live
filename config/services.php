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
        'base_url' => env('FOURTHWALL_BASE_URL', 'https://storefront-api.fourthwall.com'),
        'storefront_token' => env('FOURTHWALL_STOREFRONT_TOKEN'),
        'storefront_url' => env('FOURTHWALL_STOREFRONT_URL', 'https://storefront.fourthwall.com'),
        'verify' => env('FOURTHWALL_VERIFY', true),
    ],

    'twitch' => [
        'enabled' => env('TWITCH_ENABLED', false),
        'client_id' => env('TWITCH_CLIENT_ID'),
        'client_secret' => env('TWITCH_CLIENT_SECRET'),
    ],
];
