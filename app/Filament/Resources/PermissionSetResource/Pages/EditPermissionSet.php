<?php

namespace App\Filament\Resources\PermissionSetResource\Pages;

use App\Filament\Resources\PermissionSetResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPermissionSet extends EditRecord
{
    protected static string $resource = PermissionSetResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
