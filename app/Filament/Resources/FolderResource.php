<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FolderResource\Pages;
use TomatoPHP\FilamentMediaManager\Resources\FolderResource as BaseFolderResource;

class FolderResource extends BaseFolderResource
{
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $navigationIcon = 'fas-folder-tree';
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFolders::route('/')
        ];
    }
}
