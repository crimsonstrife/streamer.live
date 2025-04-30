<?php

namespace App\Jobs;

use App\Events\StreamerWentLive;
use App\Events\StreamerWentOffline;
use App\Services\TwitchService;
use App\Settings\DiscordSettings;
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

    protected bool $twitch_enabled;

    protected bool $discord_enabled;

    protected string $username;

    protected string $cacheKey;

    public function __construct(string $username)
    {
        $this->username = strtolower($username);
        $this->cacheKey = "twitch_stream_status_{$this->username}";
        $this->twitch_enabled = app(TwitchSettings::class)->enabled;
        $this->discord_enabled = app(DiscordSettings::class)->enabled;
    }

    public function handle(TwitchService $twitch): void
    {
        // This job requires that BOTH Discord and Twitch integrations be enabled
        if ($this->twitch_enabled && $this->discord_enabled) {
            Log::info("Running CheckStreamerStatus for: {$this->username}");
            try {
                $data = $twitch->getStreamData($this->username);
                $isLive = $data && ($data[0]['type'] ?? null) === 'live';

                $lastStatus = Cache::get($this->cacheKey, 'offline');
                $currentStatus = $isLive ? 'live' : 'offline';

                if ($lastStatus !== $currentStatus) {
                    Log::info("Streamer '{$this->username}' status changed: {$lastStatus} → {$currentStatus}");

                    if ($isLive) {
                        Log::info("Streamer {$this->username} is LIVE.");
                        event(new StreamerWentLive($this->username, $data));
                    } else {
                        Log::info("Streamer {$this->username} is OFFLINE.");
                        event(new StreamerWentOffline($this->username));
                    }

                    Cache::put($this->cacheKey, $currentStatus, now()->addMinutes(5));
                }
            } catch (Throwable $e) {
                Log::error("Failed to check Twitch stream status for '{$this->username}': ".$e->getMessage());
            }
        } else {
            Log::warning('Twitch and Discord integrations must both be enabled for this job to run.');
        }
    }
}
