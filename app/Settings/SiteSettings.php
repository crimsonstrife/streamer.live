<?php

namespace App\Settings;

use App\Models\Settings;

class SiteSettings extends Settings
{
    public string $site_name;

    public bool $site_active;

    public ?string $site_tagline;

    public ?string $site_logo; // Store path or media ID

    public bool $show_site_name = true; // Shows the name next to the logo in select places

    public ?string $site_favicon; // Store path or media ID

    public bool $can_register;

    public ?string $site_timezone;

    public ?string $site_date_format;

    public static function group(): string
    {
        return 'site';
    }
}
