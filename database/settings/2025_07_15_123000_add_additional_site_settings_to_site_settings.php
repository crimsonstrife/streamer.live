<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('site.site_timezone', 'UTC');
        $this->migrator->add('site.site_date_format', 'MM-DD-YYYY');
    }

    public function down(): void
    {
        $this->migrator->delete('site.site_timezone');
        $this->migrator->delete('site.site_date_format');
    }
};
