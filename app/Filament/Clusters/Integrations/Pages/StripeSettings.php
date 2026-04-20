<?php

namespace App\Filament\Clusters\Integrations\Pages;

use App\Enums\Currency;
use App\Filament\Clusters\Integrations;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class StripeSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'fas-credit-card';

    protected static ?string $title = 'Stripe (Sponsor Donations)';

    protected static string $settings = \App\Settings\StripeSettings::class;

    protected static ?string $cluster = Integrations::class;

    public function form(Form $form): Form
    {
        $currencyOptions = collect(Currency::toArray())
            ->mapWithKeys(fn ($value) => [$value => $value])
            ->toArray();

        return $form
            ->schema([
                Section::make('Stripe Integration Settings')
                    ->description('Configure Stripe Checkout for Sponsor Goal donations. Use test keys (pk_test_… / sk_test_…) in non-production environments.')
                    ->schema([
                        Toggle::make('enable_integration')
                            ->label('Enable Stripe Integration')
                            ->helperText('When off, the /sponsor donation form is disabled and webhooks will be rejected.')
                            ->default(false)
                            ->columnSpanFull(),

                        TextInput::make('publishable_key')
                            ->label('Publishable Key')
                            ->helperText('Starts with pk_test_ (test) or pk_live_ (production).')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        TextInput::make('secret_key')
                            ->label('Secret Key')
                            ->helperText('Starts with sk_test_ or sk_live_. Stored encrypted.')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        TextInput::make('webhook_secret')
                            ->label('Webhook Signing Secret')
                            ->helperText('Starts with whsec_. Required to verify incoming webhook events.')
                            ->password()
                            ->revealable()
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Donation Amount Limits')
                    ->description('Guardrails enforced on the checkout form.')
                    ->schema([
                        Select::make('currency')
                            ->label('Currency')
                            ->options($currencyOptions)
                            ->default('USD')
                            ->required()
                            ->searchable(),

                        TextInput::make('min_donation')
                            ->label('Minimum donation')
                            ->numeric()
                            ->step(0.01)
                            ->minValue(0.5)
                            ->default(1)
                            ->prefix('$')
                            ->required(),

                        TextInput::make('max_donation')
                            ->label('Maximum donation')
                            ->numeric()
                            ->step(1)
                            ->default(10000)
                            ->prefix('$')
                            ->required(),
                    ])
                    ->columns(3),
            ]);
    }
}
