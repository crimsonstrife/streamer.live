<?php

namespace App\Providers;

use App\Events\StreamerWentLive;
use App\Listeners\HandleStreamerWentLive;
use App\Listeners\PublishStreamSocialPosts;
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
    ];
}
