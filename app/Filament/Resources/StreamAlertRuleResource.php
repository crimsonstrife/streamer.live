<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StreamAlertRuleResource\Pages;
use App\Models\StreamAlertRule;
use App\Services\DiscordBotService;
use App\Settings\TwitchSettings;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class StreamAlertRuleResource extends Resource
{
    protected static ?string $model = StreamAlertRule::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    /**
     * Hide the “Create” button (and disable the create page) if Twitch is disabled.
     */
    public static function canCreate(): bool
    {
        return app(TwitchSettings::class)->enable_integration;
    }

    public static function canEdit(Model $record): bool
    {
        return app(TwitchSettings::class)->enable_integration;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('category_pattern')
                    ->label('Twitch Category (Regex)')
                    ->required(),

                Select::make('discord_channel_id')
                    ->label('Discord Channel')
                    ->options(fn () => app(DiscordBotService::class)->getChannelList())
                    ->searchable()
                    ->required(),

                Select::make('discord_roles')
                    ->label('Mention Roles')
                    ->multiple()
                    ->options(fn () => app(DiscordBotService::class)->getRoleList())
                    ->searchable(),

                Textarea::make('message_template')
                    ->label('Message Template')
                    ->rows(4)
                    ->helperText('You can use placeholders like {streamer}, {category}, {url}')
                    ->default(fn () => app(StreamAlertRule::class)->defaultMessageTemplate())
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('category_pattern')
                    ->label('Twitch Category (Regex)')
                    ->searchable(),

                TextColumn::make('discord_channel_id')
                    ->label('Discord Channel')
                    ->getStateUsing(
                        fn ($record) => app(DiscordBotService::class)
                        ->getChannelNameById($record->discord_channel_id)
                        ?? "Unknown ({$record->discord_channel_id})"
                    ),

                TextColumn::make('discord_roles')
                    ->label('Mention Roles')
                    ->formatStateUsing(
                        fn ($state) => collect($state ?? [])
                        ->map(
                            fn ($id) => app(DiscordBotService::class)
                            ->getRoleNameById($id)
                            ?? "Unknown ({$id})"
                        )
                        ->implode(', ')
                    )
                    ->wrap()
                    ->tooltip(fn ($state) => is_array($state) ? implode(', ', $state) : $state),

                ToggleColumn::make('enabled')
                    ->label('Enabled'),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStreamAlertRules::route('/'),
            'create' => Pages\CreateStreamAlertRule::route('/create'),
            'edit' => Pages\EditStreamAlertRule::route('/{record}/edit'),
        ];
    }
}
