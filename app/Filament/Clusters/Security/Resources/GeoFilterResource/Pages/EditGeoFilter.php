<?php

namespace App\Filament\Clusters\Security\Resources\GeoFilterResource\Pages;

use App\Filament\Clusters\Security\Resources\GeoFilterResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGeoFilter extends EditRecord
{
    protected static string $resource = GeoFilterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
