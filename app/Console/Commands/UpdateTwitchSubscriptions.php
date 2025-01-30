<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use romanzipp\Twitch\Twitch;
use romanzipp\Twitch\Enums\GrantType;

class UpdateTwitchSubscriptions extends Command
{
    protected $signature = 'twitch:update-subscriptions';
    protected $description = 'Fetch and update Twitch subscription status for all linked users.';
    protected Twitch $twitch;

    public function __construct()
    {
        parent::__construct();
        $this->twitch = new Twitch();
        $this->twitch->setClientId(config('twitch-api.client_id'));
        $this->twitch->setClientSecret(config('twitch-api.client_secret'));

        // Automatically generate an OAuth token
        $tokenResponse = $this->twitch->getOAuthToken(null, GrantType::CLIENT_CREDENTIALS, ['user:read:subscriptions']);

        if ($tokenResponse->success()) {
            $this->twitch->setToken($tokenResponse->data()->access_token);
        }
    }

    public function handle()
    {
        $settings = app(IntegrationSettings::class);
        if (!$settings->twitch_enabled) {
            $this->info("Twitch integration is disabled.");
            return;
        }

        $users = User::whereNotNull('twitch_id')->get();

        foreach ($users as $user) {
            $this->updateTwitchSubscriptionStatus($user);
        }

        $this->info("Twitch subscriptions updated successfully.");
    }

    protected function updateTwitchSubscriptionStatus(User $user)
    {
        // Fetch Twitch subscription status
        $response = $this->twitch->getUserSubscription([
            'broadcaster_id' => 'YOUR_CHANNEL_ID',
            'user_id' => $user->twitch_id
        ]);

        if ($response->success() && $response->data) {
            $subscription = $response->data[0] ?? null;

            if ($subscription && isset($subscription->tier)) {
                $tier = $subscription->tier / 1000;
                $user->update(['twitch_sub_tier' => $tier]);
            }
        }
    }
}
