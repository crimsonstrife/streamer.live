<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class () extends SettingsMigration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->migrator->add('theme.font_color');
        $this->migrator->add('theme.font_alt_color');
        $this->migrator->add('theme.disabled_color');
        $this->migrator->add('theme.link_color');
        $this->migrator->add('theme.hover_color');
        $this->migrator->add('theme.active_color');
        $this->migrator->add('theme.success_color');
        $this->migrator->add('theme.warning_color');
        $this->migrator->add('theme.info_color');
        $this->migrator->add('theme.error_color');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if ($this->migrator->exists('theme.font_color')) {
            $this->migrator->delete('theme.font_color');
        }
        if ($this->migrator->exists('theme.font_alt_color')) {
            $this->migrator->delete('theme.font_alt_color');
        }
        if ($this->migrator->exists('theme.disabled_color')) {
            $this->migrator->delete('theme.disabled_color');
        }
        if ($this->migrator->exists('theme.link_color')) {
            $this->migrator->delete('theme.link_color');
        }
        if ($this->migrator->exists('theme.hover_color')) {
            $this->migrator->delete('theme.hover_color');
        }
        if ($this->migrator->exists('theme.active_color')) {
            $this->migrator->delete('theme.active_color');
        }
        if ($this->migrator->exists('theme.success_color')) {
            $this->migrator->delete('theme.success_color');
        }
        if ($this->migrator->exists('theme.warning_color')) {
            $this->migrator->delete('theme.warning_color');
        }
        if ($this->migrator->exists('theme.info_color')) {
            $this->migrator->delete('theme.info_color');
        }
        if ($this->migrator->exists('theme.error_color')) {
            $this->migrator->delete('theme.error_color');
        }
    }
};
