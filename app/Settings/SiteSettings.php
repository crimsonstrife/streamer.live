<?php

namespace App\Settings;

use App\Models\Settings;

/**
 * Class SiteSettings
 *
 * Represents the settings for the site, including general configuration options
 * such as site name, logo, registration settings, and timezone preferences.
 */
class SiteSettings extends Settings
{
    /**
     * @var string The name of the site.
     */
    public string $site_name;

    /**
     * @var bool Indicates whether the site is active.
     */
    public bool $site_active;

    /**
     * @var string|null The tagline of the site.
     */
    public ?string $site_tagline;

    /**
     * @var string|null The path or media ID for the site logo.
     */
    public ?string $site_logo;

    /**
     * @var bool Indicates whether the site name should be displayed next to the logo.
     */
    public bool $show_site_name = true;

    /**
     * @var string|null The path or media ID for the site favicon.
     */
    public ?string $site_favicon;

    /**
     * @var bool Indicates whether user registration is allowed.
     */
    public bool $can_register;

    /**
     * @var string|null The timezone of the site.
     */
    public ?string $site_timezone;

    /**
     * @var string|null The date format used by the site.
     */
    public ?string $site_date_format;

    /**
     * Returns the group name for the settings.
     *
     * @return string The group name.
     */
    public static function group(): string
    {
        return 'site';
    }

    /**
     * Checks if the onboarding process is complete based on the site settings.
     *
     * @return bool True if onboarding is complete, false otherwise.
     */
    public static function isComplete(): bool
    {
        $settings = self::_getSettings();

        // Check if all required conditions are met
        return isset($settings['site_name'], $settings['site_active'], $settings['site_tagline']) &&
            $settings['site_name'] !== 'Streamer.live' &&
            $settings['site_tagline'] !== 'Host your own community!' &&
            $settings['can_register'] !== null &&
            $settings['site_timezone'] !== null &&
            $settings['site_date_format'] !== null;
    }

    /**
     * Retrieves the settings properties in a reusable way.
     *
     * @return array An associative array of settings properties.
     */
    private static function _getSettings(): array
    {
        $instance = app(__CLASS__);

        return [
            'site_name' => $instance->site_name ?? null,
            'site_active' => $instance->site_active ?? null,
            'site_tagline' => $instance->site_tagline ?? null,
            'can_register' => $instance->can_register ?? null,
            'site_timezone' => $instance->site_timezone ?? null,
            'site_date_format' => $instance->site_date_format ?? null,
        ];
    }
}
