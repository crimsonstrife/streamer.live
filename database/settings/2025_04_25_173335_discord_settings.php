<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('discord.enable_integration', config('discord.enabled', false));
        $this->migrator->add('discord.bot_token', config('discord.token', null));
        $this->migrator->add('discord.guild_id', config('discord.guild_id', null));
        $this->migrator->add('discord.ssl_verify', config('discord.verify', true));
    }

    public function down(): void
    {
        $this->migrator->delete('discord.enable_integration');
        $this->migrator->delete('discord.bot_token');
        $this->migrator->delete('discord.guild_id');
        $this->migrator->delete('discord.ssl_verify');
    }
};
