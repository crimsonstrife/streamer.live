<?php

namespace App\Utilities\Installer\Helpers;

use Exception;
use Froiden\LaravelInstaller\Helpers\Reply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use PDO;
use PDOException;

class EnvironmentManager
{
    /**
     * @var string
     */
    private $envPath;

    /**
     * @var string
     */
    private $envExamplePath;

    /**
     * Set the .env and .env.example paths.
     */
    public function __construct()
    {
        $this->envPath = base_path('.env');
        $this->envExamplePath = base_path('.env.example');
    }

    /**
     * Get the content of the .env file.
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
     * Save the edited content to the file.
     *
     * @return RedirectResponse|array|string[]
     */
    public function saveFile(Request $input): array|RedirectResponse
    {
        $message   = trans('messages.environment.success');
        $env       = $this->getEnvContent();

        // Gather inputs (add driver & port; default to mysql/3306)
        $driver   = $input->get('driver', 'mysql');       // add a <select> in your form if you support others
        $dbHost   = $input->get('hostname', '127.0.0.1');
        $dbPort   = $input->get('port',     '3306');
        $dbName   = $input->get('database');
        $dbUser   = $input->get('username');
        $dbPass   = $input->get('password');
        $appUrl   = request()->getSchemeAndHttpHost();

        // Strip any existing DB_* lines cleanly (handles Windows/Unix newlines)
        $env = preg_replace(
            '/^(DB_(CONNECTION|HOST|PORT|DATABASE|USERNAME|PASSWORD|SOCKET|URL))=.*$\R?/mi',
            '',
            $env
        );
        // also strip APP_URL so we can rewrite it
        $env = preg_replace('/^APP_URL=.*$\R?/mi', '', $env);

        // Ensure we end with exactly one newline before appending
        $env = rtrim($env) . PHP_EOL;

        // Helper to quote env values safely
        $q = function ($v) {
            if ($v === null) return '';
            // quote if it has spaces, #, or quotes
            if (preg_match('/\s|"|#/', (string) $v)) {
                return '"' . str_replace('"', '\"', (string) $v) . '"';
            }
            return (string) $v;
        };

        // Append the database + app url block
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

            // optional but helpful: make sure next request sees fresh config
            Artisan::call('config:clear');
            Artisan::call('cache:clear');

            $message = 'Database settings correct';

            // For non-AJAX callers, do a real redirect (your override)
            if (! $input->ajax() && ! $input->wantsJson()) {
                return redirect()->route('LaravelInstaller::requirements')
                    ->with('message', $message);
            }

            // For AJAX callers, return JSON understood by helper.js
            return Reply::redirect(
                route('LaravelInstaller::requirements'),
                $message
            );

        } catch (\Throwable $e) {
            return Reply::error('ENV write error: '.$e->getMessage());
        }
    }
}
