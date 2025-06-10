<?php

namespace App\Providers\Filament;

use A21ns1g4ts\FilamentShortUrl\FilamentShortUrlPlugin;
use App\Listeners\SwitchTeam;
use App\Plugins\BlogPlugin;
use Brickx\MaintenanceSwitch\MaintenanceSwitchPlugin;
use Exception;
use Filament\Events\TenantSet;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\MenuItem;
use App\Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\SpatieLaravelTranslatablePlugin;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Gerenuk\FilamentBanhammer\FilamentBanhammerPlugin;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Event;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Joaopaulolndev\FilamentEditProfile\FilamentEditProfilePlugin;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;
use TomatoPHP\FilamentMediaManager\FilamentMediaManagerPlugin;
use TomatoPHP\FilamentMenus\FilamentMenusPlugin;
use TomatoPHP\FilamentSeo\FilamentSeoPlugin;
use Z3d0X\FilamentFabricator\FilamentFabricatorPlugin;

class AdminPanelProvider extends PanelProvider
{
    /**
     * @throws Exception
     */
    public function panel(Panel $panel): Panel
    {
        $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->registration()
            ->passwordReset()
            ->emailVerification()
            ->viteTheme('resources/css/filament/admin/theme.css')
            ->colors([
                'primary' => Color::Gray,
            ])
            ->discoverResources(in: app_path('Filament/Admin/Resources'), for: 'App\\Filament\\Admin\\Resources')
            ->discoverPages(in: app_path('Filament/Admin/Pages'), for: 'App\\Filament\\Admin\\Pages')
            ->pages([
                Pages\Dashboard::class,
                Pages\ApiTokens::class,
                Pages\EditProfile::class,
                Pages\SEOSettings::class,
                Pages\SiteSettings::class,
                Pages\SocialSettings::class,
                Pages\ThemeSettings::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Admin/Widgets'), for: 'App\\Filament\\Admin\\Widgets')
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
                FilamentShortUrlPlugin::make(),
                FilamentFabricatorPlugin::make(),
                BlogPlugin::make(),
                FilamentEditProfilePlugin::make()
                    ->shouldRegisterNavigation(false),
                MaintenanceSwitchPlugin::make(),
                SpatieLaravelTranslatablePlugin::make()->defaultLocales(['en']),
                FilamentMenusPlugin::make(),
                FilamentMediaManagerPlugin::make(),
                FilamentBanhammerPlugin::make(),
                FilamentSeoPlugin::make(),
            ]);

        return $panel;
    }

    public function boot(): void
    {
        /**
         * Disable Fortify routes
         */
        Fortify::$registersRoutes = true;

        /**
         * Disable Jetstream routes
         */
        Jetstream::$registersRoutes = true;

        /**
         * Listen and switch team if tenant was changed
         */
        Event::listen(
            TenantSet::class,
            SwitchTeam::class,
        );
    }
}
