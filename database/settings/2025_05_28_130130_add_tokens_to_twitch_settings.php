<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->addEncrypted('twitch.user_access_token', null);
        $this->migrator->addEncrypted('twitch.user_refresh_token', null);
        $this->migrator->add('twitch.user_token_expires', null);
    }

    public function down(): void
    {
        $this->migrator->delete('twitch.user_access_token');
        $this->migrator->delete('twitch.user_refresh_token');
        $this->migrator->delete('twitch.user_token_expires');
    }
};
