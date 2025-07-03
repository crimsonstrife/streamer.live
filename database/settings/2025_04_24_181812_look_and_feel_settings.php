<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void {
        $this->migrator->add('theme.primary_color');
        $this->migrator->add('theme.secondary_color');
        $this->migrator->add('theme.accent_color');
        $this->migrator->add('theme.font_family');
        $this->migrator->add('theme.base_font_size');
        $this->migrator->add('theme.button_style');
        $this->migrator->add('theme.mode');
    }

    public function down(): void {
        if ($this->migrator->exists('theme.primary_color')) {
            $this->migrator->delete('theme.primary_color');
        }
        if ($this->migrator->exists('theme.secondary_color')) {
            $this->migrator->delete('theme.secondary_color');
        }
        if ($this->migrator->exists('theme.accent_color')) {
            $this->migrator->delete('theme.accent_color');
        }
        if ($this->migrator->exists('theme.font_family')) {
            $this->migrator->delete('theme.font_family');
        }
        if ($this->migrator->exists('theme.base_font_size')) {
            $this->migrator->delete('theme.base_font_size');
        }
        if ($this->migrator->exists('theme.button_style')) {
            $this->migrator->delete('theme.button_style');
        }
        if ($this->migrator->exists('theme.mode')) {
            $this->migrator->delete('theme.mode');
        }
    }
};
