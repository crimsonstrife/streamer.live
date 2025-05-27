<?php

namespace App\Console\Commands;

use App\Services\TwitchService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;

class SyncTwitchSchedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature   = 'twitch:sync-schedule {limit=10}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync Twitch schedule segments into the events table';

    /**
     * Execute the console command.
     * @throws ConnectionException
     */
    public function handle(TwitchService $twitch): void
    {
        $limit = (int) $this->argument('limit');
        $twitch->syncScheduleToEvents($limit);
        $this->info('Twitch schedule sync complete.');
    }
}
