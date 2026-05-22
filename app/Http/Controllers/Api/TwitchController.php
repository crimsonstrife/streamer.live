<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Settings\TwitchSettings;
use App\Utilities\StreamHelper;
use Illuminate\Http\JsonResponse;
use Throwable;

/**
 * Public read-only API exposing the configured channel's current live status,
 * for embedding a "live now" indicator on external sites (e.g. ompgame.com).
 *
 * Endpoint:
 *  - GET /api/v1/twitch/stream
 *
 * Only ever reports the configured channel (never an arbitrary user) so this
 * can't be used as an open Twitch proxy against our API quota. Stream metadata
 * comes from {@see StreamHelper}, which caches Helix responses for ~2 minutes,
 * and the endpoint fails closed to "offline" on any error.
 */
class TwitchController extends Controller
{
    public const CACHE_DURATION_SECONDS = 60;

    public function current(): JsonResponse
    {
        $settings = $this->resolveSettings();

        $enabled = $settings?->enable_integration
            ?? (bool) config('services.twitch.enabled', false);

        $channel = strtolower(trim(
            ($settings?->channel_name ?: null)
            ?? (string) config('services.twitch.channel_name', '')
        ));

        $payload = [
            'live' => false,
            'channel' => $channel !== '' ? $channel : null,
            'url' => $channel !== '' ? "https://twitch.tv/{$channel}" : null,
            'stream' => null,
        ];

        if (! $enabled || $channel === '') {
            return $this->respond($payload);
        }

        $stream = null;
        try {
            $data = app(StreamHelper::class)->getStreamInfo($channel);
            $stream = $data[0] ?? null;
        } catch (Throwable) {
            // Any failure (Twitch down, creds missing, etc.) → treat as offline.
            // Never surface the underlying error to a public consumer.
            $stream = null;
        }

        if (is_array($stream) && ($stream['type'] ?? null) === 'live') {
            $payload['live'] = true;
            $payload['stream'] = [
                'title' => $stream['title'] ?? null,
                'game_id' => $stream['game_id'] ?? null,
                'game_name' => $stream['game_name'] ?? null,
                'tags' => array_values(array_filter((array) ($stream['tags'] ?? []))),
                'viewer_count' => isset($stream['viewer_count']) ? (int) $stream['viewer_count'] : null,
                'started_at' => $stream['started_at'] ?? null,
                'language' => $stream['language'] ?? null,
                'thumbnail_url' => $stream['thumbnail_url'] ?? null,
            ];
        }

        return $this->respond($payload);
    }

    private function respond(array $payload): JsonResponse
    {
        return response()
            ->json($payload)
            ->header('Cache-Control', 'public, max-age='.self::CACHE_DURATION_SECONDS);
    }

    private function resolveSettings(): ?TwitchSettings
    {
        try {
            return app(TwitchSettings::class);
        } catch (Throwable) {
            return null;
        }
    }
}
