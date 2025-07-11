<?php

namespace App\Filament\Clusters\Appearance\Resources\EmoteResource\Pages;

use App\Filament\Clusters\Appearance\Resources\EmoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEmotes extends ListRecords
{
    protected static string $resource = EmoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
