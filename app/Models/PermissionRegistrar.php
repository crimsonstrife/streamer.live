<?php

namespace App\Models;

use Illuminate\Cache\CacheManager;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\PermissionRegistrar as SpatiePermissionRegistrar;
use Spatie\Permission\Models\Permission;

/**
 * Class PermissionRegistrar
 *
 * This class extends the SpatiePermissionRegistrar and is responsible for
 * registering permissions within the application.
 *
 * @package App\Models\Auth
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

    /** @var \DateInterval|int */
    public $cacheExpirationTime;

    public bool $teams;

    public string $teamsKey;

    protected string|int|null $teamId = null;

    public string $cacheKey;

    private array $cachedRoles = [];

    private array $alias = [];

    private array $except = [];

    private array $wildcardPermissionsIndex = [];

    /**
     * PermissionRegistrar constructor.
     *
     * @param \Illuminate\Cache\CacheManager $cacheManager
     * @return void
     */
    public function __construct(CacheManager $cacheManager)
    {
        $this->permissionClass = config('permission.models.permission');
        $this->roleClass = config('permission.models.role');

        $this->cacheManager = $cacheManager;
        $this->initializeCache();
    }

    /**
     * Initialize the cache settings for permissions.
     *
     * This method sets up various cache-related configurations for permissions,
     * including cache expiration time, team settings, cache key, and pivot keys
     * for roles and permissions. It also initializes the cache store.
     *
     * @return void
     */
    public function initializeCache(): void
    {
        $this->cacheExpirationTime = config('permission.cache.expiration_time') ?: \DateInterval::createFromDateString('24 hours');

        $this->teams = config('permission.teams', false);
        $this->teamsKey = config('permission.column_names.team_foreign_key', 'team_id');

        $this->cacheKey = config('permission.cache.key');

        $this->pivotRole = config('permission.column_names.role_pivot_key') ?: 'role_id';
        $this->pivotPermission = config('permission.column_names.permission_pivot_key') ?: 'permission_id';
        $this->pivotPermissionSet = config('permission.column_names.permission_set_pivot_key') ?: 'set_id';
        $this->pivotPermissionSetGroup = config('permission.column_names.permission_set_group_pivot_key') ?: 'group_id';

        $this->cache = $this->getCacheStoreFromConfig();
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
        // the 'default' fallback here is from the permission.php config file,
        // where 'default' means to use config(cache.default)
        $cacheDriver = config('permission.cache.store', 'default');

        // when 'default' is specified, no action is required since we already have the default instance
        if ($cacheDriver === 'default') {
            return $this->cacheManager->store();
        }

        // if an undefined cache store is specified, fallback to 'array' which is Laravel's closest equiv to 'none'
        if (!\array_key_exists($cacheDriver, config('cache.stores'))) {
            $cacheDriver = 'array';
        }

        return $this->cacheManager->store($cacheDriver);
    }

    /**
     * Set the team id for teams/groups support, this id is used when querying permissions/roles
     *
     * @param  int|string|Model|null  $id
     *
     * @return void
     */
    public function setPermissionsTeamId($id): void
    {
        if ($id instanceof Model) {
            $id = $id->getKey();
        }
        $this->teamId = $id;
    }

    /**
     * @return int|string|null
     */
    public function getPermissionsTeamId()
    {
        return $this->teamId;
    }


    /**
     * Registers permissions with the given Gate instance.
     *
     * @param Gate $gate The Gate instance to register permissions with.
     * @return bool Always returns true.
     */
    public function registerPermissions(Gate $gate): bool
    {
        $gate->before(function (\Illuminate\Contracts\Auth\Authenticatable $user, string $ability, array &$args = []) {
            if (is_string($args[0] ?? null) && !class_exists($args[0])) {
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
        $this->forgetWildcardPermissionIndex();

        return $this->cache->forget($this->cacheKey);
    }

    /**
     * Forgets the wildcard permission index for a given record or clears the entire index.
     *
     * If a record is provided, it will remove the wildcard permission index for that specific record.
     * If no record is provided, it will clear the entire wildcard permission index.
     *
     * @param Model|null $record The record for which to forget the wildcard permission index, or null to clear the entire index.
     * @return void
     */
    public function forgetWildcardPermissionIndex(?Model $record = null): void
    {
        if ($record) {
            unset($this->wildcardPermissionsIndex[get_class($record)][$record->getKey()]);

            return;
        }

        $this->wildcardPermissionsIndex = [];
    }

    /**
     * Get the wildcard permission index for the given record.
     *
     * This method checks if the wildcard permission index for the given record's class and key
     * is already set. If it is, it returns the existing index. If not, it creates a new index
     * using the record's wildcard class and returns it.
     *
     * @param Model $record The record for which to get the wildcard permission index.
     * @return array The wildcard permission index for the given record.
     */
    public function getWildcardPermissionIndex(Model $record): array
    {
        if (isset($this->wildcardPermissionsIndex[get_class($record)][$record->getKey()])) {
            return $this->wildcardPermissionsIndex[get_class($record)][$record->getKey()];
        }

        return $this->wildcardPermissionsIndex[get_class($record)][$record->getKey()] = app($record->getWildcardClass(), ['record' => $record])->getIndex();
    }

    /**
     * Clear already-loaded permissions collection.
     * This is only intended to be called by the PermissionServiceProvider on boot,
     * so that long-running instances don't keep old data in memory.
     */
    public function clearPermissionsCollection(): void
    {
        $this->permissions = null;
        $this->wildcardPermissionsIndex = [];
    }

    /**
     * Clear the cached roles and permissions.
     * This is only intended to be called by the PermissionServiceProvider on boot,
     * so that long-running instances don't keep old data in memory.
     * @deprecated - use clearPermissionsCollection() instead
     *
     * @alias of clearPermissionsCollection()
     * @return void
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
     * @return void
     */
    private function loadPermissions(): void
    {
        if ($this->permissions) {
            return;
        }

        $this->permissions = $this->cache->remember(
            $this->cacheKey,
            $this->cacheExpirationTime,
            fn () => $this->getSerializedPermissionsForCache()
        );

        // fallback for old cache method, must be removed on next mayor version
        if (!isset($this->permissions['alias'])) {
            $this->forgetCachedPermissions();
            $this->loadPermissions();

            return;
        }

        $this->alias = $this->permissions['alias'];

        $this->hydrateRolesCache();

        $this->permissions = $this->getHydratedPermissionCollection();

        $this->cachedRoles = $this->alias = $this->except = [];
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
        $this->loadPermissions();

        $method = $onlyOne ? 'first' : 'filter';

        $permissions = $this->permissions->$method(static function ($permission) use ($params) {
            foreach ($params as $attr => $value) {
                if ($permission->getAttribute($attr) != $value) {
                    return false;
                }
            }

            return true;
        });

        if ($onlyOne) {
            $permissions = new Collection($permissions ? [$permissions] : []);
        }

        return $permissions;
    }

    /**
     * Get the class name of the permission model.
     * This method returns the class name of the permission model, which is stored in the permissionClass property.
     *
     * @return string
     */
    public function getPermissionClass(): string
    {
        return $this->permissionClass;
    }

    /**
     * Set the class name of the permission model.
     *
     * @param string $permissionClass
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
     *
     * @return string
     */
    public function getRoleClass(): string
    {
        return $this->roleClass;
    }

    /**
     * Set the class name of the role model.
     *
     * @param string $roleClass
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
     *
     * @return Repository
     */
    public function getCacheRepository(): Repository
    {
        return $this->cache;
    }

    /**
     * Get the cache store instance.
     *
     * This method returns the cache store instance, which is stored in the cache property.
     *
     * @return Store
     */
    public function getCacheStore(): Store
    {
        return $this->cache->getStore();
    }

    /**
     * Get the cache expiration time.
     *
     * This method returns the cache expiration time, which is stored in the cacheExpirationTime property.
     *
     * @return Collection
     */
    protected function getPermissionsWithRoles(): Collection
    {
        return $this->permissionClass::select()->with('roles')->get();
    }

    /**
     * Alias an array of model fields.
     *
     * This method aliases the keys of the given model array using the alias property.
     * It excludes any keys that are in the except property.
     *
     * @param array|Model $model The model or array to alias.
     * @return array The aliased array.
     */
    private function aliasedArray(Model|array $model): array
    {
        return collect(is_array($model) ? $model : $model->getAttributes())->except($this->except)
            ->keyBy(fn ($value, $key) => $this->alias[$key] ?? $key)
            ->all();
    }

    /**
     * Alias model fields with new keys.
     *
     * This method assigns aliases to model fields. If the $newKeys parameter is an object
     * with a getAttributes method, it uses the attributes from that method. Otherwise, it
     * uses the $newKeys array directly. The method assigns aliases from 'a' to 'h' if no
     * aliases exist, otherwise from 'j' to 'p'. If an alias already exists for a field, it
     * is not changed. Finally, it removes any aliases that are in the $except array.
     *
     * @param object|array $newKeys An array of new keys or an object with a getAttributes method.
     * @return void
     */
    private function aliasModelFields(object|array $newKeys = []): void
    {
        $i = 0;
        $alphas = !count($this->alias) ? range('a', 'h') : range('j', 'p');

        // Check if $newKeys is an object and has getAttributes method
        if (is_object($newKeys) && method_exists($newKeys, 'getAttributes')) {
            $attributes = $newKeys->getAttributes();
        } else {
            $attributes = $newKeys;
        }

        foreach (array_keys($attributes) as $value) {
            if (!isset($this->alias[$value])) {
                $this->alias[$value] = $alphas[$i++] ?? $value;
            }
        }

        $this->alias = array_diff_key($this->alias, array_flip($this->except));
    }

    /**
     * Get the serialized permissions for caching.
     *
     * This method retrieves permissions with their associated roles, processes them by aliasing model fields,
     * and returns an array containing the aliased permissions and roles. It also handles caching of roles.
     *
     * @return array The serialized permissions and roles for caching.
     */
    private function getSerializedPermissionsForCache(): array
    {
        $this->except = config('permission.cache.column_names_except', ['created_at', 'updated_at', 'deleted_at']);

        $permissions = $this->getPermissionsWithRoles()
            ->map(function ($permission) {
                if (!$this->alias) {
                    $this->aliasModelFields($permission);
                }

                return $this->aliasedArray($permission) + $this->getSerializedRoleRelation($permission);
            })->all();
        $roles = array_values($this->cachedRoles);
        $this->cachedRoles = [];

        return ['alias' => array_flip($this->alias)] + compact('permissions', 'roles');
    }

    /**
     * Get the serialized role relation for a given permission.
     *
     * This method checks if the given permission has any roles associated with it.
     * If no roles are found, it returns an empty array. If roles are found, it
     * ensures that the alias for roles is set and then maps the roles to their
     * respective keys, caching the aliased array of each role.
     *
     * @param Permission $permission The permission instance.
     * @return array The serialized role relation.
     */
    private function getSerializedRoleRelation(Permission $permission): array
    {
        if (!$permission->roles->count()) {
            return [];
        }

        if (!isset($this->alias['roles'])) {
            $this->alias['roles'] = 'r';
            $this->aliasModelFields($permission->roles[0]);
        }

        return [
            'r' => $permission->roles->map(function ($role) {
                if (!isset($this->cachedRoles[$role->getKey()])) {
                    $this->cachedRoles[$role->getKey()] = $this->aliasedArray($role);
                }

                return $role->getKey();
            })->all(),
        ];
    }

    /**
     * Get a collection of hydrated permission instances.
     *
     * This method creates a new instance of the permission class and populates it
     * with the raw attributes from the permissions array, excluding the 'r' key.
     * It also sets the relation 'roles' with a hydrated collection of roles.
     *
     * @return Collection A collection of hydrated permission instances.
     */
    private function getHydratedPermissionCollection(): Collection
    {
        $permissionInstance = new ($this->getPermissionClass())();

        return Collection::make(array_map(
            fn ($item) => $permissionInstance->newInstance([], true)
                ->setRawAttributes($this->aliasedArray(array_diff_key($item, ['r' => 0])), true)
                ->setRelation('roles', $this->getHydratedRoleCollection($item['r'] ?? [])),
            $this->permissions['permissions']
        ));
    }

    /**
     * Get a hydrated collection of roles.
     *
     * This method takes an array of role identifiers and returns a collection
     * of roles that are present in the cached roles.
     *
     * @param array $roles An array of role identifiers.
     * @return Collection A collection of hydrated roles.
     */
    private function getHydratedRoleCollection(array $roles): Collection
    {
        return Collection::make(array_values(
            array_intersect_key($this->cachedRoles, array_flip($roles))
        ));
    }

    /**
     * Hydrates the roles cache by creating instances of the role class and setting their attributes.
     *
     * This method creates a new instance of the role class and iterates over the roles in the permissions array.
     * For each role, it creates a new instance with raw attributes and stores it in the cachedRoles array.
     * Finally, it clears the roles in the permissions array.
     *
     * @return void
     */
    private function hydrateRolesCache(): void
    {
        $roleInstance = new ($this->getRoleClass())();

        array_map(function ($item) use ($roleInstance) {
            $role = $roleInstance->newInstance([], true)
                ->setRawAttributes($this->aliasedArray($item), true);
            $this->cachedRoles[$role->getKey()] = $role;
        }, $this->permissions['roles']);

        $this->permissions['roles'] = [];
    }

    /**
     * Check if the given value is a valid UID.
     *
     * This method checks if the given value is either a valid UUID/GUID or a valid ULID.
     *
     * @param mixed $value The value to check.
     * @return bool True if the value is a valid UID, false otherwise.
     */
    public static function isUid($value): bool
    {
        if (!is_string($value) || empty(trim($value))) {
            return false; // not a string or empty
        }

        // check if is UUID/GUID
        $uid = preg_match('/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iD', $value) > 0; // UUID/GUID
        if ($uid) {
            return true;
        }

        // check if is ULID
        $ulid = strlen($value) == 26 && strspn($value, '0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz') == 26 && $value[0] <= '7'; // ULID
        if ($ulid) {
            return true;
        }

        return false;
    }
}
