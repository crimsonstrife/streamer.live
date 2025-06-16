<?php

namespace App\Services;

use GeoIp2\Database\Reader;
use MaxMind\Db\Reader\InvalidDatabaseException;

/**
 * Class GeoLocationService
 *
 * This service provides functionalities related to geolocation.
 * It includes methods for retrieving and processing geographical data.
 *
 * @package App\Services
 */
class GeoLocationService
{
    protected Reader $reader;

    /**
     * GeoLocationService constructor.
     * Initializes the GeoLocationService class.
     * @throws InvalidDatabaseException
     */
    public function __construct()
    {
        $this->reader = new Reader(storage_path('geoip/GeoLite2-Country.mmdb')); // Adjust path as needed
    }

    /**
     * Get geolocation data for an IP address.
     *
     * @param string $ip
     * @return array|null
     */
    public function getGeoData(string $ip): ?array
    {
        try {
            $record = $this->reader->country($ip);

            return [
                'ip' => $ip,
                'country' => $record->country->isoCode,
                'country_name' => $record->country->name,
                'continent' => $record->continent->name,
            ];
        } catch (\Exception $e) {
            return null; // Return null if lookup fails
        }
    }
}
