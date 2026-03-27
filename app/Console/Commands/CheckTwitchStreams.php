<?php

namespace App\Console\Commands;

use App\Jobs\CheckStreamerStatus;
use App\Settings\TwitchSettings;
use Illuminate\Console\Command;

class CheckTwitchStreams extends Command
{
    protected $signature = 'twitch:check';

    protected $description = 'Check Twitch stream status and notify platforms';

    public function handle(): void
    {
        $settings = app(TwitchSettings::class);

        if (! $settings->enable_integration) {
            $this->warn('Twitch integration is disabled.');

            return;
        }

        $channel = $settings->channel_name ?: config('services.twitch.channel_name');

        if (empty($channel)) {
            $this->error('No Twitch channel name configured.');

            return;
        }

        CheckStreamerStatus::dispatch($channel);
        $this->info("Dispatched CheckStreamerStatus for: {$channel}");
    }
}
