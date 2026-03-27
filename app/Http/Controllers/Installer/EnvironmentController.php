<?php

namespace App\Http\Controllers\Installer;

use Illuminate\Routing\Controller;
use App\Utilities\Installer\Helpers\EnvironmentManager;
use Froiden\LaravelInstaller\Request\UpdateRequest;
use Random\RandomException;

class EnvironmentController extends Controller
{
    public function __construct(protected EnvironmentManager $environmentManager)
    {
    }

    public function environment()
    {
        $envConfig = $this->environmentManager->getEnvContent();
        return view('vendor.installer.environment', compact('envConfig'));
    }

    /**
     * @throws RandomException
     */
    public function save(UpdateRequest $request)
    {
        // Do NOT generate a new key here — it’s already persisted in .env from index.php
        return $this->environmentManager->saveFile($request);
    }
}
