<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SupporterRoleResource\Pages;
use App\Filament\Resources\SupporterRoleResource\RelationManagers;
use App\Models\SupporterRole;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SupporterRoleResource extends Resource
{
    protected static ?string $model = SupporterRole::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()->unique(),
                Forms\Components\Textarea::make('description')->nullable(),
                Forms\Components\TextInput::make('source')->nullable(),
                Forms\Components\Select::make('perks')
                    ->relationship('perks', 'name')
                    ->multiple()
                    ->label('Associated Perks'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Supporter Role Name'),
                Tables\Columns\TextColumn::make('source')->label('Source/Platform'),
                Tables\Columns\TextColumn::make('perks.name')->label('Perks')->badge(),
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
            'index' => Pages\ListSupporterRoles::route('/'),
            'create' => Pages\CreateSupporterRole::route('/create'),
            'edit' => Pages\EditSupporterRole::route('/{record}/edit'),
        ];
    }
}
