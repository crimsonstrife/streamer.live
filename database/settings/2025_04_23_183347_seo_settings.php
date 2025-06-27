<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        // Check if the value exists before adding it
        if (! $this->migrator->exists('seo.seo_use_google_analytics')) {
            $this->migrator->add('seo.seo_use_google_analytics', false);
        }
        if (! $this->migrator->exists('seo.seo_google_analytics')) {
            $this->migrator->add('seo.seo_google_analytics');
        }
        if (! $this->migrator->exists('seo.seo_use_google_tags_manager')) {
            $this->migrator->add('seo.seo_use_google_tags_manager', false);
        }
        if (! $this->migrator->exists('seo.seo_google_tags_manager')) {
            $this->migrator->add('seo.seo_google_tags_manager');
        }
        if (! $this->migrator->exists('seo.seo_use_axeptio')) {
            $this->migrator->add('seo.seo_use_axeptio', false);
        }
        if (! $this->migrator->exists('seo.seo_axeptio_client_id')) {
            $this->migrator->add('seo.seo_axeptio_client_id');
        }
        if (! $this->migrator->exists('seo.seo_axeptio_cookies_version')) {
            $this->migrator->add('seo.seo_axeptio_cookies_version');
        }
        if (! $this->migrator->exists('seo.seo_use_google_search_console')) {
            $this->migrator->add('seo.seo_use_google_search_console', false);
        }
        if (! $this->migrator->exists('seo.seo_google_search_console_verification')) {
            $this->migrator->add('seo.seo_google_search_console_verification');
        }
    }

    public function down(): void
    {
        if ($this->migrator->exists('seo.seo_use_google_analytics')) {
            $this->migrator->delete('seo.seo_use_google_analytics');
        }
        if ($this->migrator->exists('seo.seo_google_analytics')) {
            $this->migrator->delete('seo.seo_google_analytics');
        }
        if ($this->migrator->exists('seo.seo_use_google_tags_manager')) {
            $this->migrator->delete('seo.seo_use_google_tags_manager');
        }
        if ($this->migrator->exists('seo.seo_google_tags_manager')) {
            $this->migrator->delete('seo.seo_google_tags_manager');
        }
        if ($this->migrator->exists('seo.seo_use_axeptio')) {
            $this->migrator->delete('seo.seo_use_axeptio');
        }
        if ($this->migrator->exists('seo.seo_axeptio_client_id')) {
            $this->migrator->delete('seo.seo_axeptio_client_id');
        }
        if ($this->migrator->exists('seo.seo_axeptio_cookies_version')) {
            $this->migrator->delete('seo.seo_axeptio_cookies_version');
        }
        if ($this->migrator->exists('seo.seo_use_google_search_console')) {
            $this->migrator->delete('seo.seo_use_google_search_console');
        }
        if ($this->migrator->exists('seo.seo_google_search_console_verification')) {
            $this->migrator->delete('seo.seo_google_search_console_verification');
        }
    }
};
