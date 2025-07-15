<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Facades\SecureGuestMode;

class EnsureGuestMode
{
    public function handle($request, Closure $next)
    {
        if (SecureGuestMode::enabled() && !Auth::check()) {
            SecureGuestMode::login();
            Auth::shouldUse('guest');
        }

        return $next($request);
    }
}

