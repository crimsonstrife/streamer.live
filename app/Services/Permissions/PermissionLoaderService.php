<?php

namespace App\Services\Permissions;

use Illuminate\Database\Eloquent\Collection;
use RuntimeException;

/**
 * Service responsible for loading permissions using cache and serialization services.
 */
class PermissionLoaderService
{
    private const RETRY_LIMIT = 3;

    private Collection|array|null $permissions = null;

    public function __construct(
        private PermissionCacheService $cache,
        private PermissionSerializationService $serializer,
        private string $permissionClass,
        private string $roleClass
    ) {
    }

    public function clearLoadedPermissions(): void
    {
        $this->permissions = null;
    }

    public function loadPermissions(int $retryCount = 0): Collection
    {
        if ($this->permissions) {
            return $this->permissions;
        }

        $this->permissions = $this->cache->getCacheRepository()->remember(
            $this->cache->cacheKey,
            $this->cache->cacheExpirationTime,
            function () {
                $permissions = $this->getPermissionsWithRoles();

                return $this->serializer->getSerializedPermissions($permissions);
            }
        );

        if (! isset($this->permissions['alias'])) {
            if ($retryCount >= self::RETRY_LIMIT) {
                throw new RuntimeException('Failed to load permissions after retrying('.$retryCount.') times.');
            }

            $this->cache->forgetCachedPermissions();
            $this->clearLoadedPermissions();

            return $this->loadPermissions($retryCount + 1);
        }

        $this->serializer->hydrateRolesCache($this->permissions['roles']);

        $hydrated = $this->serializer->getHydratedPermissions($this->permissions['permissions']);
        $this->clearLoadedPermissions();

        return $hydrated;
    }

    public function getPermissions(array $params = [], bool $onlyOne = false): Collection
    {
        $permissions = $this->loadPermissions();

        $method = $onlyOne ? 'first' : 'filter';

        $result = $permissions->$method(static function ($permission) use ($params) {
            foreach ($params as $attr => $value) {
                if ($permission->getAttribute($attr) !== $value) {
                    return false;
                }
            }

            return true;
        });

        if ($onlyOne) {
            $result = new Collection($result ? [$result] : []);
        }

        return $result;
    }

    protected function getPermissionsWithRoles(): Collection
    {
        $permissionClass = $this->permissionClass;

        return $permissionClass::select()->with('roles')->get();
    }
}
