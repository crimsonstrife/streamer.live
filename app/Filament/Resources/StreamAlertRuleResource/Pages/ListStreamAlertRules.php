<?php

namespace App\Filament\Resources\StreamAlertRuleResource\Pages;

use App\Filament\Resources\StreamAlertRuleResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStreamAlertRules extends ListRecords
{
    protected static string $resource = StreamAlertRuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
