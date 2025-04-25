<?php

namespace App\Settings;

use App\Models\Settings;

class DiscordSettings extends Settings
{
    public bool $enable_integration;

    public ?string $guild_id;

    public ?string $bot_token;

    public bool $ssl_verify;

    public static function group(): string
    {
        return 'discord';
    }

    public static function encrypted(): array
    {
        return [
            'guild_id',
            'bot_token',
        ];
    }
}
