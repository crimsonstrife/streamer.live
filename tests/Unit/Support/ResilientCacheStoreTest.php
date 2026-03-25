<?php

namespace Tests\Unit\Support;

use App\Support\ResilientCacheStore;
use Illuminate\Cache\Repository;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Cache;
use RuntimeException;
use Tests\TestCase;

class ResilientCacheStoreTest extends TestCase
{
    public function test_it_falls_back_to_a_working_cache_store_when_the_default_store_is_unavailable(): void
    {
        Cache::extend('throwing', fn () => new Repository(new class () implements Store {
            public function get($key): mixed
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function many(array $keys): array
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function put($key, $value, $seconds): bool
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function putMany(array $values, $seconds): bool
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function increment($key, $value = 1): int
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function decrement($key, $value = 1): int
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function forever($key, $value): bool
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function forget($key): bool
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function flush(): bool
            {
                throw new RuntimeException('Cache store unavailable.');
            }

            public function getPrefix(): string
            {
                return 'test';
            }
        }));

        config([
            'cache.default' => 'throwing',
            'cache.stores.throwing' => [
                'driver' => 'throwing',
            ],
        ]);

        app('cache')->forgetDriver();

        $activeStore = ResilientCacheStore::ensureDefaultStoreAvailable('array');

        $this->assertSame('array', $activeStore);
        $this->assertSame('array', config('cache.default'));

        Cache::put('status', 'ok', 60);

        $this->assertSame('ok', Cache::get('status'));
    }
}
