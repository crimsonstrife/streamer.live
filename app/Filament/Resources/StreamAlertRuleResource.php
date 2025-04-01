<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StreamAlertRuleResource\Pages;
use App\Models\StreamAlertRule;
use App\Services\DiscordBotService;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StreamAlertRuleResource extends Resource
{
    protected static ?string $model = StreamAlertRule::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('category_pattern')
                    ->label('Twitch Category')
                    ->required(),

                Select::make('discord_channel_id')
                    ->label('Discord Channel')
                    ->options(fn () => app(\App\Services\DiscordBotService::class)->getChannelList())
                    ->searchable()
                    ->required(),

                Select::make('discord_roles')
                    ->label('Mention Roles')
                    ->multiple()
                    ->options(fn () => app(\App\Services\DiscordBotService::class)->getRoleList())
                    ->searchable(),

                Textarea::make('message_template')
                    ->label('Message Template')
                    ->rows(4)
                    ->helperText('You can use placeholders like {streamer}, {category}, {url}')
                    ->default(fn () => app(\App\Models\StreamAlertRule::class)->defaultMessageTemplate())
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category_pattern')
                    ->label('Twitch Category')
                    ->searchable(),

                Tables\Columns\TextColumn::make('discord_channel_id')
                    ->label('Discord Channel')
                    ->getStateUsing(function ($record) {
                        $channelId = $record->discord_channel_id;

                        return app(DiscordBotService::class)->getChannelNameById($channelId) ?? "Unknown ({$channelId})";
                    }),

                Tables\Columns\TextColumn::make('discord_roles')
                    ->label('Mention Roles')
                    ->formatStateUsing(function ($state) {
                        $service = app(DiscordBotService::class);
                        return collect($state ?? [])
                            ->map(fn ($id) => $service->getRoleNameById($id) ?? "Unknown ({$id})")
                            ->implode(', ');
                    })
                    ->wrap()
                    ->tooltip(fn ($state) => is_array($state) ? implode(', ', $state) : $state),

                Tables\Columns\ToggleColumn::make('enabled')
                    ->label('Enabled'),
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
            'index' => Pages\ListStreamAlertRules::route('/'),
            'create' => Pages\CreateStreamAlertRule::route('/create'),
            'edit' => Pages\EditStreamAlertRule::route('/{record}/edit'),
        ];
    }
}
