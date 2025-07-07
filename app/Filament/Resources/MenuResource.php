<?php

namespace App\Filament\Resources;

use TomatoPHP\FilamentMenus\Resources\MenuResource as BaseMenuResource;
use TomatoPHP\FilamentMenus\Resources\MenuResource\Pages;

class MenuResource extends BaseMenuResource
{
    protected static ?string $navigationIcon = 'fas-bars';
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $slug = 'menus';
    protected static ?int $navigationSort = 1;

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageMenus::route('/'),
            'create' => Pages\CreateMenus::route('/create'),
            'edit' => Pages\EditMenus::route('/{record}'),
        ];
    }
}
