<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use App\Models\SecurityObjects\IPFilter;

class UpdateIPBlacklist extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:blacklist';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and update blacklisted IPs';

    /**
     * Execute the console command.
     * @throws ConnectionException
     */
    public function handle(): void
    {
        $response = Http::get('https://api.abuseipdb.com/api/v2/blacklist', [
            'apiKey' => config('services.abuseipdb.api_key'),
        ]);

        $blacklist = $response->json()['data'] ?? [];

        foreach ($blacklist as $ipData) {
            IPFilter::updateOrCreate(
                ['ip_address' => $ipData['ipAddress']],
                ['type' => 'blacklist', 'reason' => $ipData['abuseConfidenceScore'] . '% confidence score from AbuseIPDB']
            );
        }

        $this->info('Blacklist updated successfully.');
    }
}
