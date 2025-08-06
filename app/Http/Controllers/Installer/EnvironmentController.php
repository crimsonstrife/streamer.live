<?php

namespace App\Http\Controllers\Installer;

use Illuminate\Routing\Controller;
use App\Utilities\Installer\Helpers\EnvironmentManager;
use Froiden\LaravelInstaller\Request\UpdateRequest;
use Illuminate\Support\Facades\Artisan;

class EnvironmentController extends Controller
{
    protected EnvironmentManager $environmentManager;

    public function __construct(EnvironmentManager $environmentManager)
    {
        $this->environmentManager = $environmentManager;
    }

    public function environment()
    {
        $envConfig = $this->environmentManager->getEnvContent();
        return view('vendor.installer.environment', compact('envConfig'));
    }

    public function save(UpdateRequest $request)
    {
        // Generate a new key exactly as `artisan key:generate` would
        Artisan::call('key:generate', ['--show' => true]);
        $rawKey = Artisan::output();
        $appKey = trim($rawKey);

        // Merge it into the request so saveFile() will write it
        $request->merge(['APP_KEY' => $appKey]);

        // Delegate back to the EnvironmentManager
        return $this->environmentManager->saveFile($request);
    }
}
