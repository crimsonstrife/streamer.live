<?php

namespace App\Providers;

use App\Filament\Resources\PostResource;
use App\Http\Livewire\Profile\UpdateProfileInformationForm as AppUpdateProfile;
use App\Models\BlogObjects\Comment;
use App\Models\SecurityObjects\IPFilter;
use App\Observers\CommentObserver;
use App\Services\CustomMediaPathGenerator;
use App\Services\FourthwallService;
use App\Services\SecureGuestModeService;
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
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\Twitch\Provider;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Facades\Health;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;
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

        app()->bind(PathGenerator::class, CustomMediaPathGenerator::class);

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

        $this->app->singleton('secure-guest-mode', fn ($app) => new SecureGuestModeService);

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

        Cache::remember('ip_filter:blacklist', 3600, function () {
            return IPFilter::where('type', 'blacklist')
                ->pluck('ip_address')
                ->all();
        });

        Cache::remember('ip_filter:whitelist', 3600, function () {
            return IPFilter::where('type', 'whitelist')
                ->pluck('ip_address')
                ->all();
        });

        Event::listen(function (SocialiteWasCalled $event) {
            $event->extendSocialite('twitch', Provider::class);
        });

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

        // this will override the alias Jetstream registered
        Livewire::component(
            'profile.update-profile-information-form',
            AppUpdateProfile::class
        );
    }
}
