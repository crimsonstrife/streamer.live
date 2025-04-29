<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('fourthwall.enable_integration', config('services.fourthwall.enabled', false));
        $this->migrator->add('fourthwall.base_url', config('services.fourthwall.base_url', 'https://storefront-api.fourthwall.com'));
        $this->migrator->addEncrypted('fourthwall.storefront_token', config('services.fourthwall.storefront_token', null));
        $this->migrator->add('fourthwall.storefront_url', config('services.fourthwall.storefront_url', 'https://storefront.fourthwall.com'));
        $this->migrator->addEncrypted('fourthwall.webhook_secret', config('services.fourthwall.webhook_secret', null));
        $this->migrator->add('fourthwall.ssl_verify', config('services.fourthwall.verify', true));
    }

    public function down(): void
    {
        $this->migrator->delete('fourthwall.enable_integration');
        $this->migrator->delete('fourthwall.base_url');
        $this->migrator->delete('fourthwall.storefront_token');
        $this->migrator->delete('fourthwall.storefront_url');
        $this->migrator->delete('fourthwall.webhook_secret');
        $this->migrator->delete('fourthwall.ssl_verify');
    }
};
