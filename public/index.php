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

// If no APP_KEY in the .env file yet, create and persist one (idempotent + locked)
$fp = fopen($envPath, 'cb+');

if ($fp) {
    flock($fp, LOCK_EX);

    $contents = stream_get_contents($fp);
    $contents = $contents === false ? '' : $contents;

    $hasKey = false;
    if (preg_match('/^\s*APP_KEY\s*=\s*(.+)\s*$/m', $contents, $m)) {
        $val = trim($m[1]);
        $hasKey = ($val !== '');
    }

    if (! $hasKey) {
        $appKey = 'base64:' . base64_encode(random_bytes(32));

        // Replace or append APP_KEY in the in-memory contents
        if (preg_match('/^\s*APP_KEY\s*=.*$/m', $contents)) {
            $contents = preg_replace('/^\s*APP_KEY\s*=.*$/m', "APP_KEY={$appKey}", $contents);
        } else {
            $contents = rtrim($contents) . PHP_EOL . "APP_KEY={$appKey}" . PHP_EOL;
        }

        // Write back atomically via the open handle
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $contents);
        fflush($fp);

        // Make it visible to this process immediately (helps during first boot)
        putenv("APP_KEY={$appKey}");
        $_ENV['APP_KEY']    = $appKey;
        $_SERVER['APP_KEY'] = $appKey;
    }

    flock($fp, LOCK_UN);
    fclose($fp);
}

// Bootstrap Laravel
/** @var Application $app */
$app = require __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
