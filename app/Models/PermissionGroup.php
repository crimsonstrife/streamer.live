<?php

namespace App\Models;

use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;
use Spatie\Permission\Guard;
use Laravel\Jetstream\Team;
use Spatie\Permission\Models\Permission;

/**
 * PermissionGroup Model
 *
 * This model represents a permission set group, which is a collection of permission sets that can be assigned to users, roles, or other entities. Permission set groups can be used to group permission sets together and assign them to multiple entities at once.
 * Permission set groups can have many permission sets, and a permission set group can belong to many permission sets. These relationships are defined in the permission_set_group_permission_sets table.
 * Permissions may be assigned to a permission set group directly, and these permissions can only be granted, but can be overridden by the permissions assigned to the permission set if they are muted in the set.
 * Permission sets must be in the same guard as the permission set group to be assigned to it.
 * Permissions must be in the same guard as the permission set group to be assigned to it.
 *
 * @property ?Carbon $created_at
 * @property ?Carbon $updated_at
 */
class PermissionGroup extends BaseModel
{
    use HasFactory;
    use IsPermissible;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $guarded = [];

    /**
     * Create a new permission set group.
     * @param array $attributes The attributes to create the permission set group with
     */
    public function __construct(array $attributes = [])
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? config('auth.defaults.guard');

        parent::__construct($attributes);

        $this->guarded[] = $this->primaryKey;
        $this->table = 'permission_groups';
    }

    /**
     * Create a new permission set group.
     * @param array $attributes The attributes to create the permission set group with
     * @return PermissionGroup The created permission set group
     */
    public static function create(array $attributes = []): PermissionGroup
    {
        $attributes['guard_name'] = $attributes['guard_name'] ?? Guard::getDefaultName(static::class);

        return static::query()->create($attributes);
    }

    /**
     * Define the relationship between the permission set group and the permission sets it contains directly.
     * @return BelongsToMany
     */
    public function permissionSets(): BelongsToMany
    {
        return $this->belongsToMany(PermissionSet::class, 'permission_group_permission_sets')->withTimestamps();
    }

    /**
     * Define the relationship between the permission set group and the permissions it contains directly.
     * @return BelongsToMany
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_group_permissions')->withTimestamps();
    }

    /**
     * Define the relationship between the permission set group and the users it is assigned to.
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class, 'user_has_permission_group')->withTimestamps();
    }

    /**
     * Define the relationship between the permission set group and the roles it is assigned to.
     * @return BelongsToMany
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_has_permission_group')->withTimestamps();
    }

    /**
     * Define the relationship between the permission set group and the teams it is assigned to.
     * @return BelongsToMany|null
     */
    public function teams(): ?BelongsToMany
    {
        //check if teams are enabled
        if (config('permission.teams.enabled')) {
            return $this->belongsToMany(Team::class, 'team_has_permission_group')->withTimestamps();
        } else {
            return null;
        }
    }

    /**
     * Get permissions that are assigned to the permission set group directly, or through the permission sets it contains.
     * Only returns unique permissions, if a permission is assigned to the permission set group and a permission set it contains, it will only be returned once.
     * If the permission is muted in the permission set, it will be returned as muted, otherwise it will be returned as granted.
     *
     * @return array|null An array of permissions, with the key being the permission name and the value being the muted boolean.
     */
    public function getAllPermissions(): ?array
    {
        $permissions = $this->permissions();
        $permissionSets = $this->permissionSets();
        $allPermissions = array();

        //go through each permission assigned to the permission set group directly, these will always be unmuted
        foreach ($permissions as $permission) {
            $allPermissions[$permission->name] = false;
        }

        //go through each permission set assigned to the permission set group, and get the permissions from each set. keep permissions unique, and if a permission is muted in the set, mark it as muted.
        foreach ($permissionSets as $permissionSet) {
            foreach ($permissionSet->permissions as $permission) {
                //if the permission is already in the array, check if it is muted in the set, and if it is, mark it as muted if it is not already
                if (array_key_exists($permission->name, $allPermissions)) {
                    if ($permissionSet->isMuted($permission)) {
                        $allPermissions[$permission->name] = true;
                    }
                } else {
                    //if the permission is not already in the array, add it to the array with the muted value
                    $allPermissions[$permission->name] = $permissionSet->isMuted($permission);
                }
            }
        }

        return $allPermissions;
    }

    /**
     * Check if a permission is granted to the permission set group, either directly or through a permission set it contains.
     *
     * @param Permission $permission The permission to check
     * @return bool True if the permission is granted, false if it is not
     */
    public function hasPermissionTo(Permission $permission): bool
    {
        //check if the permission is assigned to the permission set group directly
        if ($this->permissions()->contains($permission)) {
            return true;
        }

        //check if the permission is assigned to any of the permission sets assigned to the permission set group
        foreach ($this->permissionSets() as $permissionSet) {
            //if the permission is in the permission set, and it is not muted, return true
            if ($permissionSet->hasPermissionTo($permission)) {
                //continue to the next permission set if the permission is not muted in the set
                continue;
            } elseif ($permissionSet->isMuted($permission)) {
                //if the permission is muted in the set, return false
                return false;
            } else {
                //if the permission is not in the set, continue to the next set
                continue;
            }
        }

        return false;
    }
}
