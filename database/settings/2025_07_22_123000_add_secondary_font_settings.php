<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->migrator->add('theme.font_family_alt');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if ($this->migrator->exists('theme.font_family_alt')) {
            $this->migrator->delete('theme.font_family_alt');
        }
    }
};
