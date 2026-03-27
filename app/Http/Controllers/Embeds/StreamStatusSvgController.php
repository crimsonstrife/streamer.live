<?php

namespace App\Http\Controllers\Embeds;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Throwable;

class StreamStatusSvgController extends Controller
{
    public function __invoke(Request $request, string $username)
    {
        $data = $this->buildBadgeData($request, $username);

        $svg = view('embeds.stream-status', $data)->render();

        return response($svg, 200)->withHeaders([
            'Content-Type' => 'image/svg+xml; charset=UTF-8',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0',
            'Pragma' => 'no-cache',
            'Expires' => '0',
            'X-Content-Type-Options' => 'nosniff',
            'Cross-Origin-Resource-Policy' => 'cross-origin',
            'X-Badge-Cache-Bust' => $data['cacheBust'] ?: 'none',
        ]);
    }

    protected function buildBadgeData(Request $request, string $username): array
    {
        $username = Str::lower(trim($username));

        $statusKey   = "twitch_stream_status_{$username}";
        $payloadKey  = "twitch_stream_payload_{$username}";
        $lastMetaKey = "twitch_stream_last_meta_{$username}";

        $status   = Cache::get($statusKey, 'offline');
        $payload  = Cache::get($payloadKey);
        $lastMeta = Cache::get($lastMetaKey, []);

        $isLive = $status === 'live' && is_array($payload);

        $game = $isLive
            ? ($payload['category'] ?? $payload['game_name'] ?? null)
            : ($lastMeta['category'] ?? $lastMeta['game_name'] ?? null);

        $viewers = $isLive
            ? ($payload['viewer_count'] ?? $payload['viewers'] ?? null)
            : null;

        $duration = null;
        if ($isLive && ! empty($payload['started_at'])) {
            try {
                $duration = Carbon::parse($payload['started_at'])
                    ->diffForHumans(now(), ['parts' => 2, 'short' => true]);
            } catch (Throwable) {
                $duration = null;
            }
        }

        $lastLive = null;
        if (! $isLive) {
            $lastLiveSource = $lastMeta['ended_at'] ?? $lastMeta['started_at'] ?? null;

            if ($lastLiveSource) {
                try {
                    $lastLive = Carbon::parse($lastLiveSource)
                        ->diffForHumans(now(), ['parts' => 2, 'short' => true]);
                } catch (Throwable) {
                    $lastLive = null;
                }
            }
        }

        $theme = [
            'bg'      => $this->hex($request->query('bg'), '111827'),
            'fg'      => $this->hex($request->query('fg'), 'F9FAFB'),
            'muted'   => $this->hex($request->query('muted'), '9CA3AF'),
            'accent'  => $this->hex($request->query('accent'), 'EF4444'),
            'offline' => $this->hex($request->query('offline'), '6B7280'),
            'border'  => $this->hex($request->query('border'), '374151'),
        ];

        $compact      = filter_var($request->query('compact', false), FILTER_VALIDATE_BOOL);
        $showCategory = filter_var($request->query('show_category', true), FILTER_VALIDATE_BOOL);
        $showLastLive = filter_var($request->query('show_last_live', true), FILTER_VALIDATE_BOOL);

        $cacheBust = preg_replace(
            '/[^A-Za-z0-9._:-]/',
            '',
            (string) ($request->query('cb', $request->query('v', '')))
        );

        return [
            'username'     => $username,
            'isLive'       => $isLive,
            'game'         => $game,
            'viewers'      => $viewers,
            'duration'     => $duration,
            'lastLive'     => $lastLive,
            'showCategory' => $showCategory,
            'showLastLive' => $showLastLive,
            'theme'        => $theme,
            'compact'      => $compact,
            'cacheBust'    => $cacheBust,
        ];
    }

    protected function hex(?string $value, string $default): string
    {
        $value = ltrim((string) $value, '#');

        return preg_match('/^[A-Fa-f0-9]{6}$/', $value) ? strtoupper($value) : $default;
    }
}
