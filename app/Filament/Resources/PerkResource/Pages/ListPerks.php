<?php

namespace App\Filament\Resources\PerkResource\Pages;

use App\Filament\Resources\PerkResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPerks extends ListRecords
{
    protected static string $resource = PerkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
