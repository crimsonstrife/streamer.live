<?php

namespace App\Filament\Clusters\Security\Resources\PermissionGroupResource\Pages;

use App\Filament\Clusters\Security\Resources\PermissionGroupResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPermissionGroup extends EditRecord
{
    protected static string $resource = PermissionGroupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
