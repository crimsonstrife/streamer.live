<?php

namespace App\Plugins;

use Filament\Contracts\Plugin;
use Filament\FilamentManager;
use Filament\Panel;

class BanPlugin implements Plugin
{
    public function getId(): string
    {
        return 'filament-banhammer';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): FilamentManager
    {
        return filament(app(static::class)->getId());
    }

    public function register(Panel $panel): void
    {
        $panel
            ->resources([
                config('filament-banhammer.resource'),
            ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
