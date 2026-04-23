<?php

namespace App\Filament\Fabricator\Layouts;

use Z3d0X\FilamentFabricator\Layouts\Layout;

class CreatorProfileLayout extends Layout
{
    protected static ?string $name = 'creator-profile';

    public static function getName(): string
    {
        return 'creator-profile';
    }

    public static function getRouteView(): string
    {
        return 'components.filament-fabricator.layouts.creator-profile';
    }
}
