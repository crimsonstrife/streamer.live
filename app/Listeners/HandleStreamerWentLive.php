<?php

namespace App\Listeners;

use App\Events\StreamerWentLive;
use App\Models\StreamAlertRule;
use App\Services\DiscordBotService;
use App\Settings\DiscordSettings;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class HandleStreamerWentLive
{
    public function handle(StreamerWentLive $event): void
    {
        Log::channel('twitch')->info("{$event->username} just went live!");

        $discordSettings = app(DiscordSettings::class);
        if (! $discordSettings->enable_integration) {
            return;
        }

        $stream = $event->streamData[0] ?? null;
        if (! is_array($stream) || strtolower($stream['type'] ?? '') !== 'live') {
            return;
        }

        $streamer  = strtolower($event->username);
        $streamId  = $stream['id'] ?? null;
        $category  = $stream['game_name'] ?? 'Unknown Game';
        $title     = $stream['title'] ?? '';
        $url       = "https://twitch.tv/{$streamer}";

        if (! $streamId) {
            return;
        }

        // Dedupe Discord alerts per stream
        if (! Cache::add("discord.alert.sent.{$streamer}.{$streamId}", true, now()->addHours(12))) {
            return;
        }

        $discord = app(DiscordBotService::class);

        $rules = StreamAlertRule::query()->where('enabled', true)->get();

        foreach ($rules as $rule) {
            if ($rule->category_pattern && @preg_match($rule->category_pattern, $category) !== 1) {
                continue;
            }

            $message = str_replace(
                ['{streamer}', '{category}', '{url}', '{title}'],
                [$streamer, $category, $url, $title],
                $rule->message_template
            );

            $discord->sendMessage($rule->discord_channel_id, $message, $rule->discord_roles ?? []);
        }
    }
}
