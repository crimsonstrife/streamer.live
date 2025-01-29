<?php

namespace App\Filament\Resources\SupporterRoleResource\Pages;

use App\Filament\Resources\SupporterRoleResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSupporterRoles extends ListRecords
{
    protected static string $resource = SupporterRoleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
