<?php

namespace App\Filament\Clusters\Security\Resources\GeoFilterResource\Pages;

use App\Filament\Clusters\Security\Resources\GeoFilterResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListGeoFilters extends ListRecords
{
    protected static string $resource = GeoFilterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
