<?php

namespace App\Filament\Clusters\Appearance\Resources\IconResource\Pages;

use App\Filament\Clusters\Appearance\Resources\IconResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListIcons extends ListRecords
{
    protected static string $resource = IconResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
