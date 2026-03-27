<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BrandPartnerResource\Pages;
use App\Filament\Resources\BrandPartnerResource\RelationManagers\LinksRelationManager;
use App\Models\SharedObjects\BrandPartner;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BrandPartnerResource extends Resource
{
    protected static ?string $model = BrandPartner::class;

    protected static ?string $slug = 'marketing/brand-partners';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Marketing';

    protected static ?string $navigationIcon = 'fas-handshake';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Partner Details')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Set $set, Get $get, ?string $state): void {
                                if (blank($get('slug'))) {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Select::make('type')
                            ->required()
                            ->options([
                                'partner' => 'Partner',
                                'affiliate' => 'Affiliate',
                                'sponsor' => 'Sponsor',
                            ])
                            ->default('partner')
                            ->native(false),

                        Select::make('status')
                            ->required()
                            ->options([
                                'draft' => 'Draft',
                                'active' => 'Active',
                                'archived' => 'Archived',
                            ])
                            ->default('active')
                            ->native(false),

                        Toggle::make('is_active')
                            ->default(true),

                        Toggle::make('is_featured')
                            ->default(false),

                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->minValue(0),

                        DateTimePicker::make('starts_at'),

                        DateTimePicker::make('ends_at'),
                    ])
                    ->columns(4),

                Section::make('Content')
                    ->schema([
                        TextInput::make('headline')
                            ->maxLength(255),

                        TextInput::make('badge')
                            ->maxLength(255)
                            ->helperText('Examples: Sponsor, Partner, Affiliate'),

                        TextInput::make('cta_label')
                            ->maxLength(255)
                            ->helperText('Default CTA when the primary link is rendered.'),

                        Textarea::make('excerpt')
                            ->rows(3)
                            ->columnSpanFull(),

                        RichEditor::make('body')
                            ->columnSpanFull()
                            ->helperText('Optional long-form content for spotlight-style blocks.'),
                    ])
                    ->columns(3),

                Section::make('Disclosure & Media')
                    ->schema([
                        Toggle::make('show_disclosure')
                            ->default(false),

                        Textarea::make('disclosure_text')
                            ->rows(2)
                            ->helperText('Examples: Affiliate link, Sponsored partner')
                            ->columnSpanFull(),

                        SpatieMediaLibraryFileUpload::make('logo')
                            ->collection('logos')
                            ->label('Logo')
                            ->image()
                            ->imageEditor()
                            ->columnSpan(1),

                        SpatieMediaLibraryFileUpload::make('banner')
                            ->collection('banners')
                            ->label('Banner')
                            ->image()
                            ->imageEditor()
                            ->columnSpan(2),

                        KeyValue::make('meta')
                            ->keyLabel('Key')
                            ->valueLabel('Value')
                            ->columnSpanFull(),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('type')
                    ->badge()
                    ->sortable(),

                TextColumn::make('status')
                    ->badge()
                    ->sortable(),

                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),

                IconColumn::make('is_active')
                    ->label('Enabled')
                    ->boolean(),

                TextColumn::make('links_count')
                    ->counts('links')
                    ->label('Links'),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'partner' => 'Partner',
                        'affiliate' => 'Affiliate',
                        'sponsor' => 'Sponsor',
                    ]),

                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'active' => 'Active',
                        'archived' => 'Archived',
                    ]),

                TernaryFilter::make('is_featured')
                    ->label('Featured'),

                TernaryFilter::make('is_active')
                    ->label('Enabled'),
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
            LinksRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBrandPartners::route('/'),
            'create' => Pages\CreateBrandPartner::route('/create'),
            'edit' => Pages\EditBrandPartner::route('/{record}/edit'),
        ];
    }
}
