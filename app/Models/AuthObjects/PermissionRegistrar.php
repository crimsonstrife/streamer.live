<?php

namespace App\Models\AuthObjects;

use App\Models\AuthObjects\Role;
use App\Services\Permissions\PermissionCacheService;
use App\Services\Permissions\PermissionLoaderService;
use App\Services\Permissions\PermissionSerializationService;
use DateInterval;
use Illuminate\Cache\CacheManager;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use RuntimeException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar as SpatiePermissionRegistrar;

/**
 * Class PermissionRegistrar
 *
 * This class extends the SpatiePermissionRegistrar and is responsible for
 * registering permissions within the application.
 */
class PermissionRegistrar extends SpatiePermissionRegistrar
{
    protected Repository $cache;

    protected CacheManager $cacheManager;

    protected string $permissionClass;

    protected string $roleClass;

    /** @var Collection|array|null */
    protected $permissions;

    public string $pivotRole;

    public string $pivotPermission;

    public string $pivotPermissionSet;

    public string $pivotPermissionSetGroup;

    /** @var DateInterval|int */
    public $cacheExpirationTime;

    public bool $teams;

    public string $teamsKey;

    protected string|int|null $teamId = null;

    public string $cacheKey;

    private PermissionCacheService $cacheService;

    private PermissionSerializationService $serializationService;

    private PermissionLoaderService $loaderService;

    private function syncCacheProperties(): void
    {
        $this->cacheExpirationTime = $this->cacheService->cacheExpirationTime;
        $this->teams = $this->cacheService->teams;
        $this->teamsKey = $this->cacheService->teamsKey;
        $this->cacheKey = $this->cacheService->cacheKey;
        $this->pivotRole = $this->cacheService->pivotRole;
        $this->pivotPermission = $this->cacheService->pivotPermission;
        $this->pivotPermissionSet = $this->cacheService->pivotPermissionSet;
        $this->pivotPermissionSetGroup = $this->cacheService->pivotPermissionSetGroup;
        $this->cache = $this->cacheService->getCacheRepository();
    }

    /**
     * PermissionRegistrar constructor.
     *
     * @return void
     */
    public function __construct(CacheManager $cacheManager)
    {
        $this->permissionClass = config('permission.models.permission');
        $this->roleClass = config('permission.models.role');

        $this->cacheManager = $cacheManager;

        $this->cacheService = new PermissionCacheService($cacheManager);
        $this->serializationService = new PermissionSerializationService($this->permissionClass, $this->roleClass);
        $this->loaderService = new PermissionLoaderService(
            $this->cacheService,
            $this->serializationService,
            $this->permissionClass,
            $this->roleClass
        );

        $this->syncCacheProperties();

        parent::__construct($cacheManager);
    }

    /**
     * Initialize the cache settings for permissions.
     *
     * This method sets up various cache-related configurations for permissions,
     * including cache expiration time, team settings, cache key, and pivot keys
     * for roles and permissions. It also initializes the cache store.
     */
    public function initializeCache(): void
    {
        $this->cacheService->initialize();
        $this->syncCacheProperties();
    }

    /**
     * Retrieve the cache store based on the configuration.
     *
     * This method fetches the cache store specified in the 'permission.cache.store' configuration.
     * If 'default' is specified, it returns the default cache store instance.
     * If an undefined cache store is specified, it falls back to the 'array' store, which is Laravel's closest equivalent to 'none'.
     *
     * @return Repository The cache store instance.
     */
    protected function getCacheStoreFromConfig(): Repository
    {
        return $this->cacheService->getCacheRepository();
    }

    /**
     * Set the team id for teams/groups support, this id is used when querying permissions/roles
     *
     * @param  int|string|Model|null  $id
     */
    public function setPermissionsTeamId($id): void
    {
        $this->cacheService->setTeamId($id);
        $this->teamId = $this->cacheService->getTeamId();
    }

    public function getPermissionsTeamId(): int|string|null
    {
        return $this->cacheService->getTeamId();
    }

    /**
     * Registers permissions with the given Gate instance.
     *
     * @param  Gate  $gate  The Gate instance to register permissions with.
     * @return bool Always returns true.
     */
    public function registerPermissions(Gate $gate): bool
    {
        $gate->before(function (Authenticatable $user, string $ability, array &$args = []) {
            if (is_string($args[0] ?? null) && ! class_exists($args[0])) {
                $guard = array_shift($args);
            }
            if (method_exists($user, 'checkPermissionTo')) {
                return $user->checkPermissionTo($ability, $guard ?? null) ?: null;
            }
        });

        return true;
    }

    /**
     * Forget the cached permissions.
     *
     * This method clears the cached permissions and wildcard permission index.
     *
     * @return bool True if the permissions were successfully forgotten, false otherwise.
     */
    public function forgetCachedPermissions(): bool
    {
        $this->permissions = null;
        $this->cacheService->forgetWildcardPermissionIndex();

        return $this->cacheService->forgetCachedPermissions();
    }

    /**
     * Forgets the wildcard permission index for a given record or clears the entire index.
     *
     * If a record is provided, it will remove the wildcard permission index for that specific record.
     * If no record is provided, it will clear the entire wildcard permission index.
     *
     * @param  Model|null  $record  The record for which to forget the wildcard permission index, or null to clear the entire index.
     */
    public function forgetWildcardPermissionIndex(?Model $record = null): void
    {
        $this->cacheService->forgetWildcardPermissionIndex($record);
    }

    /**
     * Get the wildcard permission index for the given record.
     *
     * This method checks if the wildcard permission index for the given record's class and key
     * is already set. If it is, it returns the existing index. If not, it creates a new index
     * using the record's wildcard class and returns it.
     *
     * @param  Model  $record  The record for which to get the wildcard permission index.
     * @return array The wildcard permission index for the given record.
     */
    public function getWildcardPermissionIndex(Model $record): array
    {
        return $this->cacheService->getWildcardPermissionIndex($record);
    }

    /**
     * Clear already-loaded permissions collection.
     * This is only intended to be called by the PermissionServiceProvider on boot,
     * so that long-running instances don't keep old data in memory.
     */
    public function clearPermissionsCollection(): void
    {
        $this->permissions = null;
        $this->cacheService->forgetWildcardPermissionIndex();
    }

    /**
     * Clear the cached roles and permissions.
     * This is only intended to be called by the PermissionServiceProvider on boot,
     * so that long-running instances don't keep old data in memory.
     *
     * @deprecated - use clearPermissionsCollection() instead
     *
     * @alias of clearPermissionsCollection()
     */
    public function clearClassPermissions(): void
    {
        $this->clearPermissionsCollection();
    }

    /**
     * Load permissions from cache or retrieve and cache them if not already cached.
     *
     * This method first checks if permissions are already loaded. If not, it attempts to load them from the cache.
     * If the permissions are not found in the cache, it retrieves them using the `getSerializedPermissionsForCache` method
     * and stores them in the cache.
     *
     * There is a fallback mechanism for an old cache method which will be removed in the next major version.
     * If the old cache method is detected, it clears the cached permissions and reloads them.
     *
     * After loading the permissions, it sets the alias, hydrates the roles cache, and prepares the hydrated permission collection.
     * Finally, it resets the cached roles, alias, and except properties.
     *
     * @throws RuntimeException
     */
    private function loadPermissions(int $retryCount = 0): void
    {
        $this->permissions = $this->loaderService->loadPermissions($retryCount);
    }

    /**
     * Get all permissions from the database.
     *
     * This method retrieves all permissions from the database and returns them as a collection.
     *
     * @return Collection A collection of all permissions.
     */
    public function getPermissions(array $params = [], bool $onlyOne = false): Collection
    {
        return $this->loaderService->getPermissions($params, $onlyOne);
    }

    /**
     * Get the class name of the permission model.
     * This method returns the class name of the permission model, which is stored in the permissionClass property.
     */
    public function getPermissionClass(): string
    {
        return $this->permissionClass;
    }

    /**
     * Set the class name of the permission model.
     *
     * @param  string  $permissionClass
     * @return $this
     */
    public function setPermissionClass($permissionClass): static
    {
        $this->permissionClass = $permissionClass;
        config()->set('permission.models.permission', $permissionClass);
        app()->bind(Permission::class, $permissionClass);

        return $this;
    }

    /**
     * Get the class name of the role model.
     * This method returns the class name of the
     * role model, which is stored in the roleClass property.
     */
    public function getRoleClass(): string
    {
        return $this->roleClass;
    }

    /**
     * Set the class name of the role model.
     *
     * @param  string  $roleClass
     * @return $this
     */
    public function setRoleClass($roleClass): static
    {
        $this->roleClass = $roleClass;
        config()->set('permission.models.role', $roleClass);
        app()->bind(Role::class, $roleClass);

        return $this;
    }

    /**
     * Get the cache repository instance.
     *
     * This method returns the cache repository instance, which is stored in the cache property.
     */
    public function getCacheRepository(): Repository
    {
        return $this->cache;
    }

    /**
     * Get the cache store instance.
     *
     * This method returns the cache store instance, which is stored in the cache property.
     */
    public function getCacheStore(): Store
    {
        return $this->cache->getStore();
    }

    /**
     * Get the cache expiration time.
     *
     * This method returns the cache expiration time, which is stored in the cacheExpirationTime property.
     */
    protected function getPermissionsWithRoles(): Collection
    {
        return $this->permissionClass::select()->with('roles')->get();
    }

    /**
     * Check if the given value is a valid UID.
     *
     * This method checks if the given value is either a valid UUID/GUID or a valid ULID.
     *
     * @param  mixed  $value  The value to check.
     * @return bool True if the value is a valid UID, false otherwise.
     */
    public static function isUid($value): bool
    {
        if (! is_string($value) || empty(trim($value))) {
            return false; // not a string or empty
        }

        // check if is UUID/GUID
        $uid = preg_match('/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iD', $value) > 0; // UUID/GUID
        if ($uid) {
            return true;
        }

        // check if is ULID
        $ulid = strlen($value) === 26 && strspn($value, '0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz') === 26 && $value[0] <= '7'; // ULID
        if ($ulid) {
            return true;
        }

        return false;
    }
}
