<?php

use App\Http\Middleware\CheckIPFilter;
use App\Http\Middleware\EnsureStoreEnabled;
use App\Http\Middleware\SecurityHeaders;
use App\Http\Middleware\ShieldonFirewall;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance;
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\TrustHosts;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Middleware\ValidatePostSize;
use Illuminate\Session\Middleware\StartSession;
use Shieldon\Firewall\Firewall;
use Shieldon\Firewall\HttpResolver;

/*
|--------------------------------------------------------------------------
| Run The Shieldon Firewall
|--------------------------------------------------------------------------
|
| Shieldon Firewall will watch all HTTP requests coming to your website.
| Running Shieldon Firewall before initializing Laravel will avoid possible
| conflicts with Laravel's built-in functions.
*/
if (isset($_SERVER['REQUEST_URI'])) {

    // This directory must be writable.
    // We put it in the `storage/shieldon_firewall` directory.
    $storage = __DIR__.'/../storage/shieldon_firewall';

    $firewall = new Firewall;

    $firewall->configure($storage);

    // The base url for the control panel.
    $firewall->controlPanel('/firewall/panel/');

    $response = $firewall->run();

    if ($response->getStatusCode() !== 200) {
        $httpResolver = new HttpResolver;
        $httpResolver($response);
    }
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->use([
            InvokeDeferredCallbacks::class,
            // TrustHosts::class,
            TrustProxies::class,
            HandleCors::class,
            PreventRequestsDuringMaintenance::class,
            ValidatePostSize::class,
            TrimStrings::class,
            ConvertEmptyStringsToNull::class,
        ]);

        // Apply to all "web" routes
        $middleware->web(append: [
            CheckIPFilter::class,
            // SecurityHeaders::class,
        ]);

        // Apply to all "api" routes
        $middleware->api(append: [
            CheckIPFilter::class,
        ]);

        $middleware->alias([
            'store.enabled' => EnsureStoreEnabled::class,
            'firewall' => ShieldonFirewall::class,
            'ip-filter' => CheckIPFilter::class,
        ]);

        $middleware->trustProxies('*');
        // $middleware->trustHosts();
        // $middleware->append(StartSession::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
