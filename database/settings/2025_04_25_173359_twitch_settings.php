<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('twitch.enable_integration', config('services.twitch.enabled', false));
        $this->migrator->add('twitch.channel_name', config('services.twitch.channel_name', null));
        $this->migrator->addEncrypted('twitch.client_id', config('services.twitch.client_id', null));
        $this->migrator->addEncrypted('twitch.client_secret', config('services.twitch.client_secret', null));
        $this->migrator->add('twitch.ssl_verify', config('services.twitch.verify', true));
    }

    public function down(): void
    {
        $this->migrator->delete('twitch.enable_integration');
        $this->migrator->delete('twitch.channel_name');
        $this->migrator->delete('twitch.client_id');
        $this->migrator->delete('twitch.client_secret');
        $this->migrator->delete('twitch.ssl_verify');
    }
};
