<?php

namespace App\Filament\Fabricator\Layouts;

use Z3d0X\FilamentFabricator\Layouts\Layout;

class CommunityHubLayout extends Layout
{
    protected static ?string $name = 'community-hub';

    public static function getName(): string
    {
        return 'community-hub';
    }

    public static function getRouteView(): string
    {
        return 'components.filament-fabricator.layouts.community-hub';
    }
}
