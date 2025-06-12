<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Shieldon\Firewall\Captcha\Csrf;
use Shieldon\Firewall\Firewall;
use Shieldon\Firewall\HttpResolver;
use Symfony\Component\HttpFoundation\Response;

class ShieldonFirewall
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $firewall = new Firewall();

        // The directory in where Shieldon Firewall will place its files.
        $storage = storage_path('shieldon_firewall');
        ;

        $firewall->configure($storage);

        // Base URL for control panel.
        $firewall->controlPanel('/firewall/panel/');

        $firewall->getKernel()->setCaptcha(
            new Csrf([
                'name' => '_token',
                'value' => csrf_token(),
            ])
        );

        $response = $firewall->run();

        if ($response->getStatusCode() !== 200) {
            $httpResolver = new HttpResolver();
            $httpResolver($response);
        }

        return $next($request);
    }
}
