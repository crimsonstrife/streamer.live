<?php

namespace App\Http\Controllers\Embeds;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class StreamStatusImageController extends Controller
{
    public function __invoke(Request $request, string $username, string $format)
    {
        abort_unless(extension_loaded('gd'), 503, 'GD extension is required for raster badge rendering.');

        $format = strtolower($format);
        abort_unless(in_array($format, ['png', 'webp', 'gif'], true), 404);

        if ($format === 'webp' && ! function_exists('imagewebp')) {
            abort(415, 'WebP output is not supported by this PHP build.');
        }

        $data = $this->buildBadgeData($request, $username);
        $binary = $this->renderBadge($data, $format);

        $contentType = match ($format) {
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
        };

        return response($binary, 200)->withHeaders([
            'Content-Type' => $contentType,
            'Cache-Control' => 'public, max-age=30, stale-while-revalidate=30',
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

    protected function renderBadge(array $data, string $format): string
    {
        $width = $data['compact'] ? 360 : 520;
        $height = 64;

        $image = imagecreatetruecolor($width, $height);
        imagealphablending($image, true);
        imagesavealpha($image, true);
        imageantialias($image, true);

        $bg = $this->allocate($image, $data['theme']['bg']);
        $fg = $this->allocate($image, $data['theme']['fg']);
        $muted = $this->allocate($image, $data['theme']['muted']);
        $border = $this->allocate($image, $data['theme']['border']);
        $status = $this->allocate(
            $image,
            $data['isLive'] ? $data['theme']['accent'] : $data['theme']['offline']
        );
        $pulse = $this->allocateAlpha(
            $image,
            $data['isLive'] ? $data['theme']['accent'] : $data['theme']['offline'],
            90
        );

        $this->filledRoundedRect($image, 0, 0, $width - 1, $height - 1, 12, $border);
        $this->filledRoundedRect($image, 1, 1, $width - 2, $height - 2, 11, $bg);

        if ($data['isLive']) {
            imagefilledellipse($image, 24, 32, 28, 28, $pulse);
        }

        imagefilledellipse($image, 24, 32, 14, 14, $status);

        $line1 = strtoupper($data['username']) . ' • ' . ($data['isLive'] ? 'LIVE' : 'OFFLINE');
        $line2 = $this->buildLine2($data);

        $line1 = Str::limit($line1, $data['compact'] ? 30 : 42, '…');
        $line2 = Str::limit($line2, $data['compact'] ? 44 : 66, '…');

        imagestring($image, 5, 40, 14, $line1, $fg);
        imagestring($image, 3, 40, 38, $line2, $muted);

        ob_start();

        switch ($format) {
            case 'png':
                imagepng($image, null, 6);
                break;

            case 'webp':
                if (! imagewebp($image, null, 85)) {
                    imagedestroy($image);
                    throw new RuntimeException('Failed to encode WebP badge.');
                }
                break;

            case 'gif':
                imagetruecolortopalette($image, true, 256);
                imagegif($image);
                break;
        }

        $binary = (string) ob_get_clean();
        imagedestroy($image);

        return $binary;
    }

    protected function buildLine2(array $data): string
    {
        $parts = [];

        if ($data['isLive']) {
            if ($data['showCategory'] && $data['game']) {
                $parts[] = $data['game'];
            }

            if ($data['viewers'] !== null) {
                $parts[] = number_format((int) $data['viewers']) . ' viewers';
            }

            if ($data['duration']) {
                $parts[] = 'for ' . $data['duration'];
            }
        } else {
            if ($data['showLastLive'] && $data['lastLive']) {
                $parts[] = 'Last live ' . $data['lastLive'];
            } else {
                $parts[] = 'Not currently streaming';
            }

            if ($data['showCategory'] && $data['game']) {
                $parts[] = $data['game'];
            }
        }

        return implode(' • ', array_filter($parts));
    }

    protected function filledRoundedRect($image, int $x1, int $y1, int $x2, int $y2, int $radius, int $color): void
    {
        imagefilledrectangle($image, $x1 + $radius, $y1, $x2 - $radius, $y2, $color);
        imagefilledrectangle($image, $x1, $y1 + $radius, $x2, $y2 - $radius, $color);

        imagefilledellipse($image, $x1 + $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
        imagefilledellipse($image, $x2 - $radius, $y1 + $radius, $radius * 2, $radius * 2, $color);
        imagefilledellipse($image, $x1 + $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
        imagefilledellipse($image, $x2 - $radius, $y2 - $radius, $radius * 2, $radius * 2, $color);
    }

    protected function allocate($image, string $hex): int
    {
        [$r, $g, $b] = sscanf($hex, '%02x%02x%02x');

        return imagecolorallocate($image, $r, $g, $b);
    }

    protected function allocateAlpha($image, string $hex, int $alpha): int
    {
        [$r, $g, $b] = sscanf($hex, '%02x%02x%02x');

        return imagecolorallocatealpha($image, $r, $g, $b, $alpha);
    }

    protected function hex(?string $value, string $default): string
    {
        $value = ltrim((string) $value, '#');

        return preg_match('/^[A-Fa-f0-9]{6}$/', $value) ? strtoupper($value) : $default;
    }
}
