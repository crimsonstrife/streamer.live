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

    /**
     * Onboarding Completion Check
     */
    public static function isComplete(): bool
    {
        $site_name = app(__CLASS__)->site_name ?? null;
        $is_active = app(__CLASS__)->site_active ?? null;
        $site_tagline = app(__CLASS__)->site_tagline ?? null;
        $can_register = app(__CLASS__)->can_register ?? null;
        $timezone = app(__CLASS__)->site_timezone ?? null;
        $date_format = app(__CLASS__)->site_date_format ?? null;

        if ($site_name && $site_name !== 'Streamer.live') {
            if ($is_active & $is_active !== null) {
                if ($site_tagline && $site_tagline !== 'Host your own community!') {
                    if ($can_register !== null) {
                        return $timezone !== null && $date_format !== null;
                    }

                    return false;
                }

                return false;
            }

            return false;
        }

        return false;
    }
}
