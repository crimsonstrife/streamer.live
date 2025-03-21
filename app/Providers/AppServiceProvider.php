<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\FilamentManager;
use Spatie\Health\Facades\Health;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
use App\Filament\Resources\PostResource;
use Stephenjude\FilamentBlog\Resources\PostResource as PackagePostResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->isLocal()) {
            // Register additional local services
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Health::checks([
            OptimizedAppCheck::new(),
            DebugModeCheck::new(),
            EnvironmentCheck::new(),
        ]);

        app(FilamentManager::class)->getPanel('admin')->resources(
            array_filter(
                app(FilamentManager::class)->getPanel('admin')->getResources(),
                fn ($resource) => $resource !== PackagePostResource::class
            )
        );

        // Register our custom resource
        app(FilamentManager::class)->getPanel('admin')->resources([
            PostResource::class,
        ]);
    }
}
