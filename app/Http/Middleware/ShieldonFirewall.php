<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Shieldon\Firewall\Firewall;
use Symfony\Component\HttpFoundation\Response;

class ShieldonFirewall
{
    public function handle(Request $request, Closure $next): Response
    {
        $firewall = new Firewall();

        $storage = storage_path('shieldon_firewall');
        $firewall->configure($storage);

        $firewall->controlPanel('/firewall/panel/');

        // IMPORTANT: Do not bind Shieldon's CSRF captcha to Laravel's _token.
        // Remove this until login is stable. Reintroduce later with a distinct field name if needed.
        // $firewall->getKernel()->setCaptcha(...);

        $shieldonResponse = $firewall->run();

        if ($shieldonResponse->getStatusCode() !== 200) {
            // Convert Shieldon's PSR-7 style response headers/body into a Laravel response.
            $headers = [];
            foreach ($shieldonResponse->getHeaders() as $name => $values) {
                $headers[$name] = implode(', ', $values);
            }

            return response(
                (string) $shieldonResponse->getBody(),
                $shieldonResponse->getStatusCode()
            )->withHeaders($headers);
        }

        return $next($request);
    }
}
