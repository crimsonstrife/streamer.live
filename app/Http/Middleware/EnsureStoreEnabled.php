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

        return $next($request);
    }
}
