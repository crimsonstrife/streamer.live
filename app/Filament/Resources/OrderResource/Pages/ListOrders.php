<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;

class ListOrders extends ListRecords
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('Import Orders')
                ->label('Import Orders')
                ->url(OrderResource::getUrl('import')) // uses the custom route we registered
                ->icon('heroicon-o-arrow-up-tray')
                ->color('primary'),
        ];
    }
}
