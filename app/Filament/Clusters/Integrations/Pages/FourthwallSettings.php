<?php

namespace App\Filament\Clusters\Integrations\Pages;

use App\Filament\Clusters\Integrations;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class FourthwallSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = \App\Settings\FourthwallSettings::class;

    protected static ?string $cluster = Integrations::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Fourthwall Integration Settings')
                    ->description('Configure Fourthwall Store integration for your application.')
                    ->schema([
                        Toggle::make('enable_integration')
                            ->label('Enable Fourthwall Integration')
                            ->default(false),

                        TextInput::make('base_url')
                            ->label('The base URL for Fourthwall')
                            ->default('https://storefront-api.fourthwall.com')
                            ->helperText('You should not need to change this.')
                            ->placeholder('e.g. https://storefront-api.fourthwall.com')
                            ->maxLength(255),

                        TextInput::make('storefront_token')
                            ->label('Storefront API Token')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        TextInput::make('storefront_url')
                            ->label('Your storefront URL for Fourthwall')
                            ->default('https://storefront.fourthwall.com')
                            ->helperText('This should be set to the default store page for your shop, or a custom URL if you have set one on Fourthwall.')
                            ->placeholder('e.g. https://storefront.fourthwall.com')
                            ->maxLength(255),

                        TextInput::make('webhook_secret')
                            ->label('Webhook Secret')
                            ->helperText('Required to allow for order callbacks.')
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
