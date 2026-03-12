<?php

namespace App\Services;

use App\Settings\DiscordSettings;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Class DiscordBotService
 *
 * Service class to handle interactions with the Discord API.
 */
class DiscordBotService
{
    /**
     * @var bool Indicates whether the Discord integration is enabled.
     */
    public bool $enabled;

    /**
     * @var string The base URL for the Discord API.
     */
    protected string $baseUrl = 'https://discord.com/api/v10';

    /**
     * @var string|null The API token for authenticating with the Discord API.
     */
    protected ?string $apiToken;

    /**
     * @var string|null The ID of the Discord guild (server).
     */
    protected ?string $guild_id;

    /**
     * @var bool Indicates whether SSL verification is enabled for API requests.
     */
    protected bool $verify_ssl = true;

    /**
     * DiscordBotService constructor.
     * Initializes the service with configuration values.
     */
    public function __construct()
    {
        // Read the config first, then allow the Filament setting to override it if it's true
        $configEnabled = config('discord.enabled', false);
        $settingEnabled = app(DiscordSettings::class)->enable_integration;
        $configApiToken = config('discord.token');
        $settingApiToken = app(DiscordSettings::class)->bot_token;
        $configGuildID = config('discord.guild_id');
        $settingGuildID = app(DiscordSettings::class)->guild_id;
        $configSSLVerify = config('discord.verify');
        $settingSSLVerify = app(DiscordSettings::class)->ssl_verify;

        // Fallback to config only if the setting is false
        $this->enabled = $settingEnabled ?? $configEnabled;
        $this->apiToken = $settingApiToken ?? $configApiToken;
        $this->guild_id = $settingGuildID ?? $configGuildID;
        $this->verify_ssl = $settingSSLVerify ?? $configSSLVerify;
    }

    /**
     * Sends a message to a specified Discord channel.
     *
     * @param  string  $channelId  The ID of the Discord channel to send the message to.
     * @param  string  $message  The message content to send.
     * @param  array  $roleIds  An array of role IDs to mention in the message.
     *
     * @throws ConnectionException If the API request fails.
     */
    public function sendMessage(string $channelId, string $message, array $roleIds = []): void
    {
        if (! $this->enabled || $this->apiToken === null) {
            Log::warning('Discord bot disabled or missing token');

            return;
        }

        $mentions = collect($roleIds)
            ->map(fn ($id) => "<@&$id>")
            ->implode(' ');

        $payload = [
            'content' => trim($mentions.' '.$message),
        ];

        $response = Http::withOptions(['verify' => $this->verify_ssl])
            ->withToken($this->apiToken, 'Bot')
            ->post("{$this->baseUrl}/channels/{$channelId}/messages", $payload);

        if ($response->failed()) {
            Log::error('Failed to send Discord message: '.$response->body());
        }
    }

    /**
     * Retrieves a list of channels in the Discord guild.
     *
     * @return array An associative array of channel IDs and names.
     */
    public function getChannelList(): array
    {
        return Cache::remember('discord_channel_list', now()->addMinutes(15), function () {
            $guildId = $this->guild_id;

            $response = Http::withOptions(['verify' => $this->verify_ssl])
                ->withToken($this->apiToken, 'Bot')
                ->get("{$this->baseUrl}/guilds/{$guildId}/channels");

            if ($response->failed()) {
                Log::error('Failed to fetch Discord channels: '.$response->body());

                return [];
            }

            return collect($response->json())
                ->whereIn('type', [0, 5]) // text and announcement channels only
                ->pluck('name', 'id')
                ->toArray();
        });
    }

    /**
     * Retrieves a list of roles in the Discord guild.
     *
     * @return array An associative array of role IDs and names.
     */
    public function getRoleList(): array
    {
        return Cache::remember('discord_role_list', now()->addMinutes(15), function () {
            $guildId = $this->guild_id;

            $response = Http::withOptions(['verify' => $this->verify_ssl])
                ->withToken($this->apiToken, 'Bot')
                ->get("{$this->baseUrl}/guilds/{$guildId}/roles");

            if ($response->failed()) {
                Log::error('Failed to fetch Discord roles: '.$response->body());

                return [];
            }

            return collect($response->json())
                ->pluck('name', 'id')
                ->toArray();
        });
    }

    /**
     * Retrieves the name of a channel by its ID.
     *
     * @param  string  $id  The ID of the channel.
     * @return string|null The name of the channel, or null if not found.
     */
    public function getChannelNameById(string $id): ?string
    {
        return collect($this->getChannelList())->get($id);
    }

    /**
     * Retrieves the name of a role by its ID.
     *
     * @param  string  $id  The ID of the role.
     * @return string|null The name of the role, or null if not found.
     */
    public function getRoleNameById(string $id): ?string
    {
        return collect($this->getRoleList())->get($id);
    }

    /**
     * Expose the configured guild ID.
     */
    public function getGuildId(): ?string
    {
        return $this->guild_id;
    }

    /**
     * Fetch & cache the Discord widget.json for your guild.
     *
     * @return array|null
     */
    public function getGuildWidget(): ?array
    {
        $guildId = $this->getGuildId();
        if (! $guildId) {
            return null;
        }

        $cacheKey = "discord.widget.{$guildId}";

        return Cache::remember($cacheKey, now()->addMinutes(15), function () use ($guildId) {
            try {
                return Http::withOptions(['verify' => $this->verify_ssl])
                    ->withToken($this->apiToken, 'Bot')
                    ->get("{$this->baseUrl}/guilds/{$guildId}/widget.json")
                    ->throw()
                    ->json();
            } catch (Throwable $e) {
                Log::error("DiscordBotService::getGuildWidget failed for guild {$guildId}", [
                    'error' => $e->getMessage(),
                ]);
                return null;
            }
        });
    }
}
