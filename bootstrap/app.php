<?php

use App\Http\Middleware\CheckIPFilter;
use App\Http\Middleware\EnsureNotInstalled;
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
use Spatie\Csp\AddCspHeaders;
use Treblle\SecurityHeaders\Http\Middleware\CertificateTransparencyPolicy;
use Treblle\SecurityHeaders\Http\Middleware\PermissionsPolicy;
use Treblle\SecurityHeaders\Http\Middleware\RemoveHeaders;
use Treblle\SecurityHeaders\Http\Middleware\SetReferrerPolicy;
use Treblle\SecurityHeaders\Http\Middleware\StrictTransportSecurity;

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
            CheckIPFilter::class,
            // RemoveHeaders::class,
            // SetReferrerPolicy::class,
            // StrictTransportSecurity::class,
            // CertificateTransparencyPolicy::class,
            // PermissionsPolicy::class,
        ]);

        // Apply to all "web" routes
        $middleware->web(
            append: [
                ShieldonFirewall::class,
                // SecurityHeaders::class,
                AddCspHeaders::class,
            ]
        );

        // Apply to all "api" routes
        $middleware->api(append: [
            // SecurityHeaders::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'install/*',
        ]);

        $middleware->alias([
            'store.enabled' => EnsureStoreEnabled::class,
            'firewall' => ShieldonFirewall::class,
            'ip-filter' => CheckIPFilter::class,
            'not.installed' => EnsureNotInstalled::class,
        ]);

        $middleware->trustProxies('*');
        // $middleware->trustHosts();
        // $middleware->append(StartSession::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
