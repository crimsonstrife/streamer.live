<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TwitchService
{
    private $clientId;
    private $clientSecret;
    private $accessToken;

    public function __construct()
    {
        if (!config('services.twitch.enabled', false)) {
            return;
        }

        $this->clientId = config('services.twitch.client_id');
        $this->clientSecret = config('services.twitch.client_secret');
        $this->authenticate();
    }

    private function authenticate()
    {
        // Check if Twitch credentials are configured
        if (empty($this->clientId) || empty($this->clientSecret) || $this->clientId === 'your-client-id' || $this->clientSecret === 'your-client-secret') {
            \Log::warning('Twitch authentication skipped: Missing client ID or secret.');
            return; // Prevent further execution
        }

        $response = Http::post('https://id.twitch.tv/oauth2/token', [
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'grant_type' => 'client_credentials',
        ]);

        $json = $response->json();

        if (!isset($json['access_token'])) {
            throw new \Exception('Failed to retrieve Twitch access token: ' . json_encode($json));
        }

        $this->accessToken = $json['access_token'];
    }

    public function getStreamStatus($username)
    {
        $response = Http::withHeaders([
            'Client-ID' => $this->clientId,
            'Authorization' => 'Bearer ' . $this->accessToken,
        ])->get('https://api.twitch.tv/helix/streams', [
            'user_login' => $username,
        ]);

        return $response->json()['data'][0] ?? null;
    }
}
