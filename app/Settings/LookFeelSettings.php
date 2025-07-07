<?php

namespace App\Settings;

use App\Models\Settings;

class LookFeelSettings extends Settings
{
    public ?string $primary_color;

    public ?string $secondary_color;

    public ?string $accent_color;

    public ?string $font_color;

    public ?string $font_alt_color;

    public ?string $font_family;

    public ?int    $base_font_size;

    public ?string $disabled_color;

    public ?string $link_color;

    public ?string $hover_color;

    public ?string $active_color;

    public ?string $success_color;

    public ?string $warning_color;

    public ?string $error_color;

    public ?string $button_style; // e.g., rounded, outline, pill

    public ?string $mode; // e.g., light, dark, auto

    public static function group(): string
    {
        return 'theme';
    }
}
