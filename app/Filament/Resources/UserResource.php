<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages\CreateUser;
use App\Filament\Resources\UserResource\Pages\EditUser;
use App\Filament\Resources\UserResource\Pages\ListUsers;
use App\Models\AuthObjects\Role;
use App\Models\AuthObjects\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Gerenuk\FilamentBanhammer\Resources\Actions\BanAction;
use Gerenuk\FilamentBanhammer\Resources\Actions\BanBulkAction;
use Gerenuk\FilamentBanhammer\Resources\Actions\UnbanAction;
use Gerenuk\FilamentBanhammer\Resources\Actions\UnbanBulkAction;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationGroup = 'Users & Roles';

    protected static ?string $navigationIcon = 'fas-user';

    protected ?string $heading = 'Manage Users';

    protected ?string $subheading = 'Users are the people who use the application.';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('username')->required()->maxLength(255)->unique(),
                TextInput::make('email')->required()->email()->maxLength(255)->unique(),
                TextInput::make('first_name')->maxLength(255),
                TextInput::make('last_name')->maxLength(255),
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
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                BanAction::make(),
                UnbanAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    BanBulkAction::make(),
                    UnbanBulkAction::make(),
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
            'index' => ListUsers::route('/'),
            'create' => CreateUser::route('/create'),
            'edit' => EditUser::route('/{record}/edit'),
        ];
    }
}
