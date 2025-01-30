<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Patreon\API;
use Patreon\OAuth;
use App\Settings\IntegrationSettings;

class UpdatePatreonSupporters extends Command
{
    protected $signature = 'patreon:update-supporters';
    protected $description = 'Fetch and update Patreon supporter status for linked users.';

    // protected OAuth $patreonOAuth;

    public function __construct()
    {
        parent::__construct();
        // $this->patreonOAuth = new OAuth(
        //     config('services.patreon.client_id'),
        //     config('services.patreon.client_secret')
        // );
    }

    public function handle()
    {
        // $settings = app(IntegrationSettings::class);
        // if (!$settings->patreon_enabled) {
        //     $this->info("Patreon integration is disabled.");
        //     return;
        // }

        // $users = User::whereNotNull('patreon_id')->get();

        // foreach ($users as $user) {
        //     $this->updatePatreonSupporterStatus($user);
        // }

        // $this->info("Patreon supporter statuses updated successfully.");
    }

    protected function updatePatreonSupporterStatus(User $user)
    {
        // $apiClient = new API($user->patreon_access_token);
        // $response = $apiClient->fetch_user();

        // if (!$response) {
        //     return;
        // }

        // $patronData = $response['data'] ?? null;
        // $membership = $response['included'][0]['attributes'] ?? null;

        // if ($membership && isset($membership['currently_entitled_tiers'])) {
        //     $tiers = collect($membership['currently_entitled_tiers'])->map(fn($tier) => $tier['title'])->implode(', ');
        //     $user->update(['patreon_tier' => $tiers]);
        // }
    }
}
