<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()->disabled(),
                Forms\Components\Textarea::make('description')->rows(6)->required(),
                Forms\Components\TextInput::make('price')
                    ->label('Price')
                    ->required()
                    ->disabled()
                    ->numeric()
                    ->prefix('$')
                    ->dehydrateStateUsing(fn ($state) => (float) $state) // avoid object binding
                    ->formatStateUsing(fn ($state) => is_object($state) && method_exists($state, 'raw') ? $state->raw() : $state),
                Forms\Components\Select::make('status')->required()->options([
                    'AVAILABLE' => 'Available',
                    'SOLDOUT' => 'Sold Out',
                ])->default('AVAILABLE'),
                Forms\Components\Select::make('access')->required()->options([
                    'ARCHIVED' => 'Archived',
                    'HIDDEN' => 'Private',
                    'PUBLIC' => 'Public',
                ])->default('PUBLIC'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('price')->money('usd')->sortable(),
                Tables\Columns\TextColumn::make('state')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('access')->searchable()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
