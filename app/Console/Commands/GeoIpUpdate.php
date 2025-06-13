<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use PharData;

class GeoIpUpdate extends Command
{
    protected $signature = 'geoip:update';
    protected $description = 'Download & update the GeoLite2 database via HTTP';

    /**
     * @throws ConnectionException
     */
    public function handle(): void
    {
        $edition    = 'GeoLite2-Country';
        $accountId  = config('services.maxmind.account_id');
        $licenseKey = config('services.maxmind.license_key');
        $dbDir      = storage_path('geoip');
        $tmpDir     = storage_path('geoip/tmp');

        // Prepare
        @mkdir($tmpDir, 0755, true);
        @mkdir($dbDir, 0755, true);

        $url = 'https://download.maxmind.com/geoip/databases/'. $edition. '/download?suffix=tar.gz';

        $this->info("Fetching {$edition}…");

        Log::info("Downloading {$edition} from MaxMind…");

        // Fetch
        $response = Http::withBasicAuth($accountId, $licenseKey)
            ->timeout(60)
            ->get($url);
        if (! $response->ok()) {
            $this->error("Download failed (HTTP {$response->status()}).");
            Log::error("Download failed (HTTP {$response->status()}).");

            return;
        }

        $archive = "{$tmpDir}/{$edition}.tar.gz";
        file_put_contents($archive, $response->body());

        // Decompress & extract
        try {
            // Turn .tar.gz → .tar
            $phar = new PharData($archive);
            $tar  = str_replace('.gz', '', $archive);
            $phar->decompress(); // leaves you with $tmpDir/GeoLite2-Country.tar

            // Extract .tar → mmdb files
            $pharTar = new PharData($tar);
            $pharTar->extractTo($tmpDir, null, true);

            // Move .mmdb into place (strip the versioned subfolder)
            $finder = glob("{$tmpDir}/{$edition}_*/{$edition}.mmdb");
            if (count($finder) === 0) {
                $this->error('Could not locate the extracted .mmdb file.');
                Log::error('Could not locate the extracted .mmdb file.');
            }
            rename($finder[0], "{$dbDir}/{$edition}.mmdb");

            $this->info("GeoLite2 database updated in {$dbDir}.");
            Log::info("GeoLite2 database updated in {$dbDir}.");
        } catch (\Throwable $e) {
            $this->error("Extraction failed: " . $e->getMessage());
            Log::error("Extraction failed: " . $e->getMessage());
        } finally {
            // Recursively delete tmp and everything under it
            if (File::exists($tmpDir)) {
                File::deleteDirectory($tmpDir);
            }
        }
    }
}
