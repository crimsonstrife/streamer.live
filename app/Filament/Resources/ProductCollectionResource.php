<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductCollectionResource\Pages;
use App\Filament\Resources\ProductCollectionResource\RelationManagers;
use App\Models\StoreObjects\Collection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductCollectionResource extends Resource
{
    protected static ?string $model = Collection::class;

    protected static ?string $slug = 'store/collections';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Store';

    protected static ?string $navigationIcon = 'fas-box-open';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()->disabled(),
                Forms\Components\Textarea::make('description')->rows(6)->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('products_count')->label('Products')->counts('products'),
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
            RelationManagers\ProductRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ProductCollectionResource\Pages\ListProductCollections::route('/'),
            'edit' => ProductCollectionResource\Pages\EditProductCollection::route('/{record}/edit'),
        ];
    }
}
