<?php

namespace App\Providers;

use App\Events\StreamerWentLive;
use App\Listeners\HandleStreamerWentLive;
use App\Listeners\LogUpdateFailed;
use App\Listeners\PublishStreamSocialPosts;
use Codedge\Updater\Events\UpdateFailed;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

final class EventServiceProvider extends ServiceProvider
{
    protected static $shouldDiscoverEvents = false;

    /** @var array<class-string, array<int, class-string>> */
    protected $listen = [
        StreamerWentLive::class => [
            HandleStreamerWentLive::class,      // Discord alerts
            PublishStreamSocialPosts::class,    // Social posts
        ],
        UpdateFailed::class => [
            LogUpdateFailed::class,
        ],
    ];
}
