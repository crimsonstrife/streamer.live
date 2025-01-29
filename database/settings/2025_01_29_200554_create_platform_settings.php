<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('integrationSettings.twitch_enabled', false);
        $this->migrator->add('integrationSettings.youtube_enabled', false);
        $this->migrator->add('integrationSettings.patreon_enabled', false);
        $this->migrator->add('integrationSettings.ko_fi_enabled', false);
        $this->migrator->add('integrationSettings.fourthwall_enabled', false);
    }

    public function down(): void
    {
        $this->migrator->delete('integrationSettings.twitch_enabled');
        $this->migrator->delete('integrationSettings.youtube_enabled');
        $this->migrator->delete('integrationSettings.patreon_enabled');
        $this->migrator->delete('integrationSettings.ko_fi_enabled');
        $this->migrator->delete('integrationSettings.fourthwall_enabled');
    }
};
