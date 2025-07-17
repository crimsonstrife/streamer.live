<?php

namespace App\Filament\Clusters\Appearance\Resources\EmoteResource\Pages;

use App\Filament\Clusters\Appearance\Resources\EmoteResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEmote extends EditRecord
{
    protected static string $resource = EmoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
