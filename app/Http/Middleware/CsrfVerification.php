<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

/**
 * Class CsrfVerification
 * Extends the default Laravel VerifyCsrfToken middleware
 * @package App\Http\Middleware
 */
class CsrfVerification extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/livewire/*',
        '/api/*', // Example: Exclude API routes
    ];

    public function handle($request, \Closure $next)
    {
        if ($this->isReading($request) || $this->shouldPassThrough($request) || $this->tokensMatch($request)) {
            return $this->addCookieToResponse($request, $next($request));
        }

        // Return a 419 response if CSRF validation fails.
        return response('CSRF token mismatch.', 419);
    }

    /**
     * Verify if the CSRF token in the request matches the token stored in the session.
     *
     * @param \Illuminate\Http\Request $request The current request instance.
     * @return bool True if the tokens match, false otherwise.
     */
    protected function tokensMatch($request)
    {
        $tokenFromRequest = $this->getTokenFromRequest($request);
        $tokenFromSession = $request->session()->token();
        $tokenFromCookie = $request->cookie('XSRF-TOKEN');

        \Log::debug('CSRF Validation', [
            'request_token' => $tokenFromRequest,
            'cookie_token' => $tokenFromCookie,
            'session_token' => $tokenFromSession,
            'match' => $tokenFromSession && $tokenFromRequest
                ? hash_equals((string) $tokenFromSession, (string) $tokenFromRequest)
                : false,
        ]);

        return parent::tokensMatch($request);
    }

    /**
     * Determine if the request has a URI that should pass through CSRF verification.
     *
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    protected function shouldPassThrough($request)
    {
        return $request->is('livewire/*') || in_array($request->path(), $this->except);
    }
}
