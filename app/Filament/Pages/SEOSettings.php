<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Settings;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\SettingsPage;
use TomatoPHP\FilamentSeo\Jobs\GoogleIndexURLJob;

class SEOSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'fas-magnifying-glass';

    protected static ?string $navigationLabel = 'SEO Settings';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $cluster = Settings::class;

    protected static string $settings = \App\Settings\SEOSettings::class;

    protected static ?string $slug = 'seo-settings';

    public function getTitle(): string
    {
        return trans('filament-seo::messages.title');
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('googleIndex')
                ->visible(fn () => filament('filament-seo')::$useGoogleIndexing)
                ->requiresConfirmation()
                ->icon('heroicon-o-magnifying-glass-circle')
                ->label(trans('filament-seo::messages.indexing.label'))
                ->form([
                    TextInput::make('url')
                        ->label(trans('filament-seo::messages.indexing.url'))
                        ->required()
                        ->url(),
                ])
                ->action(function (array $data) {
                    dispatch(new GoogleIndexURLJob($data['url']));

                    Notification::make()
                        ->title(trans('filament-seo::messages.indexing.title'))
                        ->body(trans('filament-seo::messages.indexing.body'))
                        ->success()
                        ->send();
                }),
        ];
    }

    protected function getFormSchema(): array
    {
        return [
            Section::make('General Meta Settings')
                ->schema([
                    TextInput::make('meta_title')
                        ->required()
                        ->placeholder(config('app.name', 'Streamer.live'))
                        ->default(config('app.name', 'Streamer.live')),
                    TextArea::make('meta_description'),
                ]),

            Section::make(trans('filament-seo::messages.google_analytics.title'))
                ->description(trans('filament-seo::messages.google_analytics.description'))
                ->schema([
                    Toggle::make('seo_use_google_analytics')
                        ->live()
                        ->label(trans('filament-seo::messages.google_analytics.form.use_google_analytics')),
                    TextInput::make('seo_google_analytics')
                        ->required()
                        ->visible(fn (Forms\Get $get) => $get('seo_use_google_analytics'))
                        ->label(trans('filament-seo::messages.google_analytics.form.use_google_analytics'))
                        ->placeholder('G-XXXXX'),
                ]),

            Section::make(trans('filament-seo::messages.google_tag_manager.title'))
                ->description(trans('filament-seo::messages.google_tag_manager.description'))
                ->schema([
                    Toggle::make('seo_use_google_tags_manager')
                        ->live()
                        ->label(trans('filament-seo::messages.google_tag_manager.form.seo_use_google_tags_manager')),
                    TextInput::make('seo_google_tags_manager')
                        ->required()
                        ->visible(fn (Forms\Get $get) => $get('seo_use_google_tags_manager'))
                        ->label(trans('filament-seo::messages.google_tag_manager.form.seo_use_google_tags_manager'))
                        ->placeholder('GTM-XXXXX'),
                ]),

            Section::make(trans('filament-seo::messages.google_search_console.title'))
                ->description(trans('filament-seo::messages.google_search_console.description'))
                ->schema([
                    Toggle::make('seo_use_google_search_console')
                        ->live()
                        ->label(trans('filament-seo::messages.google_search_console.form.seo_use_google_search_console')),
                    TextInput::make('seo_google_search_console_verification')
                        ->required()
                        ->visible(fn (Forms\Get $get) => $get('seo_use_google_search_console'))
                        ->label(trans('filament-seo::messages.google_search_console.form.seo_google_search_console_verification'))
                        ->placeholder('XXXXX'),
                ]),

            Section::make(trans('filament-seo::messages.axeptio.title'))
                ->headerActions([
                    Forms\Components\Actions\Action::make('Axeptio')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->url('https://www.axept.io/')
                        ->openUrlInNewTab()
                        ->label(trans('filament-seo::messages.axeptio.title')),
                ])
                ->description(trans('filament-seo::messages.axeptio.description'))
                ->schema([
                    Toggle::make('seo_use_axeptio')
                        ->live()
                        ->label(trans('filament-seo::messages.axeptio.form.seo_use_axeptio')),
                    TextInput::make('seo_axeptio_client_id')
                        ->visible(fn (Forms\Get $get) => $get('seo_use_axeptio'))
                        ->label(trans('filament-seo::messages.axeptio.form.seo_axeptio_client_id'))
                        ->required()
                        ->placeholder('XXXXX'),
                    TextInput::make('seo_axeptio_cookies_version')
                        ->visible(fn (Forms\Get $get) => $get('seo_use_axeptio'))
                        ->label(trans('filament-seo::messages.axeptio.form.seo_axeptio_cookies_version'))
                        ->required()
                        ->placeholder('XXXX-en-EU'),
                ]),
        ];
    }
}
