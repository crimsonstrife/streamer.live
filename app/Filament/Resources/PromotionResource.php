<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PromotionResource\Pages;
use App\Filament\Resources\PromotionResource\RelationManagers;
use App\Models\StoreObjects\Promotion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PromotionResource extends Resource
{
    protected static ?string $model = Promotion::class;

    protected static ?string $slug = 'store/promotions';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Store';

    protected static ?string $navigationIcon = 'fas-percent';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')
                    ->label('Code')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('title')
                    ->sortable()
                    ->searchable(),
                Forms\Components\Textarea::make('description')
                    ->label('Customer Message')
                    ->helperText('Optional: overrides the default messaging shown on the storefront.'),
                TextColumn::make('discount_type')
                    ->label('Type'),
                TextColumn::make('applies_to')
                    ->label('Applies To'),
                TextColumn::make('products_count')
                    ->counts('products')
                    ->label('Products'),
                TextColumn::make('status')
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'Live'     => 'Live',
                        'Draft'    => 'Draft',
                        'Archived' => 'Archived',
                    ]),
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
            'index' => PromotionResource\Pages\ListPromotions::route('/'),
            'create' => PromotionResource\Pages\CreatePromotion::route('/create'),
            'edit' => PromotionResource\Pages\EditPromotion::route('/{record}/edit'),
        ];
    }
}
