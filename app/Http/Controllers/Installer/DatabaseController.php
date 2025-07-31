<?php

namespace App\Http\Controllers\Installer;

use Froiden\LaravelInstaller\Helpers\DatabaseManager;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class DatabaseController extends Controller
{
    private DatabaseManager $databaseManager;

    public function __construct(DatabaseManager $databaseManager)
    {
        $this->databaseManager = $databaseManager;
    }

    /**
     * Migrate and seed the database.
     */
    public function database(Request $request)
    {
        set_time_limit(0);
        $response = $this->databaseManager->migrateAndSeed();

        // If JavaScript (ajax) is driving this, return JSON that helper.js understands:
        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'status'  => 'success',
                'message' => $response,
                'action'  => 'redirect',
                'url'     => route('LaravelInstaller::final'),
            ]);
        }

        // Otherwise do a normal 302 redirect
        return redirect()
            ->route('LaravelInstaller::final')
            ->with(['message' => $response]);
    }
}
