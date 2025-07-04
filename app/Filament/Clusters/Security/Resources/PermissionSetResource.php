<?php

namespace App\Filament\Clusters\Security\Resources;

use App\Filament\Clusters\Security;
use App\Models\AuthObjects\PermissionSet;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Spatie\Permission\Models\Permission;

class PermissionSetResource extends Resource
{
    protected static ?string $model = PermissionSet::class;
    protected static ?string $navigationIcon = 'fas-shield-halved';
    protected static ?string $slug = 'permission-sets';
    protected ?string $heading = 'Manage Permission Sets';
    protected ?string $subheading = 'Permission sets are used to group permissions together in an advanced way, allowing the muting of permissions for a user.';
    protected static ?string $navigationGroup = 'Access Control';
    protected static ?string $navigationLabel = 'Permission Sets';
    protected static ?string $cluster = Security::class;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required()->maxLength(255),
                Select::make('permissions')
                    ->multiple()
                    ->relationship('permissions', 'name')
                    ->options(Permission::all()->pluck('name', 'id'))
                    ->preload(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('permissions_count')->counts('permissions')->label('Permissions')->badge(),
            ])
            ->filters([
                //
            ])
            ->actions([
                //
            ])
            ->bulkActions([
                //
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
            'index' => PermissionSetResource\Pages\ListPermissionSets::route('/'),
            'create' => PermissionSetResource\Pages\CreatePermissionSet::route('/create'),
            'edit' => PermissionSetResource\Pages\EditPermissionSet::route('/{record}/edit'),
        ];
    }
}
