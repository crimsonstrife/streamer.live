<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\Filament\AppPanelProvider::class,
    App\Providers\Filament\ModerationPanelProvider::class,
    App\Providers\FortifyServiceProvider::class,
    App\Providers\HorizonServiceProvider::class,
    App\Providers\JetstreamServiceProvider::class,
    App\Providers\TelescopeServiceProvider::class,
    Spatie\EloquentSortable\EloquentSortableServiceProvider::class,
    nickurt\Akismet\ServiceProvider::class,
    nickurt\StopForumSpam\ServiceProvider::class,
];
