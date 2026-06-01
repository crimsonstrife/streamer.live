<?php

namespace App\Http\Middleware;

use App\Settings\FourthwallSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureStoreEnabled
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! app(FourthwallSettings::class)->enable_integration) {
            abort(404);
        }

        $response = $next($request);

        if ($request->isMethodCacheable()) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0, s-maxage=0');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');
        }

        return $response;
    }
}
