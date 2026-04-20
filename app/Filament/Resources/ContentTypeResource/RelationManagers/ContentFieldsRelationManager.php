<?php

namespace App\Filament\Resources\ContentTypeResource\RelationManagers;

use App\Services\ContentFieldFactory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ContentFieldsRelationManager extends RelationManager
{
    protected static string $relationship = 'fields';

    protected static ?string $title = 'Fields';

    protected static ?string $recordTitleAttribute = 'label';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Field Definition')
                    ->schema([
                        Forms\Components\TextInput::make('label')
                            ->required()
                            ->maxLength(255)
                            ->live(debounce: 500)
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                                if (($get('name') ?? '') !== Str::snake(Str::ascii($old ?? ''))) {
                                    return;
                                }
                                $set('name', Str::snake(Str::ascii($state ?? '')));
                            }),

                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Machine name used in code. Use snake_case.')
                            ->rules(['regex:/^[a-z][a-z0-9_]*$/']),

                        Forms\Components\Select::make('type')
                            ->options(ContentFieldFactory::getFieldTypes())
                            ->required()
                            ->live()
                            ->afterStateUpdated(fn (Set $set) => $set('options', null)),

                        Forms\Components\TextInput::make('column_span')
                            ->numeric()
                            ->default(2)
                            ->minValue(1)
                            ->maxValue(2)
                            ->helperText('1 = half width, 2 = full width'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Field Options')
                    ->schema(fn (Get $get): array => ContentFieldFactory::getOptionsSchema($get('type') ?? ''))
                    ->visible(fn (Get $get): bool => ! empty(ContentFieldFactory::getOptionsSchema($get('type') ?? ''))),

                Forms\Components\Section::make('Behavior')
                    ->schema([
                        Forms\Components\Toggle::make('is_required')
                            ->label('Required'),
                        Forms\Components\Toggle::make('is_searchable')
                            ->label('Searchable')
                            ->helperText('Include this field in admin search.'),
                        Forms\Components\Toggle::make('show_in_table')
                            ->label('Show in Table')
                            ->default(true)
                            ->helperText('Display as a column in the entries list.'),
                        Forms\Components\TextInput::make('default_value')
                            ->label('Default Value')
                            ->nullable(),
                        Forms\Components\TextInput::make('validation_rules')
                            ->label('Extra Validation')
                            ->placeholder('e.g., max:500|min:10')
                            ->helperText('Additional Laravel validation rules (comma-separated).'),
                    ])
                    ->columns(3),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable(),
                Tables\Columns\TextColumn::make('label')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->color('gray'),
                Tables\Columns\TextColumn::make('type')
                    ->badge(),
                Tables\Columns\IconColumn::make('is_required')
                    ->label('Req.')
                    ->boolean(),
                Tables\Columns\IconColumn::make('show_in_table')
                    ->label('In Table')
                    ->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
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
