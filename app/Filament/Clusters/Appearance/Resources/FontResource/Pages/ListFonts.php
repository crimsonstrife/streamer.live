<?php

namespace App\Filament\Clusters\Appearance\Resources\FontResource\Pages;

use App\Filament\Clusters\Appearance\Resources\FontResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFonts extends ListRecords
{
    protected static string $resource = FontResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
