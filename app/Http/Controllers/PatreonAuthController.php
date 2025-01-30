<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Patreon\API;
use Patreon\OAuth;

class PatreonAuthController extends Controller
{
    protected OAuth $patreonOAuth;

    public function __construct()
    {
        $this->patreonOAuth = new OAuth(
            config('services.patreon.client_id'),
            config('services.patreon.client_secret')
        );
    }

    public function redirect()
    {
        if (!app(IntegrationSettings::class)->patreon_enabled) {
            return redirect()->route('profile')->with('error', 'Patreon integration is disabled.');
        }

        $authUrl = 'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=' . config('services.patreon.client_id') .
            '&redirect_uri=' . urlencode(config('services.patreon.redirect')) .
            '&scope=identity%20identity[email]';

        return redirect($authUrl);
    }

    public function callback(Request $request)
    {
        if (!app(IntegrationSettings::class)->patreon_enabled) {
            return redirect()->route('profile')->with('error', 'Patreon integration is disabled.');
        }

        if (!$request->has('code')) {
            return redirect()->route('profile')->with('error', 'Patreon authentication failed.');
        }

        // Exchange the authorization code for an access token
        $tokens = $this->patreonOAuth->get_tokens($request->input('code'), config('services.patreon.redirect'));

        if (!isset($tokens['access_token'])) {
            return redirect()->route('profile')->with('error', 'Failed to get Patreon access token.');
        }

        $apiClient = new API($tokens['access_token']);
        $patronResponse = $apiClient->fetch_user();

        if (!$patronResponse) {
            return redirect()->route('profile')->with('error', 'Failed to fetch Patreon user data.');
        }

        $patreonUserId = $patronResponse['data']['id'] ?? null;
        $isVerifiedEmail = $patronResponse['data']['attributes']['is_email_verified'] ?? false;
        $email = $patronResponse['data']['attributes']['email'] ?? null;

        if (!$patreonUserId) {
            return redirect()->route('profile')->with('error', 'Invalid Patreon user data.');
        }

        // Store Patreon user ID in the database
        $user = Auth::user();
        $user->update([
            'patreon_id' => $patreonUserId,
            'patreon_email' => $isVerifiedEmail ? $email : null,
            'patreon_access_token' => $tokens['access_token'],
            'patreon_refresh_token' => $tokens['refresh_token'],
        ]);

        return redirect()->route('profile')->with('success', 'Patreon account linked!');
    }
}
