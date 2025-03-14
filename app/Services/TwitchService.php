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
        $this->clientId = config('services.twitch.client_id');
        $this->clientSecret = config('services.twitch.client_secret');
        $this->authenticate();
    }

    private function authenticate()
    {
        $response = Http::post('https://id.twitch.tv/oauth2/token', [
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'grant_type' => 'client_credentials',
        ]);

        $this->accessToken = $response->json()['access_token'];
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
