<?php

namespace App\Filament\Resources;

use Z3d0X\FilamentFabricator\Resources\PageResource as BasePageResource;
use Z3d0X\FilamentFabricator\Resources\PageResource\Pages;

class PageResource extends BasePageResource
{
    protected static ?string $navigationIcon = 'fas-file';
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $slug = 'cms/pages';
    protected static ?int $navigationSort = 0;

    public static function getPages(): array
    {
        return array_filter([
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'view' => config('filament-fabricator.enable-view-page') ? Pages\ViewPage::route('/{record}') : null,
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ]);
    }
}
