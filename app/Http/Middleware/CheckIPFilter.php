<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\SecurityObjects\IPFilter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIPFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $clientIp = $request->ip();

        // Check for blacklisted IPs
        $blacklisted = IPFilter::where('type', 'blacklist')
            ->where('ip_address', $clientIp)
            ->exists();

        if ($blacklisted) {
            abort(403, 'Access denied: Your IP address is blacklisted.');
        }

        // Check for whitelisted IPs (if whitelisting is enabled)
        $whitelisted = IPFilter::where('type', 'whitelist')
            ->where('ip_address', $clientIp)
            ->exists();

        if (!empty(config('ip_filter.whitelist_enabled')) && !$whitelisted) {
            abort(403, 'Access denied: Your IP address is not whitelisted.');
        }

        return $next($request);
    }
}
