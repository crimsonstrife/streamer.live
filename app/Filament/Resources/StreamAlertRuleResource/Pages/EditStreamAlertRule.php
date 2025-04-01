<?php

namespace App\Filament\Resources\StreamAlertRuleResource\Pages;

use App\Filament\Resources\StreamAlertRuleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStreamAlertRule extends EditRecord
{
    protected static string $resource = StreamAlertRuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
