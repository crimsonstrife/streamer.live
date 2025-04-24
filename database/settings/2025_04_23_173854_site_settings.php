<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('site.site_name', 'Streamer.live');
        $this->migrator->add('site.site_active', true);
        $this->migrator->add('site.can_register', true);
        $this->migrator->add('site.site_tagline', 'Host your own community!');
    }

    public function down(): void
    {
        $this->migrator->delete('site.site_name');
        $this->migrator->delete('site.site_active');
        $this->migrator->delete('site.can_register');
        $this->migrator->delete('site.site_tagline');
    }
};
