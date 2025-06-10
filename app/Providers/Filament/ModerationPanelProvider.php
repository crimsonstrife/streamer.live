<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use App\Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Gerenuk\FilamentBanhammer\FilamentBanhammerPlugin;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Joaopaulolndev\FilamentEditProfile\FilamentEditProfilePlugin;
use TomatoPHP\FilamentMediaManager\FilamentMediaManagerPlugin;
use TomatoPHP\FilamentSettingsHub\FilamentSettingsHubPlugin;

class ModerationPanelProvider extends PanelProvider
{
    /**
     * @throws \Exception
     */
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('moderation')
            ->path('moderation')
            ->login()
            ->registration()
            ->passwordReset()
            ->emailVerification()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->viteTheme('resources/css/filament/moderation/theme.css')
            ->discoverResources(in: app_path('Filament/Moderation/Resources'), for: 'App\\Filament\\Moderation\\Resources')
            ->discoverPages(in: app_path('Filament/Moderation/Pages'), for: 'App\\Filament\\Moderation\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Moderation/Widgets'), for: 'App\\Filament\\Moderation\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters')
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                FilamentEditProfilePlugin::make()
                    ->shouldRegisterNavigation(false),
                FilamentMediaManagerPlugin::make(),
                FilamentSettingsHubPlugin::make()
                    ->allowSiteSettings()
                    ->allowSocialMenuSettings(),
                FilamentBanhammerPlugin::make(),
            ]);
    }
}
