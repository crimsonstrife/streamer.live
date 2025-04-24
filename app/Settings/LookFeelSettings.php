<?php

namespace App\Settings;

use App\Models\Settings;

class LookFeelSettings extends Settings
{
    public ?string $primary_color;

    public ?string $secondary_color;

    public ?string $accent_color;

    public ?string $font_family;

    public ?string $button_style; // e.g., rounded, outline, pill

    public ?string $mode; // e.g., light, dark, auto

    public static function group(): string
    {
        return 'theme';
    }
}
