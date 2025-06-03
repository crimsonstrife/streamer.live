<?php

namespace App\Models;

use App\Contracts\Role as RoleContract;
use App\Traits\HasAdvancedPermissions;
use App\Traits\IsPermissible;
use Exception;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use RuntimeException;
use Spatie\Permission\Exceptions\RoleAlreadyExists;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\Traits\RefreshesPermissionCache;

/**
 * Class Role
 *
 * This class extends the SpatieRole and implements the Role contract.
 * It represents a role within the application, providing methods and properties
 * to manage and interact with roles.
 */
class Role extends SpatieRole implements RoleContract
{
    use HasAdvancedPermissions;
    use IsPermissible;
    use RefreshesPermissionCache;

    protected $fillable = ['name', 'protected'];

    protected $guarded = [];

    /**
     * Boot the model and its traits.
     *
     * This method is called when the model is initialized. It can be used to
     * register any event listeners or perform any setup required for the model.
     */
    public static function boot(): void
    {
        parent::boot();

        static::deleting(static function ($role) {
            if ($role->protected) {
                throw new RuntimeException("The {$role->name} role cannot be deleted for security reasons.");
            }
        });
    }

    /**
     * Create a new role instance.
     */
    public function __construct(array $attributes = [])
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? config('auth.defaults.guard');

        parent::__construct($attributes);

        $this->guarded[] = $this->primaryKey;
        $this->table = config('permission.table_names.roles') ?: $this->getTable();
    }

    /**
     * Create a new role.
     *
     *
     * @throws RoleAlreadyExists|Exception
     */
    public static function create(array $attributes = []): RoleContract|Role
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? Guard::getDefaultName(static::class);

        $params = ['name' => $attributes['name'], 'guard_name' => $attributes['guard_name']];
        if (app(PermissionRegistrar::class)->teams) {
            $teamsKey = app(PermissionRegistrar::class)->teamsKey;

            if (array_key_exists($teamsKey, $attributes)) {
                $params[$teamsKey] = $attributes[$teamsKey];
            } else {
                $attributes[$teamsKey] = app(PermissionRegistrar::class)->getPermissionsTeamId();
            }
        }
        if (static::findByParam($params)) {
            throw RoleAlreadyExists::create($attributes['name'], $attributes['guard_name']);
        }

        $createdRole = static::query()->create($attributes);

        // Ensure the created role is of the expected type
        if (! $createdRole instanceof self) {
            throw new RuntimeException('The created role is not of the expected type.');
        }

        return $createdRole;
    }

    /**
     * A role may have multiple permissions.
     * This defines a many-to-many relationship with the Permission class.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_has_permissions', 'role_id', 'permission_id');
    }

    /**
     * A role may be assigned to various permission sets.
     * This defines a many-to-many relationship with the PermissionSet class.
     */
    public function permissionSets(): BelongsToMany
    {
        return $this->belongsToMany(PermissionSet::class, 'role_has_permission_set', 'role_id', 'permission_set_id');
    }

    /**
     * A role may be assigned to various permission groups.
     * This defines a many-to-many relationship with the PermissionGroup class.
     */
    public function permissionGroups(): BelongsToMany
    {
        return $this->belongsToMany(PermissionGroup::class, 'role_has_permission_group', 'role_id', 'permission_group_id');
    }

    /**
     * A role belongs to some users of the model associated with its guard.
     * This defines a polymorphic many-to-many relationship with the User model.
     */
    public function users(): BelongsToMany
    {
        return $this->morphedByMany(
            getModelForGuard($this->attributes['guard_name'] ?? config('auth.defaults.guard')),
            'model',
            config('permission.table_names.model_has_roles'),
            app(PermissionRegistrar::class)->pivotRole,
            config('permission.column_names.model_morph_key')
        );
    }

    /**
     * Find a role by its name and guard name.
     */
    public static function findByName(string $name, ?string $guardName = null): RoleContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        $role = static::findByParam(['name' => $name, 'guard_name' => $guardName]);

        if (! $role) {
            throw RoleDoesNotExist::named($name, $guardName);
        }

        return $role;
    }

    /**
     * Find a role by its id (and optionally guardName).
     */
    public static function findById(int|string $id, ?string $guardName = null): RoleContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        $role = static::findByParam([(new static())->getKeyName() => $id, 'guard_name' => $guardName]);

        if (! $role) {
            throw RoleDoesNotExist::withId($id, $guardName);
        }

        return $role;
    }

    /**
     * Find or create role by its name (and optionally guardName).
     *
     * @throws Exception
     */
    public static function findOrCreate(string $name, ?string $guardName = null): RoleContract
    {
        $guardName = $guardName ?? Guard::getDefaultName(static::class);

        $role = static::findByParam(['name' => $name, 'guard_name' => $guardName]);

        if (! $role) {
            $createdRole = static::query()->create(['name' => $name, 'guard_name' => $guardName] + (app(PermissionRegistrar::class)->teams ? [app(PermissionRegistrar::class)->teamsKey => getPermissionsTeamId()] : []));

            // Ensure the created role is of the expected type
            if (! $createdRole instanceof self) {
                throw new RuntimeException('The created role is not of the expected type.');
            }

            return $createdRole;
        }

        return $role;
    }

    /**
     * Finds a role based on an array of parameters.
     */
    protected static function findByParam(array $params = []): ?RoleContract
    {
        $query = static::query();

        if (app(PermissionRegistrar::class)->teams) {
            $teamsKey = app(PermissionRegistrar::class)->teamsKey;

            $query->where(
                fn ($q) => $q->whereNull($teamsKey)
                    ->orWhere($teamsKey, $params[$teamsKey] ?? getPermissionsTeamId())
            );
            unset($params[$teamsKey]);
        }

        foreach ($params as $key => $value) {
            $query->where($key, $value);
        }

        return $query->first();
    }

    /**
     * See if the role has a permission directly.
     *
     * @param  Permission  $permission
     */
    public function hasDirectPermission($permission): bool
    {
        return $this->permissions()->where('id', $permission->id)->exists();
    }

    /**
     * See if the role has a permission through a permission set.
     *
     * @param  Permission  $permission
     */
    public function hasPermissionThroughSet($permission): bool
    {
        return $this->permissionSets()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('id', $permission->id);
        })->exists();
    }

    /**
     * See if the role has a permission through a permission group.
     *
     * @param  Permission  $permission
     */
    public function hasPermissionThroughGroup($permission): bool
    {
        return $this->permissionGroups()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('id', $permission->id);
        })->exists();
    }
}
