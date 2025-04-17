<?php

namespace App\Plugins;

use Filament\Contracts\Plugin;
use Filament\Panel;
use App\Filament\Resources\AuthorResource;
use App\Filament\Resources\CategoryResource;
use App\Filament\Resources\PostResource;

class BlogPlugin implements Plugin
{
    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }

    public function getId(): string
    {
        return 'filament-blog';
    }

    public function register(Panel $panel): void
    {
        $panel
            ->resources([
                AuthorResource::class,
                CategoryResource::class,
                PostResource::class,
            ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
