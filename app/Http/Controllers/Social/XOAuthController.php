<?php

namespace App\Http\Controllers\Social;

use App\Enums\StreamSocialPlatform;
use App\Filament\Resources\StreamSocialAccountResource;
use App\Http\Controllers\Controller;
use App\Models\StreamSocialAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class XOAuthController  extends Controller
{
    /**
     * Redirect the admin to X OAuth authorize URL (PKCE).
     *
     * X authorize URL: https://x.com/i/oauth2/authorize :contentReference[oaicite:3]{index=3}
     */
    public function connect(StreamSocialAccount $account, Request $request)
    {
        if (($account->platform?->value ?? (string) $account->platform) !== StreamSocialPlatform::X->value) {
            abort(Response::HTTP_BAD_REQUEST, 'Selected social account is not an X account.');
        }

        $clientId = config('services.x.client_id');
        $redirect = config('services.x.redirect');
        $scopes   = config('services.x.scopes', []);

        if (! $clientId || ! $redirect || empty($scopes)) {
            abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'X OAuth is not configured (client_id/redirect/scopes).');
        }

        // PKCE values
        $state        = Str::random(48);
        $codeVerifier = $this->makeCodeVerifier();
        $codeChallenge = $this->base64UrlEncode(hash('sha256', $codeVerifier, true));

        // Cache state for callback validation (10 minutes is typical).
        Cache::put($this->stateCacheKey($state), [
            'account_id' => $account->getKey(),
            'code_verifier' => $codeVerifier,
            'auth_user_id' => $request->user()?->getAuthIdentifier(),
        ], now()->addMinutes(10));

        // Build authorize URL per X docs. :contentReference[oaicite:4]{index=4}
        $authorizeUrl = 'https://x.com/i/oauth2/authorize?' . http_build_query([
                'response_type' => 'code',
                'client_id' => $clientId,
                'redirect_uri' => $redirect,
                'scope' => implode(' ', $scopes),
                'state' => $state,
                'code_challenge' => $codeChallenge,
                'code_challenge_method' => 'S256',
            ], '', '&', PHP_QUERY_RFC3986);

        return redirect()->away($authorizeUrl);
    }

    /**
     * OAuth callback endpoint.
     *
     * Token endpoint: https://api.x.com/2/oauth2/token :contentReference[oaicite:5]{index=5}
     */
    public function callback(Request $request)
    {
        $state = (string) $request->query('state', '');
        $code  = (string) $request->query('code', '');

        $error = (string) $request->query('error', '');
        $errorDescription = (string) $request->query('error_description', '');

        if ($error !== '') {
            return redirect()
                ->to(StreamSocialAccountResource::getUrl('index'))
                ->with('error', 'X authorization failed: ' . $error . ($errorDescription ? " ({$errorDescription})" : ''));
        }

        if ($state === '' || $code === '') {
            return redirect()
                ->to(StreamSocialAccountResource::getUrl('index'))
                ->with('error', 'X authorization callback missing state or code.');
        }

        $payload = Cache::pull($this->stateCacheKey($state));

        if (! is_array($payload) || empty($payload['account_id']) || empty($payload['code_verifier'])) {
            return redirect()
                ->to(StreamSocialAccountResource::getUrl('index'))
                ->with('error', 'X authorization expired or invalid. Please try connecting again.');
        }

        // Optional extra safety: only allow the same authenticated admin to complete.
        $currentUserId = $request->user()?->getAuthIdentifier();
        if (! empty($payload['auth_user_id']) && $currentUserId !== $payload['auth_user_id']) {
            return redirect()
                ->to(StreamSocialAccountResource::getUrl('index'))
                ->with('error', 'X authorization session mismatch. Please retry from the same admin session.');
        }

        /** @var StreamSocialAccount $account */
        $account = StreamSocialAccount::query()->findOrFail($payload['account_id']);

        if (($account->platform?->value ?? (string) $account->platform) !== StreamSocialPlatform::X->value) {
            return redirect()
                ->to(StreamSocialAccountResource::getUrl('index'))
                ->with('error', 'X authorization callback resolved to a non-X social account.');
        }

        $tokenResponse = $this->exchangeAuthorizationCode(
            code: $code,
            codeVerifier: $payload['code_verifier'],
        );

        // Persist tokens into encrypted credentials.
        $creds = $account->credentials ?? [];

        $creds['access_token']  = $tokenResponse['access_token'] ?? null;
        $creds['refresh_token'] = $tokenResponse['refresh_token'] ?? null; // only if offline.access was requested :contentReference[oaicite:6]{index=6}
        $creds['token_type']    = $tokenResponse['token_type'] ?? null;
        $creds['scope']         = $tokenResponse['scope'] ?? null;

        if (isset($tokenResponse['expires_in'])) {
            $creds['expires_at'] = now()->addSeconds((int) $tokenResponse['expires_in'])->timestamp;
        }

        // Clean up legacy key if you previously pasted tokens
        unset($creds['user_access_token']);

        $account->credentials = $creds;
        $account->save();

        return redirect()
            ->to(StreamSocialAccountResource::getUrl('edit', ['record' => $account]))
            ->with('success', 'X account connected.');
    }

    /**
     * Optional: disconnect endpoint (you can also do this via a Filament action).
     */
    public function disconnect(StreamSocialAccount $account)
    {
        if (($account->platform?->value ?? (string) $account->platform) !== StreamSocialPlatform::X->value) {
            abort(Response::HTTP_BAD_REQUEST, 'Not an X account.');
        }

        $creds = $account->credentials ?? [];
        unset($creds['access_token'], $creds['refresh_token'], $creds['expires_at'], $creds['scope'], $creds['token_type'], $creds['user_access_token']);

        $account->credentials = $creds;
        $account->save();

        return redirect()
            ->to(StreamSocialAccountResource::getUrl('edit', ['record' => $account]))
            ->with('success', 'X account disconnected.');
    }

    private function exchangeAuthorizationCode(string $code, string $codeVerifier): array
    {
        $clientId     = config('services.x.client_id');
        $clientSecret = config('services.x.client_secret'); // optional (public vs confidential clients)
        $redirect     = config('services.x.redirect');

        // X token endpoint per docs. :contentReference[oaicite:7]{index=7}
        $request = Http::asForm()->acceptJson();

        // If you have a client secret (confidential client), Basic Auth is commonly used.
        // If you don't, include client_id in the body (public client).
        if ($clientSecret) {
            $request = $request->withBasicAuth($clientId, $clientSecret);
        }

        $body = [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => $redirect,
            'code_verifier' => $codeVerifier,
            'client_id' => $clientId, // safe to include even with Basic Auth
        ];

        return $request
            ->post('https://api.x.com/2/oauth2/token', $body)
            ->throw()
            ->json();
    }

    private function makeCodeVerifier(): string
    {
        // PKCE verifier: unreserved characters; 43–128 chars.
        // We'll generate base64url from random bytes and trim to 96 chars.
        $raw = random_bytes(64);
        return substr($this->base64UrlEncode($raw), 0, 96);
    }

    private function base64UrlEncode(string $binary): string
    {
        return rtrim(strtr(base64_encode($binary), '+/', '-_'), '=');
    }

    private function stateCacheKey(string $state): string
    {
        return "x.oauth.state.{$state}";
    }
}
