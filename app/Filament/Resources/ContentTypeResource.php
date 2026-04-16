<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContentTypeResource\Pages;
use App\Filament\Resources\ContentTypeResource\RelationManagers;
use App\Models\ContentObjects\ContentType;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ContentTypeResource extends Resource
{
    protected static ?string $model = ContentType::class;

    protected static ?string $slug = 'content-types';

    protected static ?string $navigationGroup = 'Content Types';

    protected static ?string $navigationIcon = 'fas-cubes';

    protected static ?int $navigationSort = 0;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Info')
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

                                if (empty($get('singular_name')) || $get('singular_name') === $old) {
                                    $set('singular_name', $state ? Str::singular($state) : '');
                                }

                                if (empty($get('route_prefix'))) {
                                    $set('route_prefix', Str::slug($state));
                                }
                            }),

                        Forms\Components\TextInput::make('singular_name')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),

                        Forms\Components\Textarea::make('description')
                            ->rows(2)
                            ->columnSpanFull(),

                        Forms\Components\Select::make('icon')
                            ->label('Navigation Icon')
                            ->options(self::getIconOptions())
                            ->searchable(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Features')
                    ->schema([
                        Forms\Components\Toggle::make('has_revisor')
                            ->label('Enable Draft / Publish Workflow')
                            ->default(true)
                            ->helperText('Entries will have draft, published, and version states.'),

                        Forms\Components\Toggle::make('has_tags')
                            ->label('Enable Tags')
                            ->helperText('Entries can be tagged for categorization.'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Routing & Status')
                    ->schema([
                        Forms\Components\TextInput::make('route_prefix')
                            ->label('URL Prefix')
                            ->prefix('/')
                            ->helperText('Frontend URL path for listing entries (e.g., "testimonials" gives /testimonials).')
                            ->maxLength(255),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Inactive content types are hidden from navigation and the frontend.'),

                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->label('Navigation Order'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('singular_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->color('gray'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('fields_count')
                    ->label('Fields')
                    ->counts('fields')
                    ->sortable(),
                Tables\Columns\TextColumn::make('entries_count')
                    ->label('Entries')
                    ->counts('entries')
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
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

    public static function getRelations(): array
    {
        return [
            RelationManagers\ContentFieldsRelationManager::class,
            RelationManagers\ContentLayoutsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContentTypes::route('/'),
            'create' => Pages\CreateContentType::route('/create'),
            'edit' => Pages\EditContentType::route('/{record}/edit'),
        ];
    }

    public static function getModelLabel(): string
    {
        return 'Content Type';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Content Types';
    }

    private static function getIconOptions(): array
    {
        return [
            'fas-star' => 'Star',
            'fas-heart' => 'Heart',
            'fas-quote-left' => 'Quote',
            'fas-briefcase' => 'Briefcase',
            'fas-camera' => 'Camera',
            'fas-music' => 'Music',
            'fas-palette' => 'Palette',
            'fas-book' => 'Book',
            'fas-trophy' => 'Trophy',
            'fas-users' => 'Users',
            'fas-lightbulb' => 'Lightbulb',
            'fas-calendar' => 'Calendar',
            'fas-map-marker-alt' => 'Map Pin',
            'fas-film' => 'Film',
            'fas-gamepad' => 'Gamepad',
            'fas-gift' => 'Gift',
            'fas-microphone' => 'Microphone',
            'fas-newspaper' => 'Newspaper',
            'fas-puzzle-piece' => 'Puzzle',
            'fas-ribbon' => 'Ribbon',
            'fas-utensils' => 'Utensils',
            'fas-wrench' => 'Wrench',
            'fas-file-alt' => 'Document',
            'fas-comments' => 'Comments',
            'fas-tag' => 'Tag',
            'fas-cube' => 'Cube',
            'fas-code' => 'Code',
            'fas-globe' => 'Globe',
            'fas-image' => 'Image',
            'fas-link' => 'Link',
        ];
    }
}
