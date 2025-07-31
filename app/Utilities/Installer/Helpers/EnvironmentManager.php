<?php

namespace App\Utilities\Installer\Helpers;

use Exception;
use Froiden\LaravelInstaller\Helpers\Reply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PDO;

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
     *
     * @return string
     */
    public function getEnvContent(): string
    {
        if (!file_exists($this->envPath)) {
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
     * @param Request $input
     * @return RedirectResponse|array|string[]
     */
    public function saveFile(Request $input): array|RedirectResponse
    {

        $message = trans('messages.environment.success');

        $env = $this->getEnvContent();
        $dbName = $input->get('database');
        $dbHost = $input->get('hostname');
        $dbPort = $input->get('port');
        $dbUsername = $input->get('username');
        $dbPassword = $input->get('password');

        $databaseSetting = 'DB_HOST=' . $dbHost . '
        DB_PORT=' . $dbPort . '
DB_DATABASE=' . $dbName . '
DB_USERNAME=' . $dbUsername . '
DB_PASSWORD="' . $dbPassword . '"
APP_URL="' . request()->getSchemeAndHttpHost() . '"
';

        // @ignoreCodingStandard
        $rows       = explode("\n", $env);
        $unwantedKeys = [
            'DB_HOST',
            'DB_PORT',
            'DB_DATABASE',
            'DB_USERNAME',
            'DB_PASSWORD',
            'APP_URL'
        ];
        $unwantedPattern = '/^(' . implode('|', array_map('preg_quote', $unwantedKeys)) . ')=/i';
        $cleanArray = preg_grep($unwantedPattern, $rows, PREG_GREP_INVERT);

        $cleanString = implode("\n", $cleanArray);


        $env = $cleanString.$databaseSetting;
        try {
            $dbh = new PDO('mysql:host='.$dbHost.';port='.$dbPort, $dbUsername, $dbPassword);

            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // First check if database exists
            $stmt = $dbh->query('CREATE DATABASE IF NOT EXISTS `'.$dbName.'` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
            // Save settings in session
            session()->put('db_username', $dbUsername);
            session()->put('db_password', $dbPassword);
            session()->put('db_name', $dbName);
            session()->put('db_host', $dbHost);
            session()->put('db_port', $dbPort);
            session()->put('db_success', true);
            $message = 'Database settings correct';

            try {
                file_put_contents($this->envPath, $env);
            } catch (Exception $e) {
                $message = trans('messages.environment.errors');
            }

            $redirectTo = route('LaravelInstaller::requirements');
            $message    = 'Database settings correct';

            // Non-AJAX requests get a real 302
            if (! $input->ajax() && ! $input->wantsJson()) {
                return redirect()
                    ->to($redirectTo)
                    ->with('message', $message);
            }

            // AJAX (or wantsJson) gets the JSON that helper.js knows how to handle
            return Reply::redirect($redirectTo, $message);


        } catch (\PDOException|\Exception $e) {
            return Reply::error('DB Error: ' . $e->getMessage());
        }
    }
}
