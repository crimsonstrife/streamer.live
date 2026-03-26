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

        // Shieldon may read from REMOTE_ADDR, HTTP_CF_CONNECTING_IP, HTTP_X_FORWARDED_FOR,
        // or HTTP_X_FORWARDED_HOST depending on its config. Any of these can contain a
        // value that is non-empty but not a valid IP, crashing gethostbyaddr(). Laravel's
        // TrustProxies has already resolved the correct client IP in $request->ip(), so
        // normalize all four sources to that value.
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
