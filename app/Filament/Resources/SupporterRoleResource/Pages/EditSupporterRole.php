<?php

namespace App\Filament\Resources\SupporterRoleResource\Pages;

use App\Filament\Resources\SupporterRoleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSupporterRole extends EditRecord
{
    protected static string $resource = SupporterRoleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
