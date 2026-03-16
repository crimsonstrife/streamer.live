<?php

namespace App\Filament\Resources\BrandPartnerResource\Pages;

use App\Filament\Resources\BrandPartnerResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBrandPartners extends ListRecords
{
    protected static string $resource = BrandPartnerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
