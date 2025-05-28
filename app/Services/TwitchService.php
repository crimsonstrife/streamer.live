<?php

namespace App\Services;

use App\Models\Event;
use App\Settings\TwitchSettings;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Log;
use RuntimeException;
use Throwable;

class TwitchService
{
    protected bool $enabled;

    public ?string $channel_name;

    public ?string $client_id;

    public ?string $client_secret;

    private ?string $access_token;

    public bool $ssl_verify;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        // Read the config first, then allow the Filament setting to override it if it's true
        $configEnabled  = config('services.twitch.enabled');
        $settingEnabled = app(TwitchSettings::class)->enable_integration;
        $configChannelName = config('services.twitch.channel_name');
        $settingChannelName = app(TwitchSettings::class)->channel_name;
        $configClientID = config('services.twitch.client_id');
        $settingClientID = app(TwitchSettings::class)->client_id;
        $configClientSecret = config('services.twitch.client_secret');
        $settingClientSecret = app(TwitchSettings::class)->client_secret;
        $configSSLVerify = config('services.twitch.verify');
        $settingSSLVerify = app(TwitchSettings::class)->ssl_verify;

        // Fallback to config only if the setting is false
        $this->enabled = $settingEnabled ?? $configEnabled;
        $this->channel_name = $settingChannelName ?? $configChannelName;
        $this->client_id = $settingClientID ?? $configClientID;
        $this->client_secret = $settingClientSecret ?? $configClientSecret;
        $this->ssl_verify = $settingSSLVerify ?? $configSSLVerify;

        $this->authenticate();
    }

    /**
     * @throws ConnectionException
     * @throws Exception
     */
    private function authenticate(): void
    {
        // Check if Twitch credentials are configured
        if (empty($this->client_id) || empty($this->client_secret) || $this->client_id === 'your-client-id' || $this->client_secret === 'your-client-secret') {
            Log::warning('Twitch authentication skipped: Missing client ID or secret.');

            return; // Prevent further execution
        }

        if (empty($this->channel_name)) {
            Log::warning('Twitch authentication skipped: Missing channel or username.');

            return; // Prevent further execution
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])->post('https://id.twitch.tv/oauth2/token', [
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
            'grant_type' => 'client_credentials',
        ]);

        $json = $response->json();

        if (! isset($json['access_token'])) {
            throw new RuntimeException('Failed to retrieve Twitch access token: '.json_encode($json, JSON_THROW_ON_ERROR));
        }

        $this->access_token = $json['access_token'];
    }

    public function getStreamData($username = null)
    {
        if (empty($username)) {
            $username = $this->channel_name;
        }

        $username = strtolower(trim($username));

        Log::debug("TwitchService: Fetching stream data for user: {$username}");

        try {
            $response = Http::withOptions([
                'verify' => $this->ssl_verify,
            ])
                ->withHeaders([
                    'Client-ID' => $this->client_id,
                    'Authorization' => 'Bearer '.$this->access_token,
                ])
                ->get('https://api.twitch.tv/helix/streams', [
                    'user_login' => $username,
                ]);

            Log::debug("TwitchService: Response status: {$response->status()}");
            if (config('app.debug')) {
                Log::debug('TwitchService: Full response: ', $response->json());
            }

            $data = $response->json()['data'] ?? null;

            if (! $data) {
                Log::info("TwitchService: No stream data found for {$username}. Possibly offline.");
            }

            return $data;
        } catch (Throwable $e) {
            Log::error("TwitchService: Error fetching stream data for {$username}: ".$e->getMessage());

            return null;
        }
    }

    /**
     * Look up the numeric user ID for the configured channel_name.
     */
    private function getBroadcasterId(): ?string
    {
        if (! $this->enabled || ! $this->channel_name) {
            return null;
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])
            ->withHeaders([
                'Client-ID'    => $this->client_id,
                'Authorization' => 'Bearer '.$this->access_token,
            ])
            ->get('https://api.twitch.tv/helix/users', [
                'login' => $this->channel_name,
            ]);

        $user = $response->json('data.0');

        return $user['id'] ?? null;
    }

    /**
     * Fetch the channel’s scheduled segments via Helix.
     *
     * @param int $first Maximum number of segments to return.
     * @param Carbon|null $startTime Only segments starting on or after this timestamp.
     * @return array|null                    List of segments or null on error.
     * @throws ConnectionException
     */
    public function getChannelSchedule(int $first = 5, Carbon $startTime = null): ?array
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return null;
        }

        $query = ['broadcaster_id' => $broadcasterId, 'first' => $first];
        if ($startTime) {
            $query['start_time'] = $startTime->toIso8601String();
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])
            ->withHeaders([
                'Client-ID'    => $this->client_id,
                'Authorization' => 'Bearer '.$this->access_token,
            ])
            ->get('https://api.twitch.tv/helix/schedule', $query);

        return $response->json('data.segments') ?? null;
    }

    /**
     * Return the next scheduled segment (or null).
     * @throws ConnectionException
     */
    public function getNextScheduledStream(): ?array
    {
        $segments = $this->getChannelSchedule(1, Carbon::now());
        return $segments[0] ?? null;
    }

    /**
     * Return up to $limit upcoming streams.
     * @param int $limit Limit the maximum number of streams to request.
     * @throws ConnectionException
     */
    public function getUpcomingStreams(int $limit = 5): ?array
    {
        return $this->getChannelSchedule($limit, Carbon::now());
    }

    /**
     * Fetch up to $limit upcoming Twitch schedule segments and
     * sync them into the events table.
     *
     * @param int $limit
     * @return void
     * @throws ConnectionException
     */
    public function syncScheduleToEvents(int $limit = 10): void
    {
        Log::info('TwitchService::syncScheduleToEvents called, enabled=' . ($this->enabled ? 'yes' : 'no'));

        if (! $this->enabled) {
            Log::info(' → Integration disabled, aborting sync.');
            return;
        }

        $segments = $this->getUpcomingStreams($limit);

        if (empty($segments)) {
            Log::info('TwitchService: No upcoming Twitch segments found.');
            return;
        }

        foreach ($segments as $seg) {
            // Helix returns e.g. ['id'=>..., 'title'=>..., 'start_time'=>..., 'end_time'=>...]
            $event = Event::firstOrNew([
                'twitch_segment_id' => $seg['id'],
            ]);

            $event->title       = $seg['title'] ?? 'Twitch Event';
            $event->starts_at  = Carbon::parse($seg['start_time']);
            $event->ends_at    = isset($seg['end_time'])
                ? Carbon::parse($seg['end_time'])
                : $event->starts_at->addHours(1); // default 1h
            $event->save();
        }

        Log::info('TwitchService: Synced ' . count($segments) . ' Twitch segments to events.');
    }

    /**
     * Fetch the channel's profile info (includes created_at, view_count, etc.)
     */
    public function getUserProfile(): array
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return [];
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])
            ->withHeaders([
                'Client-ID'    => $this->client_id,
                'Authorization' => 'Bearer ' . $this->access_token,
            ])
            ->get('https://api.twitch.tv/helix/users', [
                'id' => $broadcasterId,
            ]);

        return $response->json('data.0') ?? [];
    }

    /**
     * Fetch total follower count for the channel
     * @throws ConnectionException
     */
    public function getFollowerCount(): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])
            ->withHeaders([
                'Client-ID'    => $this->client_id,
                'Authorization' => 'Bearer ' . $this->access_token,
            ])
            ->get('https://api.twitch.tv/helix/channels/followers', [
                'broadcaster_id' => $broadcasterId,
            ]);

        return $response->json('total') ?? 0;
    }

    /**
     * Fetch total subscriber count for the channel
     * @throws ConnectionException
     * @throws RequestException
     */
    public function getSubscriberCount(): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        $token = $this->getAuthToken('admin');

        $resp = Http::withHeaders([
            'Client-ID'    => $this->client_id,
            'Authorization' => "Bearer {$token}",
        ])->get('https://api.twitch.tv/helix/subscriptions', [
            'broadcaster_id' => $broadcasterId,
            'first'          => 1,
        ])->json();

        return $resp['total'] ?? 0;
    }

    /**
     * @throws RequestException
     * @throws ConnectionException
     */
    private function getAuthToken(?string $context = null): ?string
    {
        if ($context === 'admin') {
            return $this->getAdminAuthToken();
        }

        if ($context === 'user' && Auth::check()) {
            return Auth::user()->getTwitchToken();
        }

        // fallback to app‐token for public endpoints
        return $this->access_token;
    }

    /**
     * If we have a user token that’s expired (or about to), refresh it.
     * @throws RequestException
     * @throws ConnectionException
     */
    protected function refreshAdminUserTokenIfNeeded(): void
    {
        $settings = app(TwitchSettings::class);

        // if no user token at all, or it hasn’t expired, nothing to do
        if (! $settings->user_refresh_token || now()->lt($settings->user_token_expires)) {
            return;
        }

        $response = Http::asForm()->post('https://id.twitch.tv/oauth2/token', [
            'grant_type'    => 'refresh_token',
            'refresh_token' => $settings->user_refresh_token,
            'client_id'     => $this->client_id,
            'client_secret' => $this->client_secret,
        ]);

        $json = $response->throw()->json();

        if (! isset($json['access_token'], $json['refresh_token'], $json['expires_in'])) {
            throw new RuntimeException('Failed to refresh Twitch user token: '.json_encode($json));
        }

        $settings->user_access_token  = $json['access_token'];
        $settings->user_refresh_token = $json['refresh_token'];
        $settings->user_token_expires = now()->addSeconds($json['expires_in']);
        $settings->save();
    }

    /**
     * Grab the “admin” (streamer) token, refreshing if expired.
     * @throws RequestException
     * @throws ConnectionException
     */
    protected function getAdminAuthToken(): ?string
    {
        $this->refreshAdminUserTokenIfNeeded();
        return app(TwitchSettings::class)->user_access_token
            ?? $this->access_token;
    }
}
