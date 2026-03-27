<?php

namespace App\Livewire;

use App\Settings\TwitchSettings;
use Carbon\Carbon;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Cache;
use Throwable;

class CurrentStreamStatus extends Widget
{
    protected static string $view = 'livewire.current-stream-status';

    protected function getHeading(): ?string
    {
        return 'Current Stream Status';
    }

    protected function getViewData(): array
    {
        $settings = app(TwitchSettings::class);

        // If Twitch integration is disabled, treat as offline regardless of cache.
        if (! $settings->enable_integration) {
            return [
                'twitchEnabled' => false,
                'isLive'   => false,
                'game'     => null,
                'viewers'  => null,
                'duration' => null,
            ];
        }

        $username = strtolower(trim($settings->channel_name ?? config('services.twitch.channel_name') ?? ''));

        if ($username === '') {
            return [
                'twitchEnabled' => true,
                'isLive'   => false,
                'game'     => null,
                'viewers'  => null,
                'duration' => null,
            ];
        }

        $statusKey  = "twitch_stream_status_{$username}";
        $payloadKey = "twitch_stream_payload_{$username}";

        $status  = Cache::get($statusKey, 'offline');
        $payload = Cache::get($payloadKey);

        $isLive = ($status === 'live');

        if (! $isLive || ! is_array($payload)) {
            return [
                'twitchEnabled' => true,
                'isLive'   => false,
                'game'     => null,
                'viewers'  => null,
                'duration' => null,
            ];
        }

        // Support either your normalized payload or the raw Twitch stream array.
        $game = $payload['category']
            ?? $payload['game_name']
            ?? 'Unknown Game';

        $viewers = $payload['viewer_count']
            ?? $payload['viewers']
            ?? null;

        $startedAt = $payload['started_at'] ?? null;

        $duration = null;
        if ($startedAt) {
            try {
                $duration = Carbon::parse($startedAt)
                    ->diffForHumans(now(), ['parts' => 3, 'short' => true]);
            } catch (Throwable) {
                $duration = null;
            }
        }

        return [
            'twitchEnabled' => true,
            'isLive'   => true,
            'game'     => $game,
            'viewers'  => $viewers,
            'duration' => $duration,
            'url'      => $payload['url'] ?? "https://twitch.tv/{$username}",
        ];
    }
}
