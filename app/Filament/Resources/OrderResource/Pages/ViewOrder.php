<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Infolists\Components\Group;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\ViewRecord;
use Filament\Support\Colors\Color;

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
                    ->label('Shipping Address')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('shipping_address.name')->label('Name'),
                        TextEntry::make('shipping_address.phone')->label('Phone'),
                        TextEntry::make('shipping_address.address1')->label('Address 1'),
                        TextEntry::make('shipping_address.address2')->label('Address 2'),
                        TextEntry::make('shipping_address.city')->label('City'),
                        TextEntry::make('shipping_address.state')->label('State'),
                        TextEntry::make('shipping_address.zip')->label('Zip'),
                        TextEntry::make('shipping_address.country')->label('Country'),
                    ]),

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

                Group::make()
                    ->columns(2)
                    ->schema([
                        TextEntry::make('subtotal')
                            ->label('Subtotal')
                            ->formatStateUsing(fn ($state) => $state?->formatted()),

                        TextEntry::make('shipping')
                            ->label('Shipping')
                            ->formatStateUsing(fn ($state) => $state?->formatted()),

                        TextEntry::make('tax')
                            ->label('Tax')
                            ->formatStateUsing(fn ($state) => $state?->formatted()),

                        TextEntry::make('donation')
                            ->label('Donation')
                            ->formatStateUsing(fn ($state) => $state?->formatted()),

                        TextEntry::make('discount')
                            ->label('Discount')
                            ->formatStateUsing(fn ($state) => $state?->formatted()),

                        TextEntry::make('total')
                            ->label('Total')
                            ->columnSpanFull()
                            ->color(Color::Green)
                            ->extraAttributes(['class' => 'text-lg font-semibold'])
                            ->formatStateUsing(fn ($state) => $state?->formatted()),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
