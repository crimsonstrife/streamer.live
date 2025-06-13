<?php

namespace App\Filament\Clusters\Security\Resources;

use App\Filament\Clusters\Security;
use App\Filament\Clusters\Security\Resources\IPFilterResource\Pages;
use App\Filament\Clusters\Security\Resources\IPFilterResource\RelationManagers;
use App\Models\SecurityObjects\IPFilter;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class IPFilterResource extends Resource
{
    protected static ?string $model = IPFilter::class;

    protected static ?string $title = "IP Address Filters";

    protected static ?string $description = "Manage IP Address Filters";

    protected static ?string $navigationLabel = 'IP Filtering';

    protected static ?string $navigationIcon = 'fas-filter';

    protected static ?string $slug = 'ip-filters';

    protected static ?string $cluster = Security::class;

    protected static ?string $navigationGroup = 'Firewall';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('ip_address')
                    ->label('IP Address')
                    ->required()
                    ->ip()
                    ->unique('ip_filters', 'ip_address'),
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
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('ip_address')
                    ->label('IP Address')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Type')
                    ->sortable(),
                Tables\Columns\TextColumn::make('reason')
                    ->label('Reason'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Added On')
                    ->dateTime(),
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
            'index' => Pages\ListIPFilters::route('/'),
            'create' => Pages\CreateIPFilter::route('/create'),
            'edit' => Pages\EditIPFilter::route('/{record}/edit'),
        ];
    }
}
