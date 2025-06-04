<?php

namespace App\Services\Permissions;

use DateInterval;
use Illuminate\Cache\CacheManager;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\Eloquent\Model;

use function array_key_exists;

/**
 * Handle caching logic for permissions.
 */
class PermissionCacheService
{
    protected Repository $cache;

    protected CacheManager $cacheManager;

    /** @var DateInterval|int */
    public $cacheExpirationTime;

    public string $cacheKey;

    public bool $teams;

    public string $teamsKey;

    public string $pivotRole;

    public string $pivotPermission;

    public string $pivotPermissionSet;

    public string $pivotPermissionSetGroup;

    protected string|int|null $teamId = null;

    private array $wildcardPermissionsIndex = [];

    public function __construct(CacheManager $cacheManager)
    {
        $this->cacheManager = $cacheManager;
        $this->initialize();
    }

    public function initialize(): void
    {
        $this->cacheExpirationTime = config('permission.cache.expiration_time') ?: DateInterval::createFromDateString('24 hours');
        $this->teams = config('permission.teams', false);
        $this->teamsKey = config('permission.column_names.team_foreign_key', 'team_id');
        $this->cacheKey = config('permission.cache.key');
        $this->pivotRole = config('permission.column_names.role_pivot_key') ?: 'role_id';
        $this->pivotPermission = config('permission.column_names.permission_pivot_key') ?: 'permission_id';
        $this->pivotPermissionSet = config('permission.column_names.permission_set_pivot_key') ?: 'set_id';
        $this->pivotPermissionSetGroup = config('permission.column_names.permission_set_group_pivot_key') ?: 'group_id';
        $this->cache = $this->getCacheStoreFromConfig();
    }

    protected function getCacheStoreFromConfig(): Repository
    {
        $cacheDriver = config('permission.cache.store', 'default');

        if ($cacheDriver === 'default') {
            return $this->cacheManager->store();
        }

        if (! array_key_exists($cacheDriver, config('cache.stores'))) {
            $cacheDriver = 'array';
        }

        return $this->cacheManager->store($cacheDriver);
    }

    public function setTeamId(int|string|Model|null $id): void
    {
        if ($id instanceof Model) {
            $id = $id->getKey();
        }
        $this->teamId = $id;
    }

    public function getTeamId(): int|string|null
    {
        return $this->teamId;
    }

    public function forgetCachedPermissions(): bool
    {
        $this->wildcardPermissionsIndex = [];

        return $this->cache->forget($this->cacheKey);
    }

    public function forgetWildcardPermissionIndex(?Model $record = null): void
    {
        if ($record) {
            unset($this->wildcardPermissionsIndex[get_class($record)][$record->getKey()]);

            return;
        }

        $this->wildcardPermissionsIndex = [];
    }

    public function getWildcardPermissionIndex(Model $record): array
    {
        if (isset($this->wildcardPermissionsIndex[get_class($record)][$record->getKey()])) {
            return $this->wildcardPermissionsIndex[get_class($record)][$record->getKey()];
        }

        return $this->wildcardPermissionsIndex[get_class($record)][$record->getKey()] = app($record->getWildcardClass(), ['record' => $record])->getIndex();
    }

    public function getCacheRepository(): Repository
    {
        return $this->cache;
    }

    public function getCacheStore(): Store
    {
        return $this->cache->getStore();
    }
}
