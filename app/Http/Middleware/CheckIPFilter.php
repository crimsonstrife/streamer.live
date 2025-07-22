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
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        $this->enforceBlacklist($ip);
        $this->enforceWhitelist($ip);
        $this->enforceGeoRestrictions($ip);

        $response = $next($request);

        $this->trackSuspicious404s($request, $response, $ip);

        return $response;
    }

    protected function enforceBlacklist(string $ip): void
    {
        if (in_array($ip, $this->getIpList('blacklist'), true)) {
            abort(403, 'Access denied: Your IP is blacklisted.');
        }
    }

    protected function enforceWhitelist(string $ip): void
    {
        if (! config('ip-filter.whitelist_enabled')) {
            return;
        }

        if (! in_array($ip, $this->getIpList('whitelist'), true)) {
            abort(403, 'Access denied: Your IP isn’t whitelisted.');
        }
    }

    protected function enforceGeoRestrictions(string $ip): void
    {
        if (! config('ip-filter.geo_enabled')) {
            return;
        }

        $geo = app(GeoLocationService::class)->getGeoData($ip);
        if (empty($geo)) {
            return;
        }

        $country = $geo['country'];
        $name = $geo['country_name'];

        if (GeoFilter::where('type', 'blacklist')
            ->where('country_code', $country)
            ->exists()
        ) {
            abort(403, "Access denied: Connections from {$name} are blocked.");
        }

        if (config('ip-filter.country_whitelist_enabled')
            && ! GeoFilter::where('type', 'whitelist')
                ->where('country_code', $country)
                ->exists()
        ) {
            abort(403, 'Access denied: Only selected countries are allowed.');
        }
    }

    protected function trackSuspicious404s(Request $request, Response $response, string $ip): void
    {
        if ($response->getStatusCode() !== 404 || ! app()->environment('production')) {
            return;
        }

        // exempt local/CIDR IPs
        foreach (config('ip-filter.exclude_ips', []) as $cidr) {
            if (IpUtils::checkIp($ip, [$cidr])) {
                return;
            }
        }

        $path = '/'.ltrim($request->path(), '/');
        foreach (config('ip-filter.suspicious_patterns', []) as $pattern) {
            if (! preg_match($pattern, $path)) {
                continue;
            }

            // Ensure default value atomically
            $cacheKey = "ip_filter:{$ip}:bad404s";
            Cache::add($cacheKey, 0, config('ip-filter.suspicious_ttl')); // Will only add if the key doesn't exist
            $count = Cache::increment($cacheKey); // Atomically increment the count

            if ($count >= config('ip-filter.404_threshold')) {
                Log::warning("Auto-blacklisting {$ip}: {$count} 404s to {$path}");
                IPFilter::firstOrCreate(
                    ['ip_address' => $ip, 'type' => 'blacklist'],
                    [
                        'reason' => "Auto-blacklisted after {$count} 404s to suspicious paths",
                        'source' => 'auto',
                    ]
                );
            }

            break;
        }
    }

    protected function getIpList(string $type): array
    {
        $cacheKey = "ip_filter:{$type}";

        return Cache::remember(
            $cacheKey,
            config('ip-filter.cache_ttl'),
            fn () => IPFilter::where('type', $type)
                ->pluck('ip_address')
                ->toArray()
        );
    }
}
