<?php

namespace App\Services;

use Discord\Discord;
use Discord\Exceptions\IntentException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscordBotService
{
    protected mixed $discord;

    protected bool $enabled;

    /**
     * @throws IntentException
     */
    public function __construct()
    {
        $this->enabled = config('discord.enabled', false);

        // If disabled, return early
        if (! $this->enabled || empty(config('discord.token')) || empty(config('discord.channel_id'))) {
            return;
        }

        $this->discord = new Discord([
            'token' => config('discord.token'),
        ]);
    }

    /**
     * @throws ConnectionException
     */
    public function sendMessage($message, $roleId = null, $channelId = null): void
    {
        if (! $this->enabled) {
            Log::warning('Attempted to send a message while Discord bot is disabled.');

            return;
        }

        if (empty($channelId)) {
            $channelId = config('discord.channel_id');

            if (empty($channelId)) {
                Log::error('Discord channel ID is not set. Cannot send message.');

                return;
            }
        }

        $mention = $roleId ? "<@&$roleId> " : '';

        Log::channel('twitch')->info("Sending Discord alert: {$message}");

        $response = Http::withOptions([
            'verify' => config('discord.verify'),
        ])
            ->withToken(config('discord.token'), 'Bot')
            ->post("https://discord.com/api/v10/channels/$channelId/messages", [
                'content' => $mention.$message,
            ]);

        if ($response->failed()) {
            Log::error('Failed to send Discord message: '.$response->body());
        }
    }
}
