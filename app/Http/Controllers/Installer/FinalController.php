<?php

namespace App\Http\Controllers\Installer;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Froiden\LaravelInstaller\Helpers\InstalledFileManager;

class FinalController extends Controller
{
    /**
     * Update installed file and display finished view.
     */
    public function finish(Request $request, InstalledFileManager $fileManager)
    {
        // mark “installed”
        $fileManager->update();

        // pull credentials from session
        $email    = $request->session()->pull('installer.credentials.email');
        $password = $request->session()->pull('installer.credentials.password');
        $username = $request->session()->pull('installer.credentials.username');

        // clear the entire credentials bag (just in case)
        $request->session()->forget('installer.credentials');

        // render the final view, passing them along
        return view('vendor.installer.finished', [
            'email'    => $email,
            'password' => $password,
            'username' => $username,
        ]);
    }
}
