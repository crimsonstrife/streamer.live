<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;

class EnsureDatabaseReady
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip checks if running in CLI mode (e.g., during migrations or composer install)
        if (app()->runningInConsole()) {
            return $next($request);
        }

        // List of required tables
        $requiredTables = ['pages', 'posts', 'categories', 'tags', 'blocks', 'comments', 'users'];

        // Check if all required tables exist
        foreach ($requiredTables as $table) {
            if (!Schema::hasTable($table)) {
                return redirect('/')->withErrors([
                    'error' => 'The database is not fully set up. Please run migrations.',
                ]);
            }
        }

        return $next($request);
    }
}
