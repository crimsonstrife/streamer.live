<?php

namespace App\Console\Commands;

use App\Services\DiscordBotService;
use App\Services\TwitchService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;

class CheckTwitchStreams extends Command
{
    protected $signature = 'twitch:check';

    protected $description = 'Check Twitch stream status and notify Discord';

    public function __construct(
        protected TwitchService $twitchService,
        protected DiscordBotService $discordBotService
    ) {
        parent::__construct();
    }

    /**
     * @throws ConnectionException
     */
    public function handle(): void
    {
        $streamer = config('services.twitch.channel_name') ?? 'crimsonstrife';
        $streamData = $this->twitchService->getStreamData($streamer);

        if ($streamData) {
            $category = $streamData[0]['game_name'] ?? 'Unknown Game';
            $title = $streamData[0]['title'];

            // Get last known status
            $lastStatus = Cache::get("stream_status_$streamer");

            if (! $lastStatus) {
                $roleId = $this->getRoleForCategory($category);
                $message = "**$streamer is now live!**\n🎮 Playing: $category\n📌 $title\n🔴 Watch now: https://twitch.tv/$streamer";

                $this->discordBotService->sendMessage(config('discord.channel_id'), $message, $roleId);

                Cache::put("stream_status_$streamer", true, now()->addMinutes(10));
            }
        } else {
            Cache::forget("stream_status_$streamer");
        }
    }

    private function getRoleForCategory($category)
    {
        // TODO: Make this configurable
        $roles = [
            'Software and Game Development' => 'Dev Stream Ping',
        ];

        return $roles[$category] ?? null;
    }
}
