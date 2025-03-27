<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class VariationsRelationManager extends RelationManager
{
    protected static string $relationship = 'variants';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->required()->disabled(),
            Forms\Components\TextInput::make('sku')->required()->disabled(),
            Forms\Components\TextInput::make('price')
                ->numeric()
                ->disabled()
                ->required()
                ->prefix('$')
                ->dehydrateStateUsing(fn ($state) => (float) $state)
                ->formatStateUsing(fn ($state) => is_object($state) && method_exists($state, 'raw') ? $state->raw() : $state),
            Forms\Components\Textarea::make('description')->rows(6)->required(),
            Forms\Components\Select::make('stock_status')->required()->options([
                'UNLIMITED' => 'Unlimited',
                'LIMITED' => 'Limited',
            ])->default('UNLIMITED'),
            Forms\Components\TextInput::make('stock_input')->numeric()->default(0),
            Forms\Components\TextInput::make('size')->required()->disabled(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('size'),
                Tables\Columns\TextColumn::make('stock_status'),
                Tables\Columns\TextColumn::make('price')->money('usd')->sortable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                ]),
            ]);
    }
}
