<?php

namespace App\Filament\Clusters\Appearance\Resources;

use App\Filament\Clusters\Appearance;
use App\Models\Font;
use App\Rules\FontExtension;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ViewColumn;
use Filament\Tables\Table;

class FontResource extends Resource
{
    protected static ?string $model = Font::class;

    protected static ?string $navigationIcon = 'fas-font';

    protected static ?string $navigationGroup = 'Appearance';

    protected static ?string $cluster = Appearance::class;

    protected static bool $search = true;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('slug')->required()->unique(Font::class,'slug'),
                Forms\Components\TextInput::make('weight_min')
                    ->label('Minimum Weight')
                    ->nullable()
                    ->numeric()
                    ->default(100),
                Forms\Components\TextInput::make('weight_max')
                    ->label('Maximum Weight')
                    ->nullable()
                    ->numeric()
                    ->default(900),
                FileUpload::make('file_path')
                    ->label('Font file (.ttf or .woff2)')
                    ->directory('fonts')
                    ->visibility('public')
                    ->preserveFilenames()
                    ->rules([
                        'file',
                        'max:2048',          // 2 MB max
                        new FontExtension(),
                    ]),
                Forms\Components\Toggle::make('is_builtin')->disabled()->default(false),
            ]);

    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Font Name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('slug')
                    ->sortable(),

                TextColumn::make('weight_min')
                    ->label('Min Weight'),

                TextColumn::make('weight_max')
                    ->label('Max Weight'),

                ViewColumn::make('preview')
                    ->label('Preview')
                    ->view('filament.fonts.columns.preview'),
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
            'index' => FontResource\Pages\ListFonts::route('/'),
            'create' => FontResource\Pages\CreateFont::route('/create'),
            'edit' => FontResource\Pages\EditFont::route('/{record}/edit'),
        ];
    }
}
