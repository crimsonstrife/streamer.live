<?php

namespace App\Providers;

use App\Filament\Resources\PostResource;
use App\Models\Comment;
use App\Observers\CommentObserver;
use App\Services\FourthwallService;
use App\Services\Spam\AkismetEvaluator;
use App\Services\Spam\BlacklistEvaluator;
use App\Services\Spam\StopForumSpamEvaluator;
use App\Services\Spam\UrlEvaluator;
use App\Services\SpamCheckService;
use App\Services\TwitchService;
use App\Settings\LookFeelSettings;
use App\Settings\SEOSettings;
use App\Settings\SiteSettings;
use App\Utilities\CartHelper;
use App\Utilities\ShopHelper;
use App\Utilities\StreamHelper;
use App\View\Helpers\ViewHelpers;
use Exception;
use Filament\FilamentManager;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Facades\Health;
use Stephenjude\FilamentBlog\Resources\PostResource as PackagePostResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Skip entirely when running in the console (i.e. Artisan commands)
        if ($this->app->runningInConsole()) {
            return;
        }

        // Double-check that the table exists
        if (! Schema::hasTable('settings')) {
            return;
        }

        if ($this->app->isLocal()) {
            // Register additional local services
        }

        $this->app->singleton(CartHelper::class, function ($app) {
            return new CartHelper($app->make(FourthwallService::class));
        });

        $this->app->singleton(StreamHelper::class, function ($app) {
            return new StreamHelper($app->make(TwitchService::class));
        });

        $this->app->singleton(SpamCheckService::class, function ($app) {
            return new SpamCheckService(
                $app->tagged('spam.evaluator')
            );
        });

        $this->app->tag(
            [
                AkismetEvaluator::class,
                StopForumSpamEvaluator::class,
                BlacklistEvaluator::class,
                UrlEvaluator::class,
            ],
            'spam.evaluator'
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @throws Exception
     */
    public function boot(): void
    {
        // Skip entirely when running in the console (i.e. Artisan commands)
        if ($this->app->runningInConsole()) {
            return;
        }

        // Double-check that the table exists
        if (! Schema::hasTable('settings')) {
            return;
        }

        Comment::observe(CommentObserver::class);

        View::composer('*', function ($view) {
            $view->with('siteSettings', app(SiteSettings::class))
                ->with('seoSettings', app(SEOSettings::class))
                ->with('themeSettings', app(LookFeelSettings::class));
        });

        Blade::if('filament', function () {
            return ViewHelpers::isFilament();
        });

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

        if (Schema::hasTable('pages')) {
            view()->share('shopSlug', ShopHelper::getShopSlug());
        }
    }
}
