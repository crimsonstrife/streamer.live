<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\CookiesServiceProvider::class,
    App\Providers\EventServiceProvider::class,
    App\Providers\Filament\AdminPanelProvider::class,
    App\Providers\Filament\DeveloperPanelProvider::class,
    App\Providers\Filament\ModerationPanelProvider::class,
    App\Providers\FortifyServiceProvider::class,
    App\Providers\HorizonServiceProvider::class,
    App\Providers\JetstreamServiceProvider::class,
    App\Providers\OnboardingServiceProvider::class,
    App\Providers\PulseServiceProvider::class,
    App\Providers\TelescopeServiceProvider::class,
    Froiden\LaravelInstaller\Providers\LaravelInstallerServiceProvider::class,
    Spatie\EloquentSortable\EloquentSortableServiceProvider::class,
    Xetaio\Mentions\Providers\MentionServiceProvider::class,
    nickurt\Akismet\ServiceProvider::class,
    nickurt\StopForumSpam\ServiceProvider::class,
];
