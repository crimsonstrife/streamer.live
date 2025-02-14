<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LivewireCsrfFix
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only apply to Livewire AJAX requests
        if ($request->is('livewire/*') && $request->method() === 'POST') {
            $request->merge(['_token' => csrf_token()]);
        }

        return $next($request);
    }
}
