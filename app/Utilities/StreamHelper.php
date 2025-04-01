<?php

namespace App\Utilities;

use App\Services\TwitchService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class StreamHelper
{
    protected TwitchService $twitch;

    public function __construct(TwitchService $twitch)
    {
        $this->twitch = $twitch;
    }

    /**
     * Get stream data and cache for a short time.
     */
    public function getStreamInfo(string $username): ?array
    {
        $cacheKey = "stream_info_{$username}";

        return Cache::remember($cacheKey, now()->addMinutes(2), function () use ($username) {
            try {
                return $this->twitch->getStreamData($username);
            } catch (Throwable $e) {
                Log::warning("Twitch stream fetch failed for {$username}: {$e->getMessage()}");

                return null;
            }
        });
    }

    /**
     * Check if the user is live.
     */
    public function getStreamStatus($username)
    {
        if (empty($username)) {
            return 'offline'; // avoid processing null or empty usernames
        }

        $streamData = $this->getStreamInfo($username);

        Log::debug(print_r($streamData, true));

        if (empty($streamData) || ! isset($streamData[0]['type'])) {
            return 'offline';
        }

        // Does the 'type' equal 'live'?
        if ($streamData[0]['type'] !== 'live') {
            return false;
        }

        return $streamData[0]['type'];
    }
}
