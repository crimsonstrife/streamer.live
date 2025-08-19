<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->addEncrypted('fourthwall.open_api_key', null);
        $this->migrator->addEncrypted('fourthwall.open_api_secret', null);
    }

    public function down(): void
    {
        $this->migrator->delete('fourthwall.open_api_key');
        $this->migrator->delete('fourthwall.open_api_secret');
    }
};
