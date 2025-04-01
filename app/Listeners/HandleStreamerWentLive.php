<?php

namespace App\Listeners;

use App\Events\StreamerWentLive;
use App\Services\DiscordBotService;
use Illuminate\Http\Client\ConnectionException;
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
     *
     * @throws ConnectionException
     */
    public function handle(StreamerWentLive $event): void
    {
        Log::channel('twitch')->info("{$event->username} just went live!");

        // Example: Dispatch Discord notification
        $discord = app(DiscordBotService::class);
        $discord->sendMessage("🔴 **{$event->username} is now live!** Come watch: https://twitch.tv/{$event->username}, This is a TEST from Streamer.live, the user may not be active.", $roleId = '1343623529555431505'); // TODO: Update to make Role ID dynamic
    }
}
