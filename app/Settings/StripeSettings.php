<?php

namespace App\Settings;

use App\Models\Settings;

class StripeSettings extends Settings
{
    public bool $enable_integration;

    public ?string $publishable_key;

    public ?string $secret_key;

    public ?string $webhook_secret;

    public string $currency;

    public float $min_donation;

    public float $max_donation;

    public static function group(): string
    {
        return 'stripe';
    }

    public static function encrypted(): array
    {
        return [
            'publishable_key',
            'secret_key',
            'webhook_secret',
        ];
    }
}
