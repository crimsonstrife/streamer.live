<?php

namespace App\Filament\Clusters\Security\Resources;

use App\Filament\Clusters\Security;
use App\Filament\Clusters\Security\Resources\GeoFilterResource\Pages;
use App\Filament\Clusters\Security\Resources\GeoFilterResource\RelationManagers;
use App\Models\SecurityObjects\GeoFilter;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Symfony\Component\Intl\Countries;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class GeoFilterResource extends Resource
{
    protected static ?string $model = GeoFilter::class;
    protected static ?string $navigationIcon = 'fas-globe';
    protected static ?string $navigationGroup = 'Firewall';
    protected static ?string $navigationLabel = 'Geographic Filters';
    protected static ?string $slug = 'geo-filters';
    protected static ?string $cluster = Security::class;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('country_code')
                ->label('Country')
                ->options(Countries::getNames())      // [ 'AD' => 'Andorra', 'AE' => 'United Arab Emirates', … ]
                ->searchable()
                ->preload()                           // load all options on page-load
                ->unique(ignorable: fn ($record) => $record)
                ->required(),

            Forms\Components\Select::make('type')
                ->label('Filter Type')
                ->options([
                    'whitelist' => 'Whitelist',
                    'blacklist' => 'Blacklist',
                ])
                ->required(),

            Forms\Components\TextInput::make('reason')
                ->label('Reason')
                ->nullable(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('country_code')
                ->label('Country')
                ->formatStateUsing(fn (string $state): string => Countries::getName($state))
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('type')->label('Type'),
            Tables\Columns\TextColumn::make('reason')->label('Reason')->wrap(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Added'),
        ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListGeoFilters::route('/'),
            'create' => Pages\CreateGeoFilter::route('/create'),
            'edit'   => Pages\EditGeoFilter::route('/{record}/edit'),
        ];
    }
}
