<?php

namespace App\Settings;

use App\Models\Settings;

class TwitchSettings extends Settings
{
    public bool $enable_integration;

    public ?string $channel_name;

    public ?string $client_id;

    public ?string $client_secret;

    public bool $ssl_verify;

    public static function group(): string
    {
        return 'twitch';
    }

    public static function encrypted(): array
    {
        return [
            'client_id',
            'client_secret',
        ];
    }
}
