<?php

namespace App\Filament\Fabricator\Layouts;

use Z3d0X\FilamentFabricator\Layouts\Layout;

class LiveStreamLayout extends Layout
{
    protected static ?string $name = 'live-stream';

    public static function getName(): string
    {
        return 'live-stream';
    }

    public static function getRouteView(): string
    {
        return 'components.filament-fabricator.layouts.live-stream';
    }
}
