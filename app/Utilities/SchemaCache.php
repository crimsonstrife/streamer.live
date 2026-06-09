<?php

namespace App\Utilities;

use Illuminate\Support\Facades\Schema;

/**
 * Lightweight cache around Schema::hasTable().
 *
 * Boot-time code paths call hasTable() repeatedly (Filament resource
 * registration, page block previews, helper boot). Each call hits
 * information_schema.tables, which under managed MySQL contributes to
 * SQLSTATE[HY000] [1040] Too many connections when several workers
 * boot at once. Cache the answer per-process; flush after migrations.
 */
class SchemaCache
{
    /** @var array<string, bool> */
    private static array $tables = [];

    public static function hasTable(string $table): bool
    {
        if (array_key_exists($table, self::$tables)) {
            return self::$tables[$table];
        }

        try {
            return self::$tables[$table] = Schema::hasTable($table);
        } catch (\Throwable $e) {
            // DB not ready (early boot, missing creds). Treat as missing for
            // this process; do not memoize so a later call can retry.
            return false;
        }
    }

    public static function forget(string $table): void
    {
        unset(self::$tables[$table]);
    }

    public static function flush(): void
    {
        self::$tables = [];
    }
}
