<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Settings;
use App\Settings\SiteSettings as GeneralSiteSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class SiteSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Site Settings';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $cluster = Settings::class;

    protected static string $settings = GeneralSiteSettings::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('site_name')->required()->default('Streamer.live'),
                Forms\Components\Toggle::make('site_enabled')->required()->default(true),
                Forms\Components\TextInput::make('site_tagline'),
                Forms\Components\ColorPicker::make('primary_color'),
                Forms\Components\FileUpload::make('site_logo')->directory('site'),
            ]);
    }
}
