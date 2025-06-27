<?php

namespace App\Filament\Resources\ProductCollectionResource\Pages;

use App\Filament\Resources\ProductCollectionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProductCollection extends EditRecord
{
    protected static string $resource = ProductCollectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
