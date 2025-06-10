<?php

namespace App\Plugins;

use App\Filament\Resources\MenuResource;
use Filament\Contracts\Plugin;
use Filament\Panel;

class MenusPlugin implements Plugin
{
    public function getId(): string
    {
        return 'filament-menus';
    }

    public static bool $allowRoute = true;

    public function allowRoute(bool $condition = true): self
    {
        self::$allowRoute = $condition;

        return $this;
    }

    public function register(Panel $panel): void
    {
        $panel->resources([
            MenuResource::class,
        ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public static function make(): self
    {
        return new self;
    }
}
