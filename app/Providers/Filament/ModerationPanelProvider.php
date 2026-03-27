<?php

namespace App\Providers\Filament;

use App\Filament\Pages;
use App\Filament\Resources;
use App\Filament\Widgets\AccountWidget;
use App\Plugins\BanPlugin;
use Exception;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Guava\Tutorials\TutorialsPlugin;
use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Joaopaulolndev\FilamentEditProfile\FilamentEditProfilePlugin;

class ModerationPanelProvider extends PanelProvider
{
    /**
     * @throws Exception
     */
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('moderation')
            ->path('moderation')
            ->authGuard('web')
            ->login()
            ->registration()
            ->passwordReset()
            ->emailVerification()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->viteTheme('resources/css/filament/moderation/theme.css')
            ->discoverResources(in: app_path('Filament/Moderation/Resources'), for: 'App\\Filament\\Moderation\\Resources')
            ->resources([
                Resources\UserResource::class,
                Resources\RoleResource::class,
                Resources\CommentResource::class,
                Resources\TicketResource::class,
            ])
            ->discoverPages(in: app_path('Filament/Moderation/Pages'), for: 'App\\Filament\\Moderation\\Pages')
            ->pages([
                Pages\Dashboard::class,
                Pages\EditProfile::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Moderation/Widgets'), for: 'App\\Filament\\Moderation\\Widgets')
            ->widgets([
                AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters')
            ->middleware([
                'web',
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ], isPersistent: true)
            ->authMiddleware([
                FilamentAuthenticate::class,
                EnsureEmailIsVerified::class,
            ], isPersistent: true)
            ->plugins([
                FilamentEditProfilePlugin::make()
                    ->shouldRegisterNavigation(false),
                BanPlugin::make(),
                TutorialsPlugin::make(),
            ]);
    }
}
