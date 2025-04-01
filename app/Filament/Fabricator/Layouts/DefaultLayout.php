<?php

namespace App\Filament\Fabricator\Layouts;

use Z3d0X\FilamentFabricator\Layouts\Layout;

class DefaultLayout extends Layout
{
    protected static ?string $name = 'default';

    public static function getName(): string
    {
        return 'default'; // Matches the layout name used in the CMS
    }

    public static function getRouteView(): string
    {
        return 'layouts.default'; // Reference to resources/views/layouts/default.blade.php
    }
}
