<?php

namespace App\Support;

use Illuminate\Cache\CacheManager;
use Throwable;

class ResilientCacheStore
{
    public static function ensureDefaultStoreAvailable(?string $fallbackStore = null): string
    {
        $manager = app('cache');
        $defaultStore = config('cache.default', 'file');

        if (! $manager instanceof CacheManager) {
            return $defaultStore;
        }

        $fallbackStore ??= static::resolveFallbackStore($defaultStore);

        if ($fallbackStore === $defaultStore) {
            return $defaultStore;
        }

        try {
            $manager->store($defaultStore)->get('__cache_store_probe__');

            return $defaultStore;
        } catch (Throwable) {
            config(['cache.default' => $fallbackStore]);
            $manager->forgetDriver();
            $manager->setDefaultDriver($fallbackStore);

            return $fallbackStore;
        }
    }

    private static function resolveFallbackStore(string $defaultStore): string
    {
        $candidates = array_unique([
            env('CACHE_FALLBACK_STORE', 'file'),
            'file',
            'array',
        ]);

        foreach ($candidates as $candidate) {
            if ($candidate === $defaultStore) {
                continue;
            }

            if (is_array(config("cache.stores.{$candidate}"))) {
                return $candidate;
            }
        }

        return $defaultStore;
    }
}
