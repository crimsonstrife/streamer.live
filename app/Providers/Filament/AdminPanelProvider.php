<?php

namespace App\Providers\Filament;

use App\Listeners\SwitchTeam;
use App\Livewire\CurrentStreamStatus;
use App\Livewire\PanelCalendarWidget;
use App\Livewire\RecentFollowers;
use App\Livewire\UpcomingStream;
use App\Plugins\BanPlugin;
use App\Plugins\BlogPlugin;
use App\Plugins\MenusPlugin;
use App\Plugins\ShortUrlPlugin;
use App\Utilities\BlogHelper;
use Brickx\MaintenanceSwitch\MaintenanceSwitchPlugin;
use Exception;
use Filament\Events\TenantSet;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\MenuItem;
use App\Filament\Pages;
use App\Filament\Resources;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\SpatieLaravelTranslatablePlugin;
use Filament\Support\Assets\Css;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Filament\Widgets;
use Guava\Tutorials\TutorialsPlugin;
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
use TomatoPHP\FilamentSeo\FilamentSeoPlugin;
use Z3d0X\FilamentFabricator\FilamentFabricatorPlugin;

class AdminPanelProvider extends PanelProvider
{
    /**
     * Boot the panel provider.
     */
    public function boot(): void
    {
        // Register the icon overrides for the Filament admin panel.
        FilamentIcon::register([
            'panels::global-search.field' => 'fas-magnifying-glass',
            'panels::global-search.clear' => 'fas-circle-xmark',
            'panels::pages.dashboard.actions.filter' => 'fas-filter',
            'panels::pages.dashboard.actions.sort' => 'fas-sort',
            'panels::pages.dashboard.actions.view' => 'fas-eye',
            'panels::pages.dashboard.filters.clear' => 'fas-times',
            'panels::pages.dashboard.filters.apply' => 'fas-check',
            'panels::user-menu.profile-item' => 'fas-circle-user',
            'panels::user-menu.account-item' => 'fas-user-gear',
            'panels::user-menu.logout-button' => 'fas-right-to-bracket',
            'panels::sidebar.group.collapse-button' => 'fas-angle-up',
            'forms::components.checkbox-list.search-field' => 'fas-magnifying-glass',
            'tables::search-field' => 'fas-magnifying-glass',
            'tables::actions.view' => 'fas-eye',
            'tables::actions.filter' => 'fas-filter',
            'tables::actions.sort' => 'fas-sort',
            'tables::header-cell.sort-asc-button' => 'fas-sort-up',
            'tables::header-cell.sort-desc-button' => 'fas-sort-down',
            'tables::columns.icon-column.false' => 'fas-circle-xmark',
            'tables::columns.icon-column.true' => 'fas-circle-check',
            'notifications::notification.danger' => 'fas-triangle-exclamation',
            'notifications::notification.info' => 'fas-circle-info',
            'notifications::notification.success' => 'fas-circle-check',
            'notifications::notification.warning' => 'fas-circle-exclamation',
            'notifications::notification.close-button' => 'fas-circle-xmark',
        ]);

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
            ->resources([
                Resources\UserResource::class,
                Resources\RoleResource::class,
                Resources\ProductResource::class,
                Resources\ProductCategoryResource::class,
                Resources\ProductCollectionResource::class,
                Resources\OrderResource::class,
                Resources\CommentResource::class,
                Resources\HeroResource::class,
                Resources\MediaResource::class,
                Resources\StreamAlertRuleResource::class,
            ])
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
                CurrentStreamStatus::class,
                UpcomingStream::class,
                RecentFollowers::class,
                PanelCalendarWidget::class,
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
                ShortUrlPlugin::make(),
                FilamentFabricatorPlugin::make(),
                BlogPlugin::make(),
                FilamentEditProfilePlugin::make()
                    ->shouldRegisterNavigation(false),
                MaintenanceSwitchPlugin::make(),
                SpatieLaravelTranslatablePlugin::make()->defaultLocales(['en']),
                MenusPlugin::make(),
                BanPlugin::make(),
                FilamentSeoPlugin::make()
                    ->allowAutoPostsIndexing()
                    ->postUrl(BlogHelper::getBlogSlug())
                    ->postSlug('slug'),
                TutorialsPlugin::make(),
            ]);

        return $panel;
    }
}
