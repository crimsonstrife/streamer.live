<?php

namespace App\Jobs;

use App\Events\StreamerWentLive;
use App\Events\StreamerWentOffline;
use App\Services\TwitchService;
use App\Settings\TwitchSettings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class CheckStreamerStatus implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected string $username;

    protected string $cacheKey;

    public function __construct(string $username)
    {
        $this->username = strtolower($username);
        $this->cacheKey = "twitch_stream_status_{$this->username}";
    }

    public function handle(TwitchService $twitch): void
    {
        $twitchSettings = app(TwitchSettings::class);

        if (! $twitchSettings->enable_integration) {
            Log::warning('Twitch integration must be enabled for this job to run.');
            return;
        }

        Log::info("Running CheckStreamerStatus for: {$this->username}");

        $statusKey     = $this->cacheKey; // twitch_stream_status_{username}
        $payloadKey    = "twitch_stream_payload_{$this->username}";
        $announceIdKey = "twitch_stream_announced_id_{$this->username}";

        try {
            $data   = $twitch->getStreamData($this->username) ?? [];
            $stream = $data[0] ?? null;

            $isLive   = is_array($stream) && (($stream['type'] ?? null) === 'live');
            $streamId = $isLive ? ($stream['id'] ?? null) : null;

            $lastStatus = Cache::get($statusKey, 'offline');

            // 1) Banner cache (SHORT TTL; refreshed every run)
            Cache::put($statusKey, $isLive ? 'live' : 'offline', now()->addMinutes(5));

            if ($isLive) {
                Cache::put($payloadKey, [
                    'id'            => $streamId,
                    'title'         => $stream['title'] ?? null,
                    'game_name'     => $stream['game_name'] ?? null,
                    'category'      => $stream['game_name'] ?? null, // alias for convenience
                    'started_at'    => $stream['started_at'] ?? null,
                    'viewer_count'  => $stream['viewer_count'] ?? null,
                    'thumbnail_url' => $stream['thumbnail_url'] ?? null,
                    'url'           => "https://twitch.tv/{$this->username}",
                ], now()->addMinutes(5));
            } else {
                Cache::forget($payloadKey);
            }

            // 2) Events (LONG TTL dedupe by stream id)
            if ($isLive) {
                $lastAnnouncedId = Cache::get($announceIdKey);

                if ($streamId && ($lastStatus !== 'live' || $streamId !== $lastAnnouncedId)) {
                    Log::info("Streamer {$this->username} is LIVE. stream_id={$streamId}");
                    event(new StreamerWentLive($this->username, $data));

                    Cache::put($announceIdKey, $streamId, now()->addHours(12));
                }
            } else {
                if ($lastStatus === 'live') {
                    Log::info("Streamer {$this->username} is OFFLINE.");
                    event(new StreamerWentOffline($this->username));
                }

                Cache::forget($announceIdKey);
            }
        } catch (Throwable $e) {
            Log::error("Failed to check Twitch stream status for '{$this->username}': ".$e->getMessage());
        }
    }

}
