<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\TwitchService;
use App\Services\DiscordBotService;
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

    public function handle()
    {
        $streamer = 'crimsonstrife'; // Change this to dynamic values later
        $streamData = $this->twitchService->getStreamStatus($streamer);

        if ($streamData) {
            $category = $streamData['game_name'] ?? 'Unknown Game';
            $title = $streamData['title'];

            // Get last known status
            $lastStatus = Cache::get("stream_status_$streamer");

            if (!$lastStatus) {
                $roleId = $this->getRoleForCategory($category);
                $message = "**$streamer is now live!**\n🎮 Playing: $category\n📌 $title\n🔴 Watch now: https://twitch.tv/$streamer";

                $this->discordBotService->sendMessage($message, $roleId);

                Cache::put("stream_status_$streamer", true, now()->addMinutes(10));
            }
        } else {
            Cache::forget("stream_status_$streamer");
        }
    }

    private function getRoleForCategory($category)
    {
        $roles = [
            'Dark Souls' => '1234567890',  // Example role ID
            'Elden Ring' => '0987654321',
        ];

        return $roles[$category] ?? null;
    }
}
