<?php

namespace App\Filament\Clusters\Security\Resources;

use App\Filament\Clusters\Security;
use App\Models\AuthObjects\Role;
use App\Models\AuthObjects\User;
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

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'fas-user';
    protected static ?string $slug = 'users';
    protected ?string $heading = 'Manage Users';
    protected ?string $subheading = 'Users are the people who use the application.';
    protected static ?string $navigationGroup = 'Access Control';
    protected static ?string $navigationLabel = 'Users';
    protected static ?string $cluster = Security::class;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('username')->required()->maxLength(255)->unique(),
                TextInput::make('email')->required()->email()->maxLength(255)->unique(),
                TextInput::make('first_name')->required()->maxLength(255),
                TextInput::make('last_name')->required()->maxLength(255),
                Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->options(Role::all()->pluck('name', 'id'))
                    ->preload(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('username')->sortable()->searchable(),
                TextColumn::make('email')->sortable()->searchable(),
                TextColumn::make('roles.name')->label('Roles')->sortable(),
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
            'index' => UserResource\Pages\ListUsers::route('/'),
            'create' => UserResource\Pages\CreateUser::route('/create'),
            'edit' => UserResource\Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
