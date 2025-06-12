<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoleResource\Pages;
use App\Filament\Resources\RoleResource\RelationManagers;
use App\Models\AuthObjects\PermissionGroup;
use App\Models\AuthObjects\PermissionSet;
use App\Models\AuthObjects\Role;
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

class RoleResource extends Resource
{
    protected static ?string $model = Role::class;
    protected static ?string $navigationGroup = 'Users & Roles';
    protected static ?string $navigationIcon = 'fas-user-group';
    protected ?string $heading = 'Manage Roles';
    protected ?string $subheading = 'Roles are used to assign permissions to users.';

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
                Select::make('permission_sets')
                    ->multiple()
                    ->relationship('permissionSets', 'name')
                    ->options(PermissionSet::all()->pluck('name', 'id'))
                    ->preload(),
                Select::make('permission_groups')
                    ->multiple()
                    ->relationship('permissionGroups', 'name')
                    ->options(PermissionGroup::all()->pluck('name', 'id'))
                    ->preload(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('permissions_count')->counts('permissions')->label('Permissions')->badge(),
                TextColumn::make('permission_sets_count')->counts('permissionSets')->label('Permission Sets')->badge(),
                TextColumn::make('permission_groups_count')->counts('permissionGroups')->label('Permission Groups')->badge(),
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
            'index' => \App\Filament\Resources\RoleResource\Pages\ListRoles::route('/'),
            'create' => \App\Filament\Resources\RoleResource\Pages\CreateRole::route('/create'),
            'edit' => \App\Filament\Resources\RoleResource\Pages\EditRole::route('/{record}/edit'),
        ];
    }
}
