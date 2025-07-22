<?php

namespace App\Http\Middleware;

use App\Models\SecurityObjects\GeoFilter;
use App\Models\SecurityObjects\IPFilter;
use App\Services\GeoLocationService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\IpUtils;
use Symfony\Component\HttpFoundation\Response;

class CheckIPFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        // IP blacklist
        $blacklist = Cache::remember(
            'ip_filter:blacklist',
            config('ip-filter.cache_ttl'),
            fn () => IPFilter::where('type', 'blacklist')
                ->pluck('ip_address')
                ->toArray()
        );

        // IP blacklist
        if (in_array($ip, $blacklist, true)) {
            abort(403, 'Access denied: Your IP is blacklisted.');
        }

        // IP whitelist (if enabled)
        if (config('ip-filter.whitelist_enabled')) {
            $whitelist = Cache::remember(
                'ip_filter:whitelist',
                config('ip-filter.cache_ttl'),
                fn () => IPFilter::where('type', 'whitelist')
                    ->pluck('ip_address')
                    ->toArray()
            );

            if (! in_array($ip, $whitelist, true)) {
                abort(403, 'Access denied: Your IP isn’t whitelisted.');
            }
        }

        // Geo-lookup
        if (config('ip-filter.geo_enabled')) {
            $geo = app(GeoLocationService::class)->getGeoData($request->ip());
            if ($geo) {
                $cc = $geo['country']; // e.g. "US"

                // country blacklist
                if (GeoFilter::where('type', 'blacklist')->where('country_code', $cc)->exists()) {
                    abort(403, "Access denied: Connections from {$geo['country_name']} are blocked.");
                }

                // country whitelist (only allow these when enabled)
                if (config('ip-filter.country_whitelist_enabled')
                    && ! GeoFilter::where('type', 'whitelist')->where('country_code', $cc)->exists()
                ) {
                    abort(403, 'Access denied: Only selected countries are allowed.');
                }
            }
        }

        $response = $next($request);

        // **only in production** do we count 404s
        if ($response->getStatusCode() === 404 && app()->environment('production')) {
            // skip excluded IPs (single or CIDR)…
            foreach (config('ip-filter.exclude_ips', []) as $cidr) {
                if (IpUtils::checkIp($ip, [$cidr])) {
                    return $response;
                }
            }

            $path = '/'.$request->path();
            foreach (config('ip-filter.suspicious_patterns', []) as $pattern) {
                if (preg_match($pattern, $path)) {
                    $cacheKey = "ip_filter:{$ip}:bad404s";
                    // initialize with TTL if not present
                    if (! Cache::has($cacheKey)) {
                        Cache::put($cacheKey, 0, config('ip-filter.suspicious_ttl'));
                    }
                    $count = Cache::increment($cacheKey);

                    // auto‐blacklist?
                    if ($count >= config('ip-filter.404_threshold')) {
                        Log::warning("Auto-blacklisting {$ip}: exceeded 404 threshold ({$count})", [
                            'threshold' => config('ip-filter.404_threshold'),
                            'path' => $path,
                        ]);
                        IPFilter::firstOrCreate(
                            ['ip_address' => $ip, 'type' => 'blacklist'],
                            [
                                'reason' => "Auto‐blacklisted after {$count} 404s to suspicious paths",
                                'source' => 'auto',
                            ]
                        );
                    }
                    break;
                }
            }
        }

        return $response;
    }
}
