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
        // The Firewall constructor calls new Kernel() → HttpFactory::createRequest() →
        // ServerRequestFactory::fromGlobal() which snapshots $_SERVER immediately.
        // We must normalize all four possible Shieldon IP source headers BEFORE
        // instantiating the Firewall, otherwise it captures the raw (potentially invalid)
        // values. Laravel's TrustProxies has already resolved the correct client IP.
        $ip = $request->ip();

        if (!$ip || !filter_var($ip, FILTER_VALIDATE_IP)) {
            \Illuminate\Support\Facades\Log::warning('ShieldonFirewall: could not resolve a valid IP — Shieldon skipped', [
                'request_ip'            => $request->ip(),
                'REMOTE_ADDR'           => $_SERVER['REMOTE_ADDR'] ?? null,
                'HTTP_CF_CONNECTING_IP' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? null,
                'HTTP_X_FORWARDED_FOR'  => $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
                'HTTP_X_FORWARDED_HOST' => $_SERVER['HTTP_X_FORWARDED_HOST'] ?? null,
            ]);
            return $next($request);
        }

        $_SERVER['REMOTE_ADDR']           = $ip;
        $_SERVER['HTTP_CF_CONNECTING_IP'] = $ip;
        $_SERVER['HTTP_X_FORWARDED_FOR']  = $ip;
        $_SERVER['HTTP_X_FORWARDED_HOST'] = $ip;

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
