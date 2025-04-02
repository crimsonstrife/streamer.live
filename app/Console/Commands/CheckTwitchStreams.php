<?php

namespace App\Console\Commands;

use App\Models\StreamAlertRule;
use App\Services\DiscordBotService;
use App\Services\TwitchService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

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
    public function handle(TwitchService $twitchService, DiscordBotService $discordBotService): void
    {
        $rules = StreamAlertRule::all();
        $streamer = config('services.twitch.channel_name');
        $streamData = $twitchService->getStreamData($streamer);

        if ($streamData) {
            $category = $streamData[0]['game_name'] ?? 'Unknown Game';
            $title = $streamData[0]['title'];
            $streamID = $streamData[0]['id'];

            // Get last known status
            $lastStatus = Cache::get("stream_status_$streamer");
            $lastStreamID = Cache::get("stream_id_$streamer");

            if ($lastStreamID !== $streamID) {
                foreach ($rules as $rule) {
                    if (strtolower($streamData[0]['type'] ?? '') !== 'live') {
                        continue;
                    }

                    if (! preg_match($rule->category_pattern, $category)) {
                        continue;
                    }

                    $message = str_replace(['{streamer}', '{category}', '{url}'], [$streamer, $category, 'https://twitch.tv/'.$streamer], $rule->message_template);

                    $discordBotService->sendMessage($rule->discord_channel_id, $message, $rule->discord_roles ?? []);

                    Log::channel('twitch')->info("Alert sent for {$streamer} [Stream ID: {$streamID}]");
                }

                // Store the stream ID to prevent duplicate announcements
                Cache::put("stream_id_$streamer", $streamID, now()->addHours(6));
            }

            if ($lastStatus !== $streamData[0]['type']) {
                // Store the stream status
                Cache::put("stream_status_$streamer", $streamData[0]['type'] ?? 'offline', now()->addMinutes(5));
            }
        } else {
            Cache::forget("stream_id_$streamer");
            Cache::forget("stream_status_$streamer");
        }
    }
}
