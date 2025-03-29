<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Log;
use RuntimeException;
use Throwable;

class TwitchService
{
    private string $clientId;

    private string $clientSecret;

    private string $accessToken;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        if (! config('services.twitch.enabled', false)) {
            return;
        }

        $this->clientId = config('services.twitch.client_id');
        $this->clientSecret = config('services.twitch.client_secret');
        $this->authenticate();
    }

    /**
     * @throws ConnectionException
     * @throws Exception
     */
    private function authenticate(): void
    {
        // Check if Twitch credentials are configured
        if (empty($this->clientId) || empty($this->clientSecret) || $this->clientId === 'your-client-id' || $this->clientSecret === 'your-client-secret') {
            Log::warning('Twitch authentication skipped: Missing client ID or secret.');

            return; // Prevent further execution
        }

        $response = Http::post('https://id.twitch.tv/oauth2/token', [
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'grant_type' => 'client_credentials',
        ]);

        $json = $response->json();

        if (! isset($json['access_token'])) {
            throw new RuntimeException('Failed to retrieve Twitch access token: '.json_encode($json, JSON_THROW_ON_ERROR));
        }

        $this->accessToken = $json['access_token'];
    }

    public function getStreamData($username)
    {
        $username = strtolower(trim($username));

        Log::debug("TwitchService: Fetching stream data for user: {$username}");

        try {
            $response = Http::withHeaders([
                'Client-ID' => $this->clientId,
                'Authorization' => 'Bearer '.$this->accessToken,
            ])->get('https://api.twitch.tv/helix/streams', [
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
