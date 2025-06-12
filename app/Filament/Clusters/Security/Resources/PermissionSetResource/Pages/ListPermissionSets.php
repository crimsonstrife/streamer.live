<?php

namespace App\Filament\Clusters\Security\Resources\PermissionSetResource\Pages;

use App\Filament\Clusters\Security\Resources\PermissionSetResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPermissionSets extends ListRecords
{
    protected static string $resource = PermissionSetResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
