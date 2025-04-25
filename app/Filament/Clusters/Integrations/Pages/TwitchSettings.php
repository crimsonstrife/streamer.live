<?php

namespace App\Filament\Clusters\Integrations\Pages;

use App\Filament\Clusters\Integrations;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class TwitchSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = \App\Settings\TwitchSettings::class;

    protected static ?string $cluster = Integrations::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Twitch Integration Settings')
                    ->description('Configure Twitch API integration for your application.')
                    ->schema([
                        Toggle::make('enable_integration')
                            ->label('Enable Twitch Integration')
                            ->default(false),

                        TextInput::make('channel_name')
                            ->label('Twitch Channel Name')
                            ->placeholder('e.g. Twitch Username')
                            ->maxLength(100),

                        TextInput::make('client_id')
                            ->label('Client ID')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        TextInput::make('client_secret')
                            ->label('Client Secret')
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
