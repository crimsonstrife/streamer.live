<?php

namespace App\Utilities\Installer\Helpers;

use Froiden\LaravelInstaller\Helpers\Reply;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EnvironmentManager
{
    private string $envPath;
    private string $envExamplePath;

    public function __construct()
    {
        $this->envPath        = base_path('.env');
        $this->envExamplePath = base_path('.env.example');
    }

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
     * Save DB settings + APP_URL, keep existing APP_KEY stable, flip runtime config.
     */
    public function saveFile(Request $input): array|RedirectResponse
    {
        $env = $this->getEnvContent();

        $driver = $input->get('driver', 'mysql');
        $dbHost = $input->get('hostname', '127.0.0.1');
        $dbPort = $input->get('port', '3306');
        $dbName = $input->get('database');
        $dbUser = $input->get('username');
        $dbPass = $input->get('password');
        $appUrl = request()->getSchemeAndHttpHost();

        // Strip DB_* and APP_URL (but leave APP_KEY alone)
        $env = preg_replace('/^(DB_(CONNECTION|HOST|PORT|DATABASE|USERNAME|PASSWORD|SOCKET|URL))=.*$\R?/mi', '', $env);
        $env = preg_replace('/^APP_URL=.*$\R?/mi', '', $env);

        $q = static function ($v): string {
            if ($v === null) return '';
            $v = (string) $v;
            return preg_match('/\s|"|#/', $v) ? '"' . str_replace('"', '\"', $v) . '"' : $v;
        };

        $env = rtrim($env) . PHP_EOL;

        // Use the persisted key from .env (index.php ensured it exists)
        $appKey = env('APP_KEY');
        if (! $appKey || ! Str::startsWith($appKey, 'base64:')) {
            // ultra-safe fallback (shouldn’t happen because index.php set it)
            $appKey = 'base64:' . base64_encode(random_bytes(32));
            $env .= "APP_KEY={$appKey}" . PHP_EOL;
        }

        $env .= <<<ENV

DB_CONNECTION={$driver}
DB_HOST={$q($dbHost)}
DB_PORT={$q($dbPort)}
DB_DATABASE={$q($dbName)}
DB_USERNAME={$q($dbUser)}
DB_PASSWORD={$q($dbPass)}
APP_URL={$q($appUrl)}

ENV;

        try {
            file_put_contents($this->envPath, $env);

            // Flip DB connection for THIS request
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
            DB::connection()->getPdo(); // fail fast if bad creds

            // Rebind encrypter with the persisted key so decrypt/encrypt works now
            config(['app.key' => $appKey]);
            $keyBytes = base64_decode(Str::after($appKey, 'base64:'));
            app()->instance('encrypter', new Encrypter($keyBytes, config('app.cipher')));

            $message = 'Database settings correct';

            if (! $input->ajax() && ! $input->wantsJson()) {
                return redirect()->route('LaravelInstaller::requirements')
                    ->with('installer_message', $message);
            }

            // Keep a flash around so next page can show it even after AJAX redirect
            session()->flash('installer_message', $message);

            return Reply::redirect(route('LaravelInstaller::requirements'), $message);

        } catch (\Throwable $e) {
            return Reply::error('ENV write error: ' . $e->getMessage());
        }
    }
}
