<?php

namespace App\Filament\Resources;

use App\Enums\StreamSocialPlatform;
use App\Filament\Resources\StreamSocialAccountResource\Pages;
use App\Filament\Resources\StreamSocialAccountResource\Pages\CreateStreamSocialAccount;
use App\Filament\Resources\StreamSocialAccountResource\Pages\EditStreamSocialAccount;
use App\Filament\Resources\StreamSocialAccountResource\Pages\ListStreamSocialAccounts;
use App\Filament\Resources\StreamSocialAccountResource\RelationManagers;
use App\Models\StreamSocialAccount;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StreamSocialAccountResource extends Resource
{
    protected static ?string $model = StreamSocialAccount::class;

    protected static ?string $navigationIcon = 'heroicon-m-share';
    protected static ?string $navigationGroup = 'Twitch';
    protected static ?string $navigationLabel = 'Social Accounts';
    protected static ?string $modelLabel = 'Social Account';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Account')
                ->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    Select::make('platform')
                        ->options(StreamSocialPlatform::class)
                        ->required()
                        ->live(),

                    Toggle::make('enabled')
                        ->default(true),
                ])
                ->columns(2),

            Section::make('Credentials')
                ->schema([
                    // X
                    Group::make()
                        ->visible(fn (Get $get) => $get('platform') === StreamSocialPlatform::X->value)
                        ->schema([
                            Placeholder::make('x_connection_status')
                                ->label('X Connection')
                                ->content(function (?StreamSocialAccount $record) {
                                    $has = (bool) (
                                        ($record?->credentials['access_token'] ?? null)
                                        || ($record?->credentials['user_access_token'] ?? null) // legacy
                                    );

                                    return $has ? 'Connected' : 'Not connected';
                                })
                                ->helperText('Use the “Connect X” action on this page to authorize posting.'),
                        ]),

                    // Bluesky
                    Group::make()
                        ->visible(fn (Get $get) => $get('platform') === StreamSocialPlatform::Bluesky->value)
                        ->schema([
                            TextInput::make('credentials.identifier')
                                ->label('Handle or DID')
                                ->maxLength(255)
                                ->helperText('Example: crimsonstrife.bsky.social'),

                            Placeholder::make('bsky_pw_status')
                                ->label('Bluesky App Password')
                                ->content(function (?StreamSocialAccount $record) {
                                    $has = (bool) (($record?->credentials['app_password'] ?? null));
                                    return $has ? 'Configured' : 'Not configured';
                                }),

                            TextInput::make('credentials.app_password')
                                ->label('App Password')
                                ->password()
                                ->revealable()
                                ->afterStateHydrated(fn (TextInput $c) => $c->state(''))
                                ->dehydrated(fn ($state) => filled($state))
                                ->helperText('Use an app password. Leaving blank keeps existing.')
                                ->maxLength(255),

                            TextInput::make('credentials.pds_url')
                                ->label('PDS URL')
                                ->default('https://bsky.social')
                                ->maxLength(255),
                        ]),
                ]),

            Section::make('Metadata')
                ->collapsed()
                ->schema([
                    KeyValue::make('meta')
                        ->keyLabel('Key')
                        ->valueLabel('Value')
                        ->addButtonLabel('Add meta entry'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('platform')
                    ->formatStateUsing(fn ($state) => $state?->value ?? $state)
                    ->sortable(),
                Tables\Columns\IconColumn::make('enabled')->boolean()->sortable(),
                Tables\Columns\TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\PostRulesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStreamSocialAccounts::route('/'),
            'create' => Pages\CreateStreamSocialAccount::route('/create'),
            'edit' => Pages\EditStreamSocialAccount::route('/{record}/edit'),
        ];
    }
}
