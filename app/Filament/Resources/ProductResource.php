<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers\ProductImageRelationManager;
use App\Filament\Resources\ProductResource\RelationManagers\PromotionRelationManager;
use App\Filament\Resources\ProductResource\RelationManagers\VariationsRelationManager;
use App\Models\SharedObjects\Category;
use App\Models\StoreObjects\Product;
use App\Traits\HasContentEditor;
use Filament\Forms;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    use HasContentEditor;

    protected static ?string $model = Product::class;

    protected static ?string $slug = 'store/products';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Store';

    protected static ?string $navigationIcon = 'fas-shirt';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')->required()->disabled(),
                        self::getContentEditor('description')->required()->label('Description'),
                    ])
                    ->columns([
                        'sm' => 2,
                    ])
                    ->columnSpan(2),
                Forms\Components\Section::make()
                    ->schema([
                        self::getContentEditor('more_details')->label('More Details'),
                        self::getContentEditor('product_information')->label('Product Information'),
                    ])
                    ->columns([
                        'sm' => 1,
                    ])
                    ->columnSpan(1),
                Forms\Components\TextInput::make('price')
                    ->label('Price')
                    ->required()
                    ->disabled()
                    ->numeric()
                    ->prefix('$')
                    ->dehydrateStateUsing(fn ($state) => (float) $state) // avoid object binding
                    ->formatStateUsing(fn ($state) => is_object($state) && method_exists($state, 'raw') ? $state->raw() : $state),
                Forms\Components\Select::make('state')->required()->options([
                    'AVAILABLE' => 'Available',
                    'SOLDOUT' => 'Sold Out',
                ])->default('AVAILABLE'),
                Forms\Components\Select::make('access')->required()->options([
                    'ARCHIVED' => 'Archived',
                    'HIDDEN' => 'Private',
                    'PUBLIC' => 'Public',
                ])->default('PUBLIC'),
                Toggle::make('is_featured')
                    ->label('Featured')
                    ->inline(false)
                    ->default(false)
                    ->helperText('Mark this product as featured'),
                Forms\Components\Select::make('categories')
                    ->multiple()
                    ->relationship(
                        name: 'categories',
                        titleAttribute: 'name',
                        modifyQueryUsing: fn ($query) => $query->where('type', 'product')
                    )
                    ->createOptionForm([
                        Forms\Components\TextInput::make('name')
                            ->label(__('filament-blog::filament-blog.name'))
                            ->required()
                            ->live()
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                                if (($get('slug') ?? '') !== Str::slug($old)) {
                                    return;
                                }

                                $set('slug', Str::slug($state));
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->label(__('filament-blog::filament-blog.slug'))
                            ->required()
                            ->unique(Category::class, 'slug', fn ($record) => $record),
                        Forms\Components\Toggle::make('is_visible')
                            ->label(__('filament-blog::filament-blog.visible_to_guests'))
                            ->default(true),
                        Forms\Components\Hidden::make('type')->default('product'),
                    ])
                    ->preload()
                    ->searchable(),
                SpatieTagsInput::make('tags')
                    ->label(__('Product Tags'))->type('product'),
            ])->columns(3);
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
            VariationsRelationManager::class,
            ProductImageRelationManager::class,
            PromotionRelationManager::class,
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
