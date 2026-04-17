<?php

namespace App\Filament\Resources\ContentTypeResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ContentLayoutsRelationManager extends RelationManager
{
    protected static string $relationship = 'layouts';

    protected static ?string $title = 'Layouts';

    protected static ?string $recordTitleAttribute = 'name';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(debounce: 500)
                    ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                        if (($get('slug') ?? '') !== Str::slug($old)) {
                            return;
                        }
                        $set('slug', Str::slug($state));
                    }),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\Select::make('type')
                    ->options([
                        'list' => 'List Page',
                        'detail' => 'Detail Page',
                        'block' => 'Page Block',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('blade_view')
                    ->required()
                    ->placeholder('content-types.testimonials.detail')
                    ->helperText('Blade view path relative to resources/views/ (dot notation).'),

                Forms\Components\Toggle::make('is_default')
                    ->label('Default Layout')
                    ->helperText('Use this layout by default for its type.'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge(),
                Tables\Columns\TextColumn::make('blade_view')
                    ->color('gray'),
                Tables\Columns\IconColumn::make('is_default')
                    ->label('Default')
                    ->boolean(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
