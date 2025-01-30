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

    'patreon' => [
        'client_id' => env('PATREON_CLIENT_ID'),
        'client_secret' => env('PATREON_CLIENT_SECRET'),
        'redirect' => env('PATREON_REDIRECT_URI'),
    ],

    'ko_fi' => [
        'api_key' => env('KO_FI_API_KEY'),
        'enabled' => !empty(env('KO_FI_API_KEY')),
    ],
    'fourthwall' => [
        'api_key' => env('FOURTHWALL_API_KEY'),
        'enabled' => !empty(env('FOURTHWALL_API_KEY')),
    ],
];
