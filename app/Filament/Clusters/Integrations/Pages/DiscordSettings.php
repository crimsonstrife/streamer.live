<?php

namespace App\Filament\Clusters\Integrations\Pages;

use App\Filament\Clusters\Integrations;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class DiscordSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = \App\Settings\DiscordSettings::class;

    protected static ?string $cluster = Integrations::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Discord Integration Settings')
                    ->description('Connect your app to a Discord server via bot token.')
                    ->schema([
                        Toggle::make('enable_integration')
                            ->label('Enable Discord Integration')
                            ->default(false),

                        TextInput::make('guild_id')
                            ->label('Discord Guild ID')
                            ->maxLength(50),

                        TextInput::make('bot_token')
                            ->label('Bot Token')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        Toggle::make('ssl_verify')
                            ->label('Verify SSL Certificates')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }
}
