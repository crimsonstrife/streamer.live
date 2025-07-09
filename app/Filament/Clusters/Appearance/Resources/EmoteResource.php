<?php

namespace App\Filament\Clusters\Appearance\Resources;

use App\Filament\Clusters\Appearance;
use App\Models\Emote;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EmoteResource extends Resource
{
    protected static ?string $model = Emote::class;

    protected static ?string $navigationIcon = 'fas-face-smile';

    protected static ?string $navigationGroup = 'Appearance';

    protected static ?string $cluster = Appearance::class;

    protected static bool $search = true;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('code')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Type it without colons: e.g. pogchamp'),

                TextInput::make('keywords')
                    ->helperText('Comma-separate words to aid search'),

                FileUpload::make('image_path')
                    ->directory('emotes')
                    ->visibility('public')
                    ->image()
                    ->required()
                    ->helperText('PNG, SVG, GIF, etc.'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code'),
                TextColumn::make('keywords')->limit(30),
                ImageColumn::make('image_path'),
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
            'index' => EmoteResource\Pages\ListEmotes::route('/'),
            'create' => EmoteResource\Pages\CreateEmote::route('/create'),
            'edit' => EmoteResource\Pages\EditEmote::route('/{record}/edit'),
        ];
    }
}
