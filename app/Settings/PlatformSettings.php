<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class PlatformSettings extends Settings
{
    public bool $twitch_enabled;
    public bool $youtube_enabled;
    public bool $patreon_enabled;
    public bool $ko_fi_enabled;
    public bool $fourthwall_enabled;

    public static function group(): string
    {
        return 'integrationSettings';
    }
}
