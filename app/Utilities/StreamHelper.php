<?php

namespace App\Utilities;

use App\Services\TwitchService;
use App\Settings\TwitchSettings;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class StreamHelper
{
    protected TwitchService $twitch;

    protected bool $enabled;

    public function __construct(TwitchService $twitch)
    {
        $this->twitch = $twitch;
        $this->enabled = app(TwitchSettings::class)->enable_integration;
    }

    /**
     * Get stream data and cache for a short time.
     */
    public function getStreamInfo(string $username): ?array
    {
        $cacheKey = "stream_info_{$username}";

        if ($this->enabled) {
            return Cache::remember($cacheKey, now()->addMinutes(2), function () use ($username) {
                try {
                    return $this->twitch->getStreamData($username);
                } catch (Throwable $e) {
                    Log::warning("Twitch stream fetch failed for {$username}: {$e->getMessage()}");

                    return null;
                }
            });
        }

        Log::warning("Twitch stream fetch failed for {$username}: Twitch integration is disabled");

        return null;
    }

    /**
     * Fetch a bundled profile snapshot for the creator-profile layout.
     *
     * Combines Helix user profile (avatar, banner, display name, bio) with
     * safe stats pulled from cache or local metric snapshots. The whole bundle
     * is cached 15 minutes so the profile page renders fast and consistently.
     *
     * @return array{
     *     enabled: bool,
     *     profile: array,
     *     stats: array{followers: ?int, subscribers: ?int, total_views: ?int},
     *     is_live: bool
     * }
     */
    public function getProfile(?string $username = null): array
    {
        if (! $this->enabled) {
            return [
                'enabled' => false,
                'profile' => [],
                'stats'   => ['followers' => null, 'subscribers' => null, 'total_views' => null],
                'is_live' => false,
            ];
        }

        $username = $username ?: app(TwitchSettings::class)->channel_name;

        return Cache::remember("stream_profile_{$username}", now()->addMinutes(15), function () use ($username) {
            $profile = [];
            $followers = null;
            $isLive = false;

            try {
                $profile = $this->twitch->getUserProfile() ?: [];
            } catch (Throwable $e) {
                Log::warning("Twitch profile fetch failed for {$username}: {$e->getMessage()}");
            }

            try {
                $followers = $this->twitch->getFollowerCount();
            } catch (Throwable $e) {
                Log::warning("Follower count fetch failed for {$username}: {$e->getMessage()}");
            }

            try {
                $streamData = $this->getStreamInfo($username);
                $isLive = ($streamData[0]['type'] ?? null) === 'live';
            } catch (Throwable) {
                // Silent — live chip just stays offline.
            }

            // Subscribers and total_views can be slow or require admin tokens.
            // Read the latest metric snapshot instead — recorded by the background
            // job / admin dashboard when those stats were last fetched live.
            $subscribers = \App\Models\TwitchMetric::where('metric', 'subscribers')
                ->orderByDesc('recorded_at')->value('value');
            $totalViews = \App\Models\TwitchMetric::where('metric', 'total_views')
                ->orderByDesc('recorded_at')->value('value');

            return [
                'enabled' => true,
                'profile' => $profile,
                'stats'   => [
                    'followers'   => is_null($followers) ? null : (int) $followers,
                    'subscribers' => is_null($subscribers) ? null : (int) $subscribers,
                    'total_views' => is_null($totalViews) ? null : (int) $totalViews,
                ],
                'is_live' => $isLive,
            ];
        });
    }

    /**
     * Fetch the channel's VODs with pagination.
     *
     * @return array{data: array, pagination: ?string}
     */
    public function getVods(int $limit = 24, ?string $cursor = null, string $type = 'archive'): array
    {
        if (! $this->enabled) {
            return ['data' => [], 'pagination' => null];
        }

        try {
            return $this->twitch->getChannelVideos($limit, $cursor, $type);
        } catch (Throwable $e) {
            Log::warning("Twitch VOD fetch failed: {$e->getMessage()}");

            return ['data' => [], 'pagination' => null];
        }
    }

    /**
     * Check if the user is live.
     */
    public function getStreamStatus($username = null)
    {
        if ($this->enabled) {
            if (empty($username)) {
                $username = app(TwitchSettings::class)->channel_name;
            }

            $streamData = $this->getStreamInfo($username);

            if (empty($streamData) || ! isset($streamData[0]['type'])) {
                return 'offline';
            }

            // Does the 'type' equal 'live'?
            if ($streamData[0]['type'] !== 'live') {
                return false;
            }

            return $streamData[0]['type'];
        }

        Log::warning("Twitch stream fetch failed for {$username}: Twitch integration is disabled");

        return null;
    }
}
