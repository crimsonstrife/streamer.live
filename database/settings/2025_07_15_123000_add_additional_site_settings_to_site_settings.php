<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        if (!$this->migrator->exists('site.site_timezone')) {
            $this->migrator->add('site.site_timezone', 'UTC');
        }
        if (!$this->migrator->exists('site.site_date_format')) {
            $this->migrator->add('site.site_date_format', 'MM-DD-YYYY');
        }
    }

    public function down(): void
    {
        if ($this->migrator->exists('site.site_timezone')) {
            $this->migrator->delete('site.site_timezone');
        }
        if ($this->migrator->exists('site.site_date_format')) {
            $this->migrator->delete('site.site_date_format');
        }
    }
};
