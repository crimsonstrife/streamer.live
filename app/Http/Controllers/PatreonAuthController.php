<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PatreonAuthController extends Controller
{
    public function link(Request $request)
    {
        if (!app(IntegrationSettings::class)->patreon_enabled) {
            return redirect()->route('profile')->with('error', 'Patreon integration is disabled.');
        }

        $user = Auth::user();
        $patreonUsername = $request->input('patreon_username');

        // Fetch Patreon user ID (Patreon does not allow searching by username, so users must enter their Patreon ID)
        $response = Http::withToken(env('PATREON_CLIENT_SECRET'))
            ->get("https://www.patreon.com/api/oauth2/v2/identity");

        if ($response->failed()) {
            return redirect()->route('profile')->with('error', 'Could not validate Patreon user.');
        }

        $patreonUser = $response->json()['data'] ?? null;

        if (!$patreonUser) {
            return redirect()->route('profile')->with('error', 'Invalid Patreon account.');
        }

        // Store Patreon user ID (not tokens)
        $user->update(['patreon_id' => $patreonUser['id']]);

        return redirect()->route('profile')->with('success', 'Patreon account linked!');
    }
}
