<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Make sure we have *some* .env on disk. If none, clone the example.
$envPath = __DIR__.'/../.env';
$examplePath = __DIR__.'/../.env.example';

if (! file_exists($envPath)) {
    if (file_exists($examplePath)) {
        copy($examplePath, $envPath);
    }
}

/*
|--------------------------------------------------------------------------
| Temporary APP_KEY for installer
|--------------------------------------------------------------------------
| If there's no .env yet (fresh install), spin up an ephemeral key so that
| the framework will boot, show the installer wizard, and *then* overwrite
| with a persistent key in the installer’s save() method.
*/
$loadedKey = getenv('APP_KEY') ?: ($_ENV['APP_KEY'] ?? null) ?: ($_SERVER['APP_KEY'] ?? null);

if (empty($loadedKey)) {
    $tempKey = 'base64:'.base64_encode(random_bytes(32));
    // Make sure all getenv()/$_ENV/$_SERVER calls see it
    putenv("APP_KEY={$tempKey}");
    $_ENV['APP_KEY'] = $tempKey;
    $_SERVER['APP_KEY'] = $tempKey;
}

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
