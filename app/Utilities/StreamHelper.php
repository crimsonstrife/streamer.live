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
