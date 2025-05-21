<?php

namespace App\Filament\Resources\IconResource\Pages;

use App\Filament\Resources\IconResource;
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
