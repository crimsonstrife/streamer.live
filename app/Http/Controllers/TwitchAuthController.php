<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use romanzipp\Twitch\Twitch;
use romanzipp\Twitch\Enums\GrantType;

class TwitchAuthController extends Controller
{
    protected Twitch $twitch;

    public function __construct()
    {
        $this->twitch = new Twitch();
        $this->twitch->setClientId(config('twitch-api.client_id'));
        $this->twitch->setClientSecret(config('twitch-api.client_secret'));

        // Automatically generate an OAuth token
        $tokenResponse = $this->twitch->getOAuthToken(null, GrantType::CLIENT_CREDENTIALS, ['user:read:subscriptions']);

        if ($tokenResponse->success()) {
            $this->twitch->setToken($tokenResponse->data()->access_token);
        }
    }

    public function link(Request $request)
    {
        if (!app(IntegrationSettings::class)->twitch_enabled) {
            return redirect()->route('profile')->with('error', 'Twitch integration is disabled.');
        }

        $user = Auth::user();
        $twitchUsername = $request->input('twitch_username');

        // Fetch Twitch user details
        $result = $this->twitch->getUsers(['login' => $twitchUsername]);

        if (!$result->success() || !$result->data) {
            return redirect()->route('profile')->with('error', 'Invalid Twitch username.');
        }

        $twitchUser = $result->shift();

        // Store Twitch user ID
        $user->update([
            'twitch_id' => $twitchUser->id,
        ]);

        // Fetch and store subscription status
        $this->updateTwitchSubscriptionStatus($user);

        return redirect()->route('profile')->with('success', 'Twitch account linked and subscription status updated!');
    }

    public function updateTwitchSubscriptionStatus(User $user)
    {
        if (!app(IntegrationSettings::class)->twitch_enabled || !$user->twitch_id) {
            return;
        }

        // Fetch Twitch subscription status
        $response = $this->twitch->getUserSubscription([
            'broadcaster_id' => 'YOUR_CHANNEL_ID', // Replace with your Twitch Channel ID
            'user_id' => $user->twitch_id
        ]);

        if ($response->success() && $response->data) {
            $subscription = $response->data[0] ?? null;

            if ($subscription && isset($subscription->tier)) {
                $tier = $subscription->tier / 1000;
                $user->update(['twitch_sub_tier' => $tier]);
            }
        }
    }
}
