<?php

namespace App\Settings;

use App\Models\Settings;

class FourthwallSettings extends Settings
{
    public bool $enable_integration;

    public ?string $base_url;

    public ?string $storefront_token;

    public ?string $storefront_url;

    public ?string $webhook_secret;

    public ?string $open_api_key;

    public ?string $open_api_secret;

    public bool $ssl_verify;

    public static function group(): string
    {
        return 'fourthwall';
    }

    public static function encrypted(): array
    {
        return [
            'storefront_token',
            'webhook_secret',
            'open_api_key',
            'open_api_secret',
        ];
    }
}
