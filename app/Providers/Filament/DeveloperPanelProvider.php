<?php

namespace App\Providers\Filament;

use App\Filament\Widgets\AccountWidget;
use Exception;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;
use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use ShuvroRoy\FilamentSpatieLaravelHealth\FilamentSpatieLaravelHealthPlugin;
use Stephenjude\FilamentDebugger\DebuggerPlugin;

class DeveloperPanelProvider extends PanelProvider
{
    /**
     * @throws Exception
     */
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('developer')
            ->path('dev')
            ->authGuard('web')
            ->login()
            ->registration()
            ->passwordReset()
            ->emailVerification()
            ->colors([
                'primary' => Color::Blue,
            ])
            ->discoverResources(in: app_path('Filament/Developer/Resources'), for: 'App\\Filament\\Developer\\Resources')
            ->discoverPages(in: app_path('Filament/Developer/Pages'), for: 'App\\Filament\\Developer\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Developer/Widgets'), for: 'App\\Filament\\Developer\\Widgets')
            ->widgets([
                AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
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
                DebuggerPlugin::make(),
                FilamentSpatieLaravelHealthPlugin::make(),
            ]);
    }
}
