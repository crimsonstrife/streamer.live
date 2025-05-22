<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Appearance;
use App\Settings\LookFeelSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ThemeSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-swatch';

    protected static string $settings = LookFeelSettings::class;

    protected static ?string $cluster = Appearance::class;

    protected static ?string $navigationGroup = 'Settings';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Look & Feel')
                    ->description('Customize colors, fonts, and theme appearance.')
                    ->schema([
                        Forms\Components\ColorPicker::make('primary_color')->label('Primary Color'),
                        Forms\Components\ColorPicker::make('secondary_color')->label('Secondary Color'),
                        Forms\Components\ColorPicker::make('accent_color')->label('Accent Color'),

                        Forms\Components\Select::make('font_family')
                            ->label('Font Family')
                            ->options([
                                'sans-serif' => 'Sans Serif',
                                'serif' => 'Serif',
                                'monospace' => 'Monospace',
                                'custom' => 'Custom (via CSS)',
                            ])
                            ->default('sans-serif'),

                        Forms\Components\Select::make('button_style')
                            ->label('Button Style')
                            ->options([
                                'rounded' => 'Rounded',
                                'outline' => 'Outline',
                                'pill' => 'Pill',
                                'flat' => 'Flat',
                            ])
                            ->default('rounded'),

                        Forms\Components\Select::make('theme')
                            ->label('Theme')
                            ->options([
                                'light' => 'Light',
                                'dark' => 'Dark',
                                'auto' => 'Auto (based on system)',
                            ])
                            ->default('auto'),
                    ]),
            ]);
    }
}
