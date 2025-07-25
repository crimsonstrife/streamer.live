<?php

namespace App\Services;

use App\Models\Event;
use App\Models\TwitchMetric;
use App\Settings\TwitchSettings;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
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
        $configEnabled = config('services.twitch.enabled');
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
    }

    /**
     * @throws ConnectionException
     * @throws Exception
     */
    private function authenticate(): void
    {
        if (empty($this->client_id) || empty($this->client_secret)) {
            Log::warning('Twitch authentication skipped: Missing credentials.');

            return;
        }

        $cacheKey = 'twitch.client_credentials_token';

        // Attempt to get a valid token from cache...
        $this->access_token = Cache::get($cacheKey);

        if ($this->access_token) {
            return;
        }

        // Otherwise, fetch a fresh one
        try {
            $response = Http::withOptions(['verify' => $this->ssl_verify])
                ->timeout(10)              // fail after 10s
                ->retry(2, 100)            // optionally retry twice, 100ms apart
                ->post('https://id.twitch.tv/oauth2/token', [
                    'client_id' => $this->client_id,
                    'client_secret' => $this->client_secret,
                    'grant_type' => 'client_credentials',
                ])
                ->throw();                 // turn HTTP errors into exceptions

            $json = $response->json();

            if (! isset($json['access_token'], $json['expires_in'])) {
                throw new RuntimeException('Invalid Twitch token response: '.json_encode($json));
            }

            // Cache it a bit shorter than expires_in to avoid edge cases
            Cache::put($cacheKey, $json['access_token'], $json['expires_in'] - 60);

            $this->access_token = $json['access_token'];
        } catch (ConnectionException $e) {
            Log::error("TwitchService: Token request timed out or failed: {$e->getMessage()}");
            throw $e;
        }
    }

    /**
     * @throws ConnectionException
     */
    public function getStreamData($username = null)
    {
        $this->authenticate();

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

            return $response->json()['data'] ?? null;
        } catch (Throwable $e) {
            Log::error("TwitchService: Error fetching stream data for {$username}: ".$e->getMessage());

            return null;
        }
    }

    /**
     * Look up (and cache) the numeric user ID for the configured channel_name.
     *
     * @throws ConnectionException
     */
    private function getBroadcasterId(): ?string
    {
        if (! $this->enabled || ! $this->channel_name) {
            return null;
        }

        $cacheKey = "twitch.broadcaster_id.{$this->channel_name}";

        // Try cache first
        $broadcasterId = Cache::get($cacheKey);
        if ($broadcasterId) {
            return $broadcasterId;
        }

        // Make sure we have a valid token
        $this->authenticate();

        // Hit the Helix users endpoint with timeout & retries
        try {
            $response = Http::withOptions(['verify' => $this->ssl_verify])
                ->timeout(5)           // fail after 5s
                ->retry(2, 100)        // retry twice, 100ms backoff
                ->withHeaders([
                    'Client-ID' => $this->client_id,
                    'Authorization' => "Bearer {$this->access_token}",
                ])
                ->get('https://api.twitch.tv/helix/users', [
                    'login' => $this->channel_name,
                ])
                ->throw();

            $user = $response->json('data.0');
            $broadcasterId = $user['id'] ?? null;

            if (! $broadcasterId) {
                throw new RuntimeException("Twitch Helix returned no user data for '{$this->channel_name}'");
            }

            // Cache it for 24 hours (or adjust TTL if you prefer)
            Cache::put($cacheKey, $broadcasterId, now()->addHours(24));

            return $broadcasterId;
        } catch (ConnectionException|RequestException $e) {
            Log::error("TwitchService: getBroadcasterId timed out or failed: {$e->getMessage()}");

            // Decide: return null or rethrow. Here we return null so callers can fallback.
            return null;
        }
    }

    /**
     * Fetch the channel’s scheduled segments via Helix.
     *
     * @param  int  $first  Maximum number of segments to return.
     * @param  Carbon|null  $startTime  Only segments starting on or after this timestamp.
     * @return array|null List of segments or null on error.
     *
     * @throws ConnectionException
     */
    public function getChannelSchedule(int $first = 5, ?Carbon $startTime = null): ?array
    {
        // Ensure the access token is initialized
        $this->authenticate();

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
                'Client-ID' => $this->client_id,
                'Authorization' => 'Bearer '.$this->access_token,
            ])
            ->get('https://api.twitch.tv/helix/schedule', $query);

        return $response->json('data.segments') ?? null;
    }

    /**
     * Return the next scheduled segment (or null).
     *
     * @throws ConnectionException
     */
    public function getNextScheduledStream(): ?array
    {
        $segments = $this->getChannelSchedule(1, Carbon::now());

        return $segments[0] ?? null;
    }

    /**
     * Return up to $limit upcoming streams.
     *
     * @param  int  $limit  Limit the maximum number of streams to request.
     *
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
     * @throws ConnectionException
     */
    public function syncScheduleToEvents(int $limit = 10): void
    {
        if (! $this->enabled) {
            Log::warning(' → Integration disabled, aborting sync.');

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

            $event->title = $seg['title'] ?? 'Twitch Event';
            $event->starts_at = Carbon::parse($seg['start_time']);
            $event->ends_at = isset($seg['end_time'])
                ? Carbon::parse($seg['end_time'])
                : $event->starts_at->addHours(1); // default 1h
            $event->save();
        }

        Log::info('TwitchService: Synced '.count($segments).' Twitch segments to events.');
    }

    /**
     * Fetch the channel's profile info (includes created_at, etc.),
     * caching it for 24 hours and falling back on cache if the API fails.
     *
     * @throws ConnectionException
     */
    public function getUserProfile(): array
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return [];
        }

        // Use a per‐channel cache key in case changes are made to support multiple
        $cacheKey = "twitch.profile.{$broadcasterId}";

        return Cache::remember($cacheKey, now()->addHours(24), function () use ($broadcasterId, $cacheKey) {
            try {
                $response = Http::withOptions(['verify' => $this->ssl_verify])
                    ->withHeaders([
                        'Client-ID' => $this->client_id,
                        'Authorization' => 'Bearer '.$this->access_token,
                    ])
                    ->get('https://api.twitch.tv/helix/users', [
                        'id' => $broadcasterId,
                    ])
                    ->throw();

                return $response->json('data.0') ?? [];
            } catch (Throwable $e) {
                Log::error('TwitchService::getUserProfile failed, returning last cached value', [
                    'broadcaster_id' => $broadcasterId,
                    'error' => $e->getMessage(),
                ]);

                // If the cache closure threw before setting any value,
                // Cache::remember will return null — so fallback explicitly:
                return Cache::get($cacheKey, []);
            }
        });
    }

    /**
     * Fetch total follower count for the channel
     *
     * @throws ConnectionException
     */
    public function getFollowerCount(): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        // Cache key per channel
        $cacheKey = "twitch.followers.{$broadcasterId}";

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($broadcasterId) {
            try {
                $resp = Http::withOptions(['verify' => $this->ssl_verify])
                    ->withHeaders([
                        'Client-ID' => $this->client_id,
                        'Authorization' => "Bearer {$this->access_token}",
                    ])->get('https://api.twitch.tv/helix/channels/followers', [
                        'broadcaster_id' => $broadcasterId,
                    ])->throw()->json();

                $value = (int) ($resp['total'] ?? 0);
                $this->recordMetric('followers', $value);

                return $value;
            } catch (Throwable $e) {
                Log::error('TwitchService:getFollowerCount failed, using fallback', ['error' => $e->getMessage()]);

                return (int) TwitchMetric::where('metric', 'followers')
                    ->orderByDesc('recorded_at')
                    ->value('value') ?? 0;
            }
        });
    }

    /**
     * Fetch total subscriber count for the channel
     *
     * @throws ConnectionException
     * @throws RequestException
     */
    public function getSubscriberCount(): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        // Cache key per channel
        $cacheKey = "twitch.subscribers.{$broadcasterId}";

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($broadcasterId) {
            try {
                $token = $this->getAdminAuthToken();
                $resp = Http::withOptions(['verify' => $this->ssl_verify])
                    ->withHeaders([
                        'Client-ID' => $this->client_id,
                        'Authorization' => "Bearer {$token}",
                    ])->get('https://api.twitch.tv/helix/subscriptions', [
                        'broadcaster_id' => $broadcasterId,
                        'first' => 1,
                    ])->throw()->json();

                $value = (int) ($resp['total'] ?? 0);
                $this->recordMetric('subscribers', $value);

                return $value;
            } catch (Throwable $e) {
                Log::error('TwitchService:getSubscriberCount failed, using fallback', ['error' => $e->getMessage()]);

                return (int) TwitchMetric::where('metric', 'subscribers')
                    ->orderByDesc('recorded_at')
                    ->value('value') ?? 0;
            }
        });
    }

    /**
     * Fetch total view count by paging through the broadcaster's videos.
     * Caches the result for 6 hours, records a metric snapshot on a live fetch,
     * and falls back to the last stored metric on error.
     *
     * @throws ConnectionException
     */
    public function getTotalVideoViews(): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        // Cache key per channel
        $cacheKey = "twitch.total_views.{$broadcasterId}";

        return Cache::remember($cacheKey, now()->addHours(6), function () use ($broadcasterId) {
            try {
                $cursor = null;
                $totalViews = 0;

                do {
                    $query = [
                        'user_id' => $broadcasterId,
                        'first' => 100,            // max per page
                    ];
                    if ($cursor) {
                        $query['after'] = $cursor;
                    }

                    $response = Http::withOptions(['verify' => $this->ssl_verify])
                        ->withHeaders([
                            'Client-ID' => $this->client_id,
                            'Authorization' => "Bearer {$this->access_token}",
                        ])
                        ->get('https://api.twitch.tv/helix/videos', $query)
                        ->throw()
                        ->json();

                    // Sum up this page’s views
                    foreach ($response['data'] as $video) {
                        $totalViews += (int) ($video['view_count'] ?? 0);
                    }

                    // Move to next page (or null to end)
                    $cursor = $response['pagination']['cursor'] ?? null;
                } while ($cursor);

                // Record a snapshot for historical tracking
                $this->recordMetric('total_views', $totalViews);

                return $totalViews;
            } catch (Throwable $e) {
                Log::error('TwitchService::getTotalVideoViews failed, falling back to last metric', [
                    'error' => $e->getMessage(),
                ]);

                return (int) TwitchMetric::where('metric', 'total_views')
                    ->orderByDesc('recorded_at')
                    ->value('value')
                    ?? 0;
            }
        });
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
     *
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

        $this->authenticate();

        $response = Http::asForm()->post('https://id.twitch.tv/oauth2/token', [
            'grant_type' => 'refresh_token',
            'refresh_token' => $settings->user_refresh_token,
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
        ]);

        $json = $response->throw()->json();

        if (! isset($json['access_token'], $json['refresh_token'], $json['expires_in'])) {
            throw new RuntimeException('Failed to refresh Twitch user token: '.json_encode($json));
        }

        $settings->user_access_token = $json['access_token'];
        $settings->user_refresh_token = $json['refresh_token'];
        $settings->user_token_expires = now()->addSeconds($json['expires_in']);
        $settings->save();
    }

    /**
     * Grab the “admin” (streamer) token, refreshing if expired.
     *
     * @throws RequestException
     * @throws ConnectionException
     */
    protected function getAdminAuthToken(): ?string
    {
        $this->refreshAdminUserTokenIfNeeded();

        return app(TwitchSettings::class)->user_access_token
            ?? $this->access_token;
    }

    /**
     * Record a new snapshot.
     */
    protected function recordMetric(string $name, int $value): void
    {
        TwitchMetric::create([
            'metric' => $name,
            'value' => $value,
            'recorded_at' => now(),
        ]);
    }

    /**
     * Get the net change in follower count over the past $days days.
     *
     * @throws ConnectionException
     */
    public function getFollowerDelta(int $days = 7): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        // Find the most recent metric at or before $days ago
        $cutoff = Carbon::now()->subDays($days);
        $pastValue = TwitchMetric::where('metric', 'followers')
            ->where('recorded_at', '<=', $cutoff)
            ->orderByDesc('recorded_at')
            ->value('value');

        // Current total (this also records a new metric)
        $current = $this->getFollowerCount();

        if (is_null($pastValue)) {
            // No historical data → can’t compute change
            return 0;
        }

        return $current - $pastValue;
    }

    /**
     * Get the net change in subscriber count over the past $days days.
     *
     * @throws ConnectionException
     */
    public function getSubscriberDelta(int $days = 7): int
    {
        $broadcasterId = $this->getBroadcasterId();
        if (! $broadcasterId) {
            return 0;
        }

        $cutoff = Carbon::now()->subDays($days);
        $pastValue = TwitchMetric::where('metric', 'subscribers')
            ->where('recorded_at', '<=', $cutoff)
            ->orderByDesc('recorded_at')
            ->value('value');
        $current = 0;

        try {
            $current = $this->getSubscriberCount();
        } catch (ConnectionException|RequestException $e) {
            Log::error('Error retrieving the Subscriber count: '.$e->getMessage());
        }

        if (is_null($pastValue)) {
            return 0;
        }

        return $current - $pastValue;
    }
}
