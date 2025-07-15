<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TicketResource\Pages;
use App\Filament\Resources\TicketResource\RelationManagers\MessagesRelationManager;
use App\Models\Ticket;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TicketResource extends Resource
{
    protected static ?string $model = Ticket::class;

    protected static ?string $slug = 'support/tickets';

    protected static ?string $navigationIcon = 'fas-ticket';

    protected static ?string $navigationGroup = 'Support';

    protected static ?string $navigationLabel = 'Support Tickets';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required(),

                Select::make('assigned_to')
                    ->label('Assigned To')
                    ->relationship('assignedTo', 'name')
                    ->searchable()
                    ->nullable(),

                Select::make('type')
                    ->options([
                        'order_support' => 'Order Support',
                        'unban_request' => 'Unban Request',
                    ])
                    ->required(),

                TextInput::make('subject')
                    ->required()
                    ->maxLength(255),

                TextInput::make('message')
                    ->required()
                    ->maxLength(255),

                Select::make('order_id')
                    ->relationship('order', 'friendly_id')
                    ->label('Order (optional)')
                    ->searchable()
                    ->nullable(),

                Select::make('status')
                    ->options([
                        'open' => 'Open',
                        'pending' => 'Pending',
                        'closed' => 'Closed',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('#')->sortable(),
                TextColumn::make('user.name')->label('User')->sortable()->searchable(),
                TextColumn::make('type')
                    ->label('Type')
                    ->sortable()
                    ->formatStateUsing(fn (string $state): string => [
                        'order_support' => 'Order Support',
                        'unban_request' => 'Unban Request',
                    ][$state] ?? ucfirst($state)),
                TextColumn::make('status')
                    ->badge()
                    ->sortable()
                    ->colors([
                        'success' => 'open',
                        'warning' => 'pending',
                        'secondary' => 'closed',
                    ]),
                TextColumn::make('assignedTo.name')->label('Assigned')->sortable()->searchable(),
                TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'open' => 'Open',
                        'pending' => 'Pending',
                        'closed' => 'Closed',
                    ]),
                SelectFilter::make('type')
                    ->options([
                        'order_support' => 'Order Support',
                        'unban_request' => 'Unban Request',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            MessagesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageTickets::route('/'),
            'create' => Pages\CreateTicket::route('/create'),
            'edit' => Pages\EditTicket::route('/{record}/edit'),
            'view' => Pages\ViewTicket::route('/{record}'),
        ];
    }
}
