<?php

namespace App\Console\Commands;

use App\Models\StreamAlertRule;
use App\Services\DiscordBotService;
use App\Services\TwitchService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Console\Command\Command as CommandAlias;

class CheckStreamAlerts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alerts:check-streams';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if any Twitch streams are live and trigger Discord alerts.';

    /**
     * Execute the console command.
     *
     * @throws ConnectionException
     */
    public function handle(TwitchService $twitch, DiscordBotService $discord): int
    {
        $rules = StreamAlertRule::all();
        $stream = $twitch->getStreamData(config('services.twitch.channel_name'));
        $username = config('services.twitch.channel_name');

        if (isset($rules)) {
            foreach ($rules as $rule) {
                if (! $stream || strtolower($stream[0]['type'] ?? '') !== 'live') {
                    continue;
                }

                $category = $stream['game_name'] ?? '';

                if (! preg_match('/'.$rule->category_pattern.'/i', $category)) {
                    continue;
                }

                $cacheKey = 'alert_sent_for_'.$username;
                if (Cache::has($cacheKey)) {
                    continue; // avoid duplicate alerts
                }

                $message = str_replace(
                    ['{streamer}', '{category}', '{url}'],
                    [$username, $category, 'https://twitch.tv/'.$username],
                    $rule->message_template
                );

                $discord->sendMessage(
                    $rule->discord_channel_id,
                    $message,
                    $rule->discord_roles ?? []
                );

                Cache::put($cacheKey, true, now()->addMinutes(10));

                Log::channel('twitch')->info("Alert sent for {$username}");
            }
        }

        return CommandAlias::SUCCESS;
    }
}
