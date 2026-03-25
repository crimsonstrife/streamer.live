<?php

namespace App\Support;

use Illuminate\Cache\CacheManager;
use Throwable;

class ResilientCacheStore
{
    public static function ensureDefaultStoreAvailable(?string $fallbackStore = null): string
    {
        $defaultStore = config('cache.default', 'file');

        if (! app()->bound('cache')) {
            return $defaultStore;
        }

        $manager = app('cache');

        if (! $manager instanceof CacheManager) {
            return $defaultStore;
        }

        if (static::storeIsAvailable($manager, $defaultStore)) {
            return $defaultStore;
        }

        foreach (static::resolveFallbackStores($defaultStore, $fallbackStore) as $candidate) {
            if (! static::storeIsAvailable($manager, $candidate)) {
                continue;
            }

            config(['cache.default' => $candidate]);
            $manager->forgetDriver();
            $manager->setDefaultDriver($candidate);

            return $candidate;
        }

        return $defaultStore;
    }

    private static function resolveFallbackStores(string $defaultStore, ?string $fallbackStore): array
    {
        return array_values(array_filter(array_unique([
            $fallbackStore,
            env('CACHE_FALLBACK_STORE', 'file'),
            'file',
            'array',
        ]), function (?string $candidate) use ($defaultStore) {
            if (! is_string($candidate) || $candidate === $defaultStore) {
                return false;
            }

            return is_array(config("cache.stores.{$candidate}"));
        }));
    }

    private static function storeIsAvailable(CacheManager $manager, string $store): bool
    {
        try {
            $manager->store($store)->get('__cache_store_probe__');

            return true;
        } catch (Throwable) {
            $manager->forgetDriver($store);

            return false;
        }
    }
}
