<?php

namespace App\Http\Middleware;

use App\Models\SecurityObjects\GeoFilter;
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
        if (config('ip-filter.whitelist_enabled')
            && ! IPFilter::where('type', 'whitelist')->where('ip_address', $ip)->exists()
        ) {
            abort(403, 'Access denied: Your IP isn’t whitelisted.');
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
                    abort(403, "Access denied: Only selected countries are allowed.");
                }
            }
        }

        return $next($request);
    }
}
