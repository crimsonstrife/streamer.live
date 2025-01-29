<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PerkResource\Pages;
use App\Filament\Resources\PerkResource\RelationManagers;
use App\Models\Perk;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PerkResource extends Resource
{
    protected static ?string $model = Perk::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()->unique(),
                Forms\Components\Textarea::make('description')->nullable(),
                Forms\Components\TextInput::make('source')->nullable(),
                Forms\Components\Toggle::make('is_active')->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Perk Name'),
                Tables\Columns\TextColumn::make('source')->label('Source/Platform'),
                Tables\Columns\ToggleColumn::make('is_active')->label('Is Active?'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListPerks::route('/'),
            'create' => Pages\CreatePerk::route('/create'),
            'edit' => Pages\EditPerk::route('/{record}/edit'),
        ];
    }
}
