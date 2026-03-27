<?php

namespace App\Http\Controllers\Installer;

use App\Actions\Fortify\PasswordValidationRules;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

class CredentialsController extends Controller
{
    use PasswordValidationRules;

    public function showForm()
    {
        return view('vendor.installer.credentials');
    }

    public function saveForm(Request $request)
    {
        if ($request->has('skip')) {
            $email    = null;
            $password = null;
            $username = null;
        } else {
            $request->validate([
                'ADMIN_EMAIL'    => ['required', 'string', 'email', 'max:255'],
                'ADMIN_USERNAME' => ['required', 'string', 'max:255', 'alpha_dash'],
                'ADMIN_PASSWORD' => ['required', Password::min(8)],
            ]);
            $email    = $request->input('ADMIN_EMAIL');
            $password = $request->input('ADMIN_PASSWORD');
            $username = $request->input('ADMIN_USERNAME');
        }

        // store in session for the final step
        session([
            'installer.credentials.email'    => $email,
            'installer.credentials.password' => $password,
            'installer.credentials.username' => $username,
            'installer.credentials.firstname' => $request->input('ADMIN_FIRSTNAME'),
            'installer.credentials.lastname' => $request->input('ADMIN_LASTNAME'),
        ]);

        // move on to Database step
        return redirect()->route('LaravelInstaller::database');
    }
}
