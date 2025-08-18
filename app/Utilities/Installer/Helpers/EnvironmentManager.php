<?php

namespace App\Utilities\Installer\Helpers;

use Froiden\LaravelInstaller\Helpers\Reply;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Random\RandomException;

class EnvironmentManager
{
    private string $envPath;
    private string $envExamplePath;

    public function __construct()
    {
        $this->envPath       = base_path('.env');
        $this->envExamplePath = base_path('.env.example');
    }

    /**
     * Get current .env contents (ensuring the file exists).
     */
    public function getEnvContent(): string
    {
        if (! file_exists($this->envPath)) {
            if (file_exists($this->envExamplePath)) {
                copy($this->envExamplePath, $this->envPath);
            } else {
                touch($this->envPath);
            }
        }

        return file_get_contents($this->envPath);
    }

    /**
     * Save DB settings + APP_URL (+ APP_KEY if missing), then flip runtime config.
     *
     * @param Request $input
     * @return RedirectResponse|array
     * @throws RandomException
     */
    public function saveFile(Request $input): array|RedirectResponse
    {
        $env = $this->getEnvContent();

        // Gather inputs (default to MySQL on 3306)
        $driver = $input->get('driver', 'mysql');
        $dbHost = $input->get('hostname', '127.0.0.1');
        $dbPort = $input->get('port', '3306');
        $dbName = $input->get('database');
        $dbUser = $input->get('username');
        $dbPass = $input->get('password');
        $appUrl = request()->getSchemeAndHttpHost();

        // Remove any existing DB_* / APP_URL / APP_KEY lines (handle Windows/Unix newlines).
        $env = preg_replace('/^(DB_(CONNECTION|HOST|PORT|DATABASE|USERNAME|PASSWORD|SOCKET|URL))=.*$\R?/mi', '', $env);
        $env = preg_replace('/^APP_URL=.*$\R?/mi', '', $env);
        $env = preg_replace('/^APP_KEY=.*$\R?/mi', '', $env);

        // Helper to quote env values when needed
        $q = static function ($v): string {
            if ($v === null) return '';
            $v = (string) $v;
            return preg_match('/\s|"|#/', $v) ? '"' . str_replace('"', '\"', $v) . '"' : $v;
        };

        // Ensure we end with one newline before appending
        $env = rtrim($env) . PHP_EOL;

        // Ensure a stable APP_KEY (generate if the current process doesn't have a valid one)
        $existingKey = env('APP_KEY');
        if (! $existingKey || ! Str::startsWith($existingKey, 'base64:')) {
            $plain   = random_bytes(32);
            $appKey  = 'base64:' . base64_encode($plain);
        } else {
            $appKey = $existingKey;
        }

        // Append DB block + APP_URL + APP_KEY
        $env .= <<<ENV

DB_CONNECTION={$driver}
DB_HOST={$q($dbHost)}
DB_PORT={$q($dbPort)}
DB_DATABASE={$q($dbName)}
DB_USERNAME={$q($dbUser)}
DB_PASSWORD={$q($dbPass)}
APP_URL={$q($appUrl)}
APP_KEY={$appKey}

ENV;

        try {
            // Persist .env
            file_put_contents($this->envPath, $env);

            // Switch runtime DB config for THIS request
            config([
                'database.default'                               => $driver,
                "database.connections.$driver.host"              => $dbHost,
                "database.connections.$driver.port"              => $dbPort,
                "database.connections.$driver.database"          => $dbName,
                "database.connections.$driver.username"          => $dbUser,
                "database.connections.$driver.password"          => $dbPass,
            ]);

            DB::purge($driver);
            DB::setDefaultConnection($driver);
            // verify the connection now (fail fast with clean error)
            DB::connection()->getPdo();

            // Switch the runtime encrypter to the (new) APP_KEY
            config(['app.key' => $appKey]);
            $keyBytes = base64_decode(Str::after($appKey, 'base64:'));
            app()->instance('encrypter', new Encrypter($keyBytes, config('app.cipher')));

            $message = 'Database settings correct';

            // Immediately move to the next step; avoid rendering views that might hit DB again
            if (! $input->ajax() && ! $input->wantsJson()) {
                return redirect()
                    ->route('LaravelInstaller::requirements')
                    ->with('message', $message);
            }

            return Reply::redirect(route('LaravelInstaller::requirements'), $message);

        } catch (\Throwable $e) {
            return Reply::error('ENV write error: ' . $e->getMessage());
        }
    }
}
