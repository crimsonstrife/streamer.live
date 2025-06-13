<?php

namespace App\Filament\Clusters\Security\Resources\IPFilterResource\Pages;

use App\Filament\Clusters\Security\Resources\IPFilterResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListIPFilters extends ListRecords
{
    protected static string $resource = IPFilterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
