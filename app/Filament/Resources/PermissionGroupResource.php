<?php

namespace App\Filament\Resources;

use App\Filament\Clusters\Security;
use App\Filament\Resources\PermissionGroupResource\Pages;
use App\Filament\Resources\PermissionGroupResource\RelationManagers;
use App\Models\AuthObjects\PermissionGroup;
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

class PermissionGroupResource extends Resource
{
    protected static ?string $model = PermissionGroup::class;
    protected static ?string $navigationIcon = 'fas-shield';
    protected static ?string $slug = 'permission-groups';
    protected ?string $heading = 'Manage Permission Groups';
    protected ?string $subheading = 'Permission groups are used to group permissions together.';
    protected static ?string $navigationGroup = 'Access Control';
    protected static ?string $navigationLabel = 'Permission Groups';
    protected static ?string $cluster = Security::class;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required()->maxLength(255),
                Select::make('permission_sets')
                    ->multiple()
                    ->relationship('permissionSets', 'name')
                    ->options(PermissionSet::all()->pluck('name', 'id'))
                    ->preload(),
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
                TextColumn::make('permission_sets_count')->counts('permissionSets')->label('Permission Sets')->badge(),
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
            'index' => Pages\ListPermissionGroups::route('/'),
            'create' => Pages\CreatePermissionGroup::route('/create'),
            'edit' => Pages\EditPermissionGroup::route('/{record}/edit'),
        ];
    }
}
