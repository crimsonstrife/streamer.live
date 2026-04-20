<?php

namespace App\Filament\Fabricator\Layouts;

use Z3d0X\FilamentFabricator\Layouts\Layout;

class VodArchiveLayout extends Layout
{
    protected static ?string $name = 'vod-archive';

    public static function getName(): string
    {
        return 'vod-archive';
    }

    public static function getRouteView(): string
    {
        return 'components.filament-fabricator.layouts.vod-archive';
    }
}
