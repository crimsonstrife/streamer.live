<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TwitchAuthController extends Controller
{
    public function link(Request $request)
    {
        if (!app(IntegrationSettings::class)->twitch_enabled) {
            return redirect()->route('profile')->with('error', 'Twitch integration is disabled.');
        }

        $user = Auth::user();
        $twitchUsername = $request->input('twitch_username');

        // Fetch Twitch user ID from username
        $response = Http::withHeaders([
            'Client-ID' => env('TWITCH_CLIENT_ID'),
            'Authorization' => 'Bearer ' . env('TWITCH_CLIENT_SECRET')
        ])->get("https://api.twitch.tv/helix/users?login={$twitchUsername}");

        $twitchUser = $response->json()['data'][0] ?? null;

        if (!$twitchUser) {
            return redirect()->route('profile')->with('error', 'Invalid Twitch username.');
        }

        // Store Twitch user ID (not tokens)
        $user->update(['twitch_id' => $twitchUser['id']]);

        return redirect()->route('profile')->with('success', 'Twitch account linked!');
    }
}
