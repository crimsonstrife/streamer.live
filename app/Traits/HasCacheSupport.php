<?php

namespace App\Traits;

use Carbon\Carbon;
use Closure;
use DateInterval;
use Illuminate\Cache\TaggableStore;
use Illuminate\Support\Facades\Cache;

trait HasCacheSupport
{
    protected function rememberTagged(string|array $tags, string $key, Closure $callback, int|DateInterval|null $ttl = null): mixed
    {
        /** @var Carbon $ttl */
        if ($ttl instanceof DateInterval) {
            $ttl = now()->add($ttl);
        }

        if ($this->supportsTaggedCache()) {
            return Cache::tags((array) $tags)->remember($key, $ttl ?? now()->addMinutes(30), $callback);
        }

        return Cache::remember($key, $ttl ?? now()->addMinutes(30), $callback);
    }

    protected function supportsTaggedCache(): bool
    {
        return Cache::getStore() instanceof TaggableStore;
    }

    protected function rememberTaggedForever(string|array $tags, string $key, Closure $callback): mixed
    {
        if ($this->supportsTaggedCache()) {
            return Cache::tags((array) $tags)->rememberForever($key, $callback);
        }

        return Cache::rememberForever($key, $callback);
    }

    protected function flushTagged(string|array $tags, ?string $key = null): void
    {
        if ($this->supportsTaggedCache()) {
            Cache::tags((array) $tags)->flush();
        } elseif ($key !== null) {
            Cache::forget($key);
        }
    }
}
