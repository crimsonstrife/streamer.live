<?php

namespace App\Filament\Resources\IconResource\Pages;

use App\Filament\Resources\IconResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditIcon extends EditRecord
{
    protected static string $resource = IconResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
