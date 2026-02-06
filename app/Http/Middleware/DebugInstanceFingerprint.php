<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DebugInstanceFingerprint
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        $response->headers->set('X-Host', gethostname());
        $response->headers->set('X-AppKey-FP', substr(hash('sha256', (string) config('app.key')), 0, 12));

        return $response;
    }
}
