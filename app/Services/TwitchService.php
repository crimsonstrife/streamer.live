<?php

namespace App\Services;

use App\Settings\TwitchSettings;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Log;
use RuntimeException;
use Throwable;

class TwitchService
{
    protected bool $enabled;

    public ?string $channel_name;

    public ?string $client_id;

    public ?string $client_secret;

    private ?string $access_token;

    public bool $ssl_verify;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->enabled = app(TwitchSettings::class)->enable_integration;
        $this->channel_name = app(TwitchSettings::class)->channel_name;
        $this->client_id = app(TwitchSettings::class)->client_id;
        $this->client_secret = app(TwitchSettings::class)->client_secret;
        $this->ssl_verify = app(TwitchSettings::class)->ssl_verify;
        $this->authenticate();
    }

    /**
     * @throws ConnectionException
     * @throws Exception
     */
    private function authenticate(): void
    {
        // Check if Twitch credentials are configured
        if (empty($this->client_id) || empty($this->client_secret) || $this->client_id === 'your-client-id' || $this->client_secret === 'your-client-secret') {
            Log::warning('Twitch authentication skipped: Missing client ID or secret.');

            return; // Prevent further execution
        }

        if (empty($this->channel_name)) {
            Log::warning('Twitch authentication skipped: Missing channel or username.');

            return; // Prevent further execution
        }

        $response = Http::withOptions(['verify' => $this->ssl_verify])->post('https://id.twitch.tv/oauth2/token', [
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
            'grant_type' => 'client_credentials',
        ]);

        $json = $response->json();

        if (! isset($json['access_token'])) {
            throw new RuntimeException('Failed to retrieve Twitch access token: '.json_encode($json, JSON_THROW_ON_ERROR));
        }

        $this->access_token = $json['access_token'];
    }

    public function getStreamData($username = null)
    {
        if (empty($username)) {
            $username = $this->channel_name;
        }

        $username = strtolower(trim($username));

        Log::debug("TwitchService: Fetching stream data for user: {$username}");

        try {
            $response = Http::withOptions([
                'verify' => $this->ssl_verify,
            ])
                ->withHeaders([
                    'Client-ID' => $this->client_id,
                    'Authorization' => 'Bearer '.$this->access_token,
                ])
                ->get('https://api.twitch.tv/helix/streams', [
                    'user_login' => $username,
                ]);

            Log::debug("TwitchService: Response status: {$response->status()}");
            if (config('app.debug')) {
                Log::debug('TwitchService: Full response: ', $response->json());
            }

            $data = $response->json()['data'] ?? null;

            if (! $data) {
                Log::info("TwitchService: No stream data found for {$username}. Possibly offline.");
            }

            return $data;
        } catch (Throwable $e) {
            Log::error("TwitchService: Error fetching stream data for {$username}: ".$e->getMessage());

            return null;
        }
    }
}
