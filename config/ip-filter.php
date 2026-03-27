<?php

return [
    'whitelist_enabled' => false,
    'country_whitelist_enabled' => false,
    'geo_enabled' => env('IP_FILTER_GEO_ENABLED', false),
    // how long to cache allow/deny lists (seconds)
    'cache_ttl' => env('IP_FILTER_CACHE_TTL', 3600),
    // How many 404s on “suspicious” paths before auto‐blacklisting
    '404_threshold' => 10,

    // Time window (seconds) to reset the 404 counter
    'suspicious_ttl' => 3600, // 1 hour

    // Regexes for paths to consider “probing” attacks
    'suspicious_patterns' => [
        '/(?:^|\/)\.env$/i',
        '/wp-login\.php$/i',
        '/wp-admin/i',
        '/xmlrpc\.php$/i',
        '/(?:^|\/)(?:config|\.git)\/?/i',
        '/administrator/i',
        '/admin/i',
    ],

    'exclude_ips' => [
        '127.0.0.1',
        '::1',
        '192.168.0.0/16',
        // etc.
    ],
];
