<?php

namespace App\Listeners;

use App\Events\StreamerWentLive;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class HandleStreamerWentLive
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(StreamerWentLive $event): void
    {
        Log::channel('twitch')->info("{$event->username} just went live!");

        // Example: Dispatch Discord notification or any other logic
        // DiscordNotifier::send("{$event->username} is now live!");
    }
}
