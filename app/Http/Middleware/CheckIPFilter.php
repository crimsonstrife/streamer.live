<?php

namespace App\Http\Middleware;

use App\Services\GeoLocationService;
use Closure;
use App\Models\SecurityObjects\IPFilter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIPFilter
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ip = $request->ip();

        // IP blacklist
        if (IPFilter::where('type', 'blacklist')->where('ip_address', $ip)->exists()) {
            abort(403, 'Access denied: Your IP is blacklisted.');
        }

        // IP whitelist (if enabled)
        if (config('ip_filter.whitelist_enabled')
            && ! IPFilter::where('type', 'whitelist')->where('ip_address', $ip)->exists()
        ) {
            abort(403, 'Access denied: Your IP isn’t whitelisted.');
        }

        // Geo-lookup
        $geo = app(GeoLocationService::class)->getGeoData($ip);
        if ($geo) {
            $country = $geo['country']; // e.g. “US”

            // Country blacklist
            if (IPFilter::where('type', 'country_blacklist')
                ->where('ip_address', $country)
                ->exists()
            ) {
                abort(403, "Access denied: Connections from {$geo['country_name']} are blocked.");
            }

            // Country whitelist (if you want)
            if (config('ip_filter.country_whitelist_enabled', false)
                && ! IPFilter::where('type', 'country_whitelist')
                    ->where('ip_address', $country)
                    ->exists()
            ) {
                abort(403, "Access denied: Only certain countries are allowed.");
            }
        }

        return $next($request);
    }
}
