<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Appearance;
use App\Models\Font;
use App\Settings\LookFeelSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ThemeSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'fas-swatchbook';

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
                        Forms\Components\ColorPicker::make('font_color')->label('Default Font Color'),
                        Forms\Components\ColorPicker::make('font_alt_color')->label('Alternate Font Color'),
                        Forms\Components\Select::make('font_family')
                            ->label('Font Family')
                            ->options(fn () => [
                                    'system' => 'System UI',
                                ] + Font::pluck('name', 'slug')->toArray())
                            ->default('system')
                            ->searchable(),
//                        Forms\Components\Select::make('button_style')
//                            ->label('Button Style')
//                            ->options([
//                                'rounded' => 'Rounded',
//                                'outline' => 'Outline',
//                                'pill' => 'Pill',
//                                'flat' => 'Flat',
//                            ])
//                            ->default('rounded'),
                        Forms\Components\ColorPicker::make('disabled_color')->label('Disabled Item/Link Color'),
                        Forms\Components\ColorPicker::make('link_color')->label('Link Color'),
                        Forms\Components\ColorPicker::make('hover_color')->label('Hover Color'),
                        Forms\Components\ColorPicker::make('active_color')->label('Active Color'),
                        Forms\Components\ColorPicker::make('info_color')->label('Info Notice Color'),
                        Forms\Components\ColorPicker::make('success_color')->label('Success Notice Color'),
                        Forms\Components\ColorPicker::make('warning_color')->label('Warning Notice Color'),
                        Forms\Components\ColorPicker::make('error_color')->label('Error Notice Color'),

                        Forms\Components\Select::make('mode')
                            ->label('Theme')
                            ->options([
                                'light' => 'Light',
                                'dark' => 'Dark',
                                'auto' => 'Auto (based on system)',
                            ])
                            ->default('light'),
                    ]),
            ]);
    }
}
