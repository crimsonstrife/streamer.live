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
        return file_get_contents($this->envPath) ?: '';
    }

    /**
     * Save DB settings + APP_URL (keep existing APP_KEY), flip runtime config.
     *
     * @param Request $input
     * @return RedirectResponse|array
     */
    public function saveFile(Request $input): array|RedirectResponse
    {
        // Collect values (defaults for MySQL)
        $driver = $input->string('driver')->toString() ?: 'mysql';
        $dbHost = $input->string('hostname')->toString() ?: '127.0.0.1';
        $dbPort = $input->string('port')->toString() ?: ($driver === 'mysql' ? '3306' : '');
        $dbName = $input->string('database')->toString();
        $dbUser = $input->string('username')->toString();
        $dbPass = $input->string('password')->toString();
        $appUrl = request()->getSchemeAndHttpHost();

        // Prepare new key/values to merge
        $updates = [
            'DB_CONNECTION' => $driver,
            'DB_HOST'       => $dbHost,
            'DB_PORT'       => $dbPort,
            'DB_DATABASE'   => $dbName,
            'DB_USERNAME'   => $dbUser,
            'DB_PASSWORD'   => $dbPass,
            'APP_URL'       => $appUrl,
        ];

        // Backup current .env
        $original = $this->getEnvContent();
        $backup   = $this->envPath.'.installer.bak.'.date('Ymd_His');
        @file_put_contents($backup, $original);

        // Merge: replace existing lines by key; append missing keys at bottom.
        $lines     = preg_split("/\r\n|\n|\r/", $original) ?: [];
        $seenKeys  = [];

        $isTargetKey = static function (string $line, string $key): bool {
            // Match exact KEY=… at line start, ignoring whitespace
            return (bool) preg_match('/^\s*'.preg_quote($key, '/').'=/i', $line);
        };

        $quote = static function (?string $v): string {
            $v ??= '';
            // Quote if contains spaces, #, or quotes
            return preg_match('/\s|"|#/', $v) ? '"'.str_replace('"', '\"', $v).'"' : $v;
        };

        // Replace in-place
        foreach ($lines as &$line) {
            foreach ($updates as $key => $val) {
                if ($isTargetKey($line, $key)) {
                    $line = $key.'='.$quote($val);
                    $seenKeys[$key] = true;
                }
            }
        }
        unset($line);

        // Append any keys not present
        foreach ($updates as $key => $val) {
            if (! isset($seenKeys[$key])) {
                $lines[] = $key.'='.$quote($val);
            }
        }

        // Atomic write
        $newEnv = rtrim(implode(PHP_EOL, $lines)).PHP_EOL;
        try {
            $tmp = $this->envPath.'.tmp';
            file_put_contents($tmp, $newEnv);
            @chmod($tmp, 0664);
            $renameSuccess = @rename($tmp, $this->envPath); // atomic on same filesystem
            if (!$renameSuccess) {
                // Fallback: non-atomic write if rename fails (e.g., cross-filesystem)
                $fallbackSuccess = @file_put_contents($this->envPath, $newEnv);
                // Clean up temp file
                @unlink($tmp);
                if ($fallbackSuccess === false) {
                    throw new \RuntimeException('Failed to write .env file atomically and non-atomically.');
                }
            }
        } catch (\Throwable $e) {
            // restore backup on failure
            @file_put_contents($this->envPath, $original);
            return Reply::error('ENV write error: '.$e->getMessage());
        }

        // Flip runtime DB and encrypter for THIS request
        try {
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
            DB::connection()->getPdo(); // fail fast

            // Rebind encrypter to persisted APP_KEY so decrypt/encrypt works now
            $appKey  = env('APP_KEY');
            if ($appKey && Str::startsWith($appKey, 'base64:')) {
                $keyBytes = base64_decode(Str::after($appKey, 'base64:'));
                app()->instance('encrypter', new Encrypter($keyBytes, config('app.cipher')));
            }

            $message = 'Database settings correct';

            if (! $input->ajax() && ! $input->wantsJson()) {
                return redirect()
                    ->route('LaravelInstaller::requirements')
                    ->with('installer_message', $message);
            }

            session()->flash('installer_message', $message);
            return Reply::redirect(route('LaravelInstaller::requirements'), $message);

        } catch (\Throwable $e) {
            // If runtime flip fails, restore backup so you’re not left with a broken .env
            @file_put_contents($this->envPath, $original);
            return Reply::error('DB config error: '.$e->getMessage());
        }
    }
}
