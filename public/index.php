<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

$envPath     = __DIR__.'/../.env';
$examplePath = __DIR__.'/../.env.example';

// Ensure .env exists
if (! file_exists($envPath)) {
    if (file_exists($examplePath)) {
        copy($examplePath, $envPath);
    } else {
        touch($envPath);
    }
}

/**
 * Replace or append a line KEY=VALUE in the given .env file.
 */
$setEnv = static function (string $key, string $value) use ($envPath): void {
    $contents = file_get_contents($envPath) ?: '';
    $pattern  = "/^{$key}=.*$/m";

    if (preg_match($pattern, $contents)) {
        $contents = preg_replace($pattern, "{$key}={$value}", $contents);
    } else {
        $contents = rtrim($contents) . PHP_EOL . "{$key}={$value}" . PHP_EOL;
    }
    file_put_contents($envPath, $contents);
};

// If no APP_KEY yet, create and PERSIST one
$loadedKey = getenv('APP_KEY') ?: ($_ENV['APP_KEY'] ?? null) ?: ($_SERVER['APP_KEY'] ?? null);

if (empty($loadedKey)) {
    $appKey = 'base64:' . base64_encode(random_bytes(32));
    $setEnv('APP_KEY', $appKey);

    // Make it visible to this process immediately
    putenv("APP_KEY={$appKey}");
    $_ENV['APP_KEY']    = $appKey;
    $_SERVER['APP_KEY'] = $appKey;
}

// Bootstrap Laravel
/** @var Application $app */
$app = require __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
