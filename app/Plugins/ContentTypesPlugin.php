<?php

namespace App\Plugins;

use App\Filament\Resources\ContentTypeResource;
use App\Services\ContentEntryResourceRegistrar;
use Filament\Contracts\Plugin;
use Filament\Panel;

class ContentTypesPlugin implements Plugin
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
        return 'content-types';
    }

    public function register(Panel $panel): void
    {
        $panel->resources([
            ContentTypeResource::class,
        ]);

        // Dynamically register a resource for each active content type
        $dynamicResources = ContentEntryResourceRegistrar::getResources();
        if (! empty($dynamicResources)) {
            $panel->resources($dynamicResources);
        }
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
