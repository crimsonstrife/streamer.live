<?php

namespace App\View\Helpers;

class ViewHelpers
{
    public static function isFilament(): bool
    {
        return request()->is('admin/*') || str_starts_with(request()->route()?->getName(), 'filament.');
    }
}
