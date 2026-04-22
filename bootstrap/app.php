<?php

use App\Http\Middleware\CheckIPFilter;
use App\Http\Middleware\EnsureNotInstalled;
use App\Http\Middleware\EnsureStoreEnabled;
use App\Http\Middleware\ShieldonFirewall;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\InvokeDeferredCallbacks;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance;
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Middleware\ValidatePostSize;
use Spatie\Csp\AddCspHeaders;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware([])->group(base_path('routes/embeds.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->use([
            InvokeDeferredCallbacks::class,
            TrustProxies::class,
            HandleCors::class,
            PreventRequestsDuringMaintenance::class,
            ValidatePostSize::class,
            TrimStrings::class,
            ConvertEmptyStringsToNull::class,
            CheckIPFilter::class,
        ]);

        // Apply to all "web" routes
        $middleware->web(
            append: [
                ShieldonFirewall::class,
                AddCspHeaders::class,
            ]
        );

        // Apply to all "api" routes
        $middleware->api(append: [
            // SecurityHeaders::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'install/*',
            'api/webhooks/stripe',
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
        $exceptions->report(function (\Throwable $e) {
            if (! $e instanceof \TypeError && ! $e instanceof \Error) {
                return;
            }

            $trace = $e->getTraceAsString();
            $isFilamentLivewire = str_contains($trace, '/vendor/filament/')
                && str_contains($trace, '/vendor/livewire/livewire/');

            if ($isFilamentLivewire && ! auth()->check()) {
                return false;
            }
        });
    })->create();
