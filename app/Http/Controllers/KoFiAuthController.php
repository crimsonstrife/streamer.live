<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Settings\IntegrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class KoFiAuthController extends Controller
{
    public function link(Request $request)
    {
        if (!app(IntegrationSettings::class)->ko_fi_enabled) {
            return redirect()->route('profile')->with('error', 'Ko-fi integration is disabled.');
        }

        $user = Auth::user();
        $koFiUsername = $request->input('ko_fi_username');

        // Verify Ko-fi username (Ko-fi does not have an API for user validation, so we assume the username is correct)
        $user->update(['ko_fi_id' => $koFiUsername]);

        return redirect()->route('profile')->with('success', 'Ko-fi account linked!');
    }
}
