<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('community.enable_community', false);
        $this->migrator->add('community.require_thread_approval', true);
        $this->migrator->add('community.require_reply_approval', false);
        $this->migrator->add('community.rate_limit_threads_per_hour', 5);
        $this->migrator->add('community.rate_limit_replies_per_hour', 30);
        $this->migrator->add('community.min_account_age_days', 0);
        $this->migrator->add('community.default_community_category_id', null);
    }

    public function down(): void
    {
        $this->migrator->delete('community.enable_community');
        $this->migrator->delete('community.require_thread_approval');
        $this->migrator->delete('community.require_reply_approval');
        $this->migrator->delete('community.rate_limit_threads_per_hour');
        $this->migrator->delete('community.rate_limit_replies_per_hour');
        $this->migrator->delete('community.min_account_age_days');
        $this->migrator->delete('community.default_community_category_id');
    }
};
