<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('stripe.enable_integration', config('services.stripe.enabled', false));
        $this->migrator->addEncrypted('stripe.publishable_key', config('services.stripe.key'));
        $this->migrator->addEncrypted('stripe.secret_key', config('services.stripe.secret'));
        $this->migrator->addEncrypted('stripe.webhook_secret', config('services.stripe.webhook_secret'));
        $this->migrator->add('stripe.currency', config('services.stripe.currency', 'USD'));
        $this->migrator->add('stripe.min_donation', (float) config('services.stripe.min_donation', 1));
        $this->migrator->add('stripe.max_donation', (float) config('services.stripe.max_donation', 10000));
    }

    public function down(): void
    {
        $this->migrator->delete('stripe.enable_integration');
        $this->migrator->delete('stripe.publishable_key');
        $this->migrator->delete('stripe.secret_key');
        $this->migrator->delete('stripe.webhook_secret');
        $this->migrator->delete('stripe.currency');
        $this->migrator->delete('stripe.min_donation');
        $this->migrator->delete('stripe.max_donation');
    }
};
