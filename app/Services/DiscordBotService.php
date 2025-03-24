<?php

namespace App\Services;

use Discord\Discord;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscordBotService
{
    protected $discord;
    protected $enabled;

    public function __construct()
    {
        $this->enabled = config('discord.enabled', false);

        // If disabled, return early
        if (!$this->enabled || empty(config('discord.token')) || empty(config('discord.channel_id'))) {
            return;
        }

        $this->discord = new Discord([
            'token' => config('discord.token'),
        ]);
    }

    public function sendMessage($message, $roleId = null)
    {
        if (!$this->enabled) {
            Log::warning('Attempted to send a message while Discord bot is disabled.');
            return;
        }

        $channelId = config('discord.channel_id');

        if (empty($channelId)) {
            Log::error('Discord channel ID is not set. Cannot send message.');
            return;
        }

        $mention = $roleId ? "<@&$roleId> " : '';

        $payload = [
            'content' => $mention . $message,
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bot ' . config('discord.token'),
            'Content-Type' => 'application/json',
        ])->post("https://discord.com/api/v10/channels/$channelId/messages", $payload);

        if ($response->failed()) {
            Log::error('Failed to send Discord message: ' . $response->body());
        }
    }
}
