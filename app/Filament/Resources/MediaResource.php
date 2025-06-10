<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use TomatoPHP\FilamentMediaManager\Resources\MediaResource as BaseMediaResource;

class MediaResource extends BaseMediaResource {
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $slug = 'cms/media';
    protected static ?string $navigationIcon = 'fas-photo-film';

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMedia::route('/')
        ];
    }
}
