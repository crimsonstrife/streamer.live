<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Maximum Log File Size
    |--------------------------------------------------------------------------
    |
    | The log viewer reads every .log file under storage/logs. Keep this cap
    | modest so oversized files are skipped instead of slowing the admin UI.
    |
    */
    'max_log_file_size' => env('LOG_VIEWER_MAX_SIZE_KB', 2048),
];
