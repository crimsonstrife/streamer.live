<?php

namespace App\Settings;

use App\Models\Settings;

class SEOSettings extends Settings
{
    public ?string $meta_title;

    public ?string $meta_description;

    public ?string $meta_keywords;

    public ?string $meta_image; // Can double as OG/Twitter image

    public ?string $og_type; // default to "website"

    public ?string $twitter_card; // default to "summary_large_image"

    public bool $seo_use_google_analytics;

    public ?string $seo_google_analytics;

    public bool $seo_use_google_tags_manager;

    public ?string $seo_google_tags_manager;

    public bool $seo_use_axeptio;

    public ?string $seo_axeptio_client_id;

    public ?string $seo_axeptio_cookies_version;

    public bool $seo_use_google_search_console;

    public ?string $seo_google_search_console_verification;

    public static function group(): string
    {
        return 'seo';
    }
}
