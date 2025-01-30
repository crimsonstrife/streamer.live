<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FourthwallAuthController extends Controller
{
    public function link(Request $request)
    {
        if (!app(IntegrationSettings::class)->fourthwall_enabled) {
            return redirect()->route('profile')->with('error', 'Fourthwall integration is disabled.');
        }

        $user = Auth::user();
        $fourthwallId = $request->input('fourthwall_id');

        // Verify Fourthwall ID
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('FOURTHWALL_API_KEY')
        ])->get("https://api.fourthwall.com/v1/users/{$fourthwallId}");

        if ($response->failed()) {
            return redirect()->route('profile')->with('error', 'Invalid Fourthwall ID.');
        }

        $user->update(['fourthwall_id' => $fourthwallId]);

        return redirect()->route('profile')->with('success', 'Fourthwall account linked!');
    }
}
