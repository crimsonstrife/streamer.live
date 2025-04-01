<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscordBotService
{
    protected bool $enabled;

    protected string $baseUrl = 'https://discord.com/api/v10';

    public function __construct()
    {
        $this->enabled = config('discord.enabled', false);
    }

    /**
     * @throws ConnectionException
     */
    public function sendMessage(string $channelId, string $message, array $roleIds = []): void
    {
        if (! $this->enabled || empty(config('discord.token'))) {
            Log::warning('Discord bot disabled or missing token');

            return;
        }

        $mentions = collect($roleIds)
            ->map(fn ($id) => "<@&$id>")
            ->implode(' ');

        $payload = [
            'content' => trim($mentions.' '.$message),
        ];

        $response = Http::withOptions(['verify' => config('discord.verify', true)])
            ->withToken(config('discord.token'), 'Bot')
            ->post("{$this->baseUrl}/channels/{$channelId}/messages", $payload);

        if ($response->failed()) {
            Log::error('Failed to send Discord message: '.$response->body());
        }
    }

    public function getChannelList(): array
    {
        $guildId = config('discord.guild_id');

        $response = Http::withOptions(['verify' => config('discord.verify', true)])
            ->withToken(config('discord.token'), 'Bot')
            ->get("{$this->baseUrl}/guilds/{$guildId}/channels");

        if ($response->failed()) {
            Log::error('Failed to fetch Discord channels: '.$response->body());

            return [];
        }

        return collect($response->json())
            ->where('type', [0, 5]) // text and announcement channels only
            ->pluck('name', 'id')
            ->toArray();
    }

    public function getRoleList(): array
    {
        $guildId = config('discord.guild_id');

        $response = Http::withOptions(['verify' => config('discord.verify', true)])
            ->withToken(config('discord.token'), 'Bot')
            ->get("{$this->baseUrl}/guilds/{$guildId}/roles");

        if ($response->failed()) {
            Log::error('Failed to fetch Discord roles: '.$response->body());

            return [];
        }

        return collect($response->json())
            ->pluck('name', 'id')
            ->toArray();
    }

    public function getChannelNameById(string $id): ?string
    {
        return collect($this->getChannelList())->get($id);
    }

    public function getRoleNameById(string $id): ?string
    {
        return collect($this->getRoleList())->get($id);
    }
}
