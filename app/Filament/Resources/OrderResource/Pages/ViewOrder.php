<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Infolists\Components\Group;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\ViewRecord;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    public function getInfolist(string $name): ?Infolist
    {
        return Infolist::make()
            ->record($this->record) // ← this tells the infolist which record to use
            ->schema([
                TextEntry::make('id')->label('Order ID'),
                TextEntry::make('email'),
                TextEntry::make('status'),

                Group::make()
                    ->schema([
                        TextEntry::make('created_at')->dateTime(),
                        TextEntry::make('updated_at')->dateTime(),
                    ])->columns(2),

                RepeatableEntry::make('orderItems')
                    ->label('Items')
                    ->schema([
                        TextEntry::make('productVariant.product.name')->label('Product'),
                        TextEntry::make('productVariant.name')->label('Variant'),
                        TextEntry::make('quantity'),
                    ]),
            ]);
    }
}
