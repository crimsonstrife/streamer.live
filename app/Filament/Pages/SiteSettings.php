<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Settings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class SiteSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'fas-gears';

    protected static ?string $navigationLabel = 'General Settings';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $cluster = Settings::class;

    protected static string $settings = \App\Settings\SiteSettings::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('site_name')->required()->default('Streamer.live'),
                Forms\Components\Toggle::make('site_enabled')->required()->default(true),
                Forms\Components\TextInput::make('site_tagline'),
                Forms\Components\ColorPicker::make('primary_color'),
                Forms\Components\FileUpload::make('site_logo')->directory('site'),
                Forms\Components\Toggle::make('show_site_name')
                    ->label('Display site name next to logo')
                    ->default(true),
            ]);
    }
}
