<?php

namespace App\Services;

use Discord\Discord;
use Discord\Parts\Channel\Message;
use Illuminate\Support\Facades\Http;

class DiscordBotService
{
    protected $discord;

    public function __construct()
    {
        $this->discord = new Discord([
            'token' => config('discord.token'),
        ]);
    }

    public function sendMessage($message, $roleId = null)
    {
        $channelId = config('discord.channel_id');

        $mention = $roleId ? "<@&$roleId> " : '';

        $payload = [
            'content' => $mention . $message,
        ];

        Http::withHeaders([
            'Authorization' => 'Bot ' . config('discord.token'),
            'Content-Type' => 'application/json',
        ])->post("https://discord.com/api/v10/channels/$channelId/messages", $payload);
    }
}
