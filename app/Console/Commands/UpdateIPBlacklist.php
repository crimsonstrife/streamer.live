<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Models\SecurityObjects\IPFilter;
use Illuminate\Support\Facades\Log;

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
     */
    public function handle(): void
    {
        // bump memory for this process
        ini_set('memory_limit', '256M');

        Log::info('[update:blacklist] Starting blacklist update.');
        $this->info('Fetching blacklist from AbuseIPDB…');

        try {
            $response = Http::timeout(60)
                ->withHeaders([
                    'Accept' => 'application/json',
                    'Key'    => config('services.abuseipdb.api_key'),
                ])
                ->get('https://api.abuseipdb.com/api/v2/blacklist', [
                    'confidenceMinimum' => 90,
                ]);
        } catch (ConnectionException $e) {
            Log::error('[update:blacklist] ConnectionException: ' . $e->getMessage());
            $this->error('Network error while fetching blacklist: ' . $e->getMessage());
            return;
        }

        if (! $response->ok()) {
            Log::error("[update:blacklist] API error HTTP {$response->status()}: " . $response->body());
            $this->error('Failed to fetch blacklist: HTTP ' . $response->status());
            return;
        }

        // decode the full payload
        $payload = $response->json();

        // verify the “data” key is actually present and is an array
        if (! is_array($payload) || ! array_key_exists('data', $payload)) {
            Log::error(
                '[update:blacklist] Unexpected AbuseIPDB response format, missing “data” key',
                ['payload' => $payload]
            );

            // bail out cleanly...
            $this->error('Unexpected API response, check logs for details.');
            return;
        }

        // at this point we know it’s safe
        $blacklist = $payload['data'];
        $batchSize = 500;
        $batch     = [];
        $count     = 0;

        // Collect all upstream IPs for comparison
        $upstreamIpAddresses = collect($blacklist)->pluck('ipAddress')->all();

        // Remove or mark as stale any blacklist IPs not present upstream
        DB::table('ip_filters')
            ->where('type', 'blacklist')
            ->where('source', 'abuseipdb')
            ->whereNotIn('ip_address', $upstreamIpAddresses)
            ->delete();

        foreach ($blacklist as $ipData) {
            $batch[] = [
                'ip_address' => $ipData['ipAddress'],
                'type'       => 'blacklist',
                'source'     => 'abuseipdb',
                'reason'     => $ipData['abuseConfidenceScore'] . '% confidence score from AbuseIPDB',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (count($batch) >= $batchSize) {
                DB::table('ip_filters')
                    ->upsert($batch, ['ip_address'], ['type', 'reason', 'source', 'updated_at']);

                $count += count($batch);
                Log::info("[update:blacklist] Processed batch of {$batchSize}, total so far: {$count}.");
                $batch = [];
                gc_collect_cycles();
            }
        }

        // Final partial batch
        if (count($batch) > 0) {
            DB::table('ip_filters')
                ->upsert($batch, ['ip_address'], ['type', 'reason', 'updated_at']);

            $count += count($batch);
            Log::info("[update:blacklist] Processed final batch of " . count($batch) . ", total: {$count}.");
        }

        Log::info("[update:blacklist] Completed. {$count} IPs processed.");
        $this->info("Blacklist updated successfully. {$count} entries.");
    }
}
