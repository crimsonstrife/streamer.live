<?php

namespace App\Traits;

use App\Models\PermissionGroup;
use App\Models\PermissionSet;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasRoles;

trait HasAdvancedPermissions
{
    use HasRoles;

    /**
     * Override the hasPermissionTo method to handle advanced permission logic.
     *
     * @param  string|int|Permission  $permission
     */
    public function hasPermissionTo($permission, ?string $guardName = null): bool
    {
        // Eager load the Permission objects/relations before checking
        $this->load('permissions', 'permissionSets.permissions', 'permissionGroups.permissions', 'permissionGroups.permissionSets.permissions');

        // Check if any PermissionSet has the given permission and it is not muted
        $mutedPermissions = $this->getMutedPermissions();

        // If there are muted permissions, log them
        if ($mutedPermissions->isNotEmpty()) {
            logger()->debug('Muted permissions: '.$mutedPermissions->implode(', '));
        }

        // Check if the provided permission is a string, or an integer, if so, find the permission object instead
        if (is_string($permission) || is_int($permission)) {
            if (is_string($permission)) {
                $permission = Permission::findByName($permission, $guardName);
            } else {
                $permission = Permission::find($permission);
            }
        }

        $permissionName = $permission instanceof Permission ? $permission->name : $permission;

        // If permission is muted for the user, deny access
        if ($mutedPermissions->contains('name', $permissionName)) {
            // Log the muted permission
            logger()->debug('Permission is muted: '.$permissionName);

            return false;
        }

        // Check if user has permission directly
        if ($this->permissions->contains('name', $permissionName)) {
            // Log the permission
            logger()->debug('Permission found: '.$permissionName.' (directly)');

            return true;
        }

        // Check if the user has the permission via their roles
        if ($this->hasPermissionViaRoles($permission)) {
            // Log the permission
            logger()->debug('Permission found: '.$permission.' (via roles)');

            return true;
        }

        // Check if permission exists in PermissionSets or PermissionGroups
        if ($this->hasPermissionViaSetsOrGroups($permission)) {
            // Log the permission
            logger()->debug('Permission found: '.$permission.' (via PermissionSets or PermissionGroups)');

            return true;
        }

        // If the permission is not found in Permissions, PermissionSets or PermissionGroups, deny access
        return false;
    }

    /**
     * Get a list of muted permissions from the permission sets.
     */
    public function getMutedPermissions(): Collection
    {
        // Get all muted permissions from PermissionSets
        $mutedPermissions = $this->permissionSets->flatMap->permissions->where('pivot.muted', true)->pluck('name');

        // Get all muted permissions from PermissionSets in PermissionGroups
        $mutedPermissionsFromGroupSets = $this->permissionGroups->flatMap->permissionSets->flatMap->permissions->where('pivot.muted', true)->pluck('name');

        // Merge the muted permissions from PermissionSets and PermissionGroups, and return the unique values
        return $mutedPermissions->merge($mutedPermissionsFromGroupSets)->unique();
    }

    /**
     * Check if the user has a permission via their roles
     */
    public function hasPermissionViaRoles(int|string|Permission $permission): bool
    {
        $permissionName = $permission instanceof Permission ? $permission->name : $permission;

        // Get the roles associated with the user
        $roles = $this->roles;

        // For each role, check for the permission, as well as under related PermissionSets and PermissionGroups, and ensure it is not muted in any of them
        foreach ($roles as $role) {
            // Check if the role has the permission directly
            if ($role->permissions->contains('name', $permissionName)) {
                return true;
            }

            // Check if the role has the permission through its PermissionSets
            if ($this->hasPermissionViaRolePermissionSets($role, $permission)) {
                return true;
            }

            // Check if the role has the permission through its PermissionGroups
            if ($this->hasPermissionViaRolePermissionGroups($role, $permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the user has a permission via their PermissionSets or PermissionGroups.
     */
    public function hasPermissionViaSetsOrGroups(int|string|Permission $permission): bool
    {
        // Check if the permission is in PermissionSets (excluding muted)
        foreach ($this->permissionSets as $permissionSet) {
            if ($this->checkPermissionInSet($permissionSet, $permission)) {
                return true;
            }
        }

        // Check if the permission is in PermissionGroups (including sets within groups)
        foreach ($this->permissionGroups as $permissionGroup) {
            foreach ($permissionGroup->permissionSets as $permissionSet) {
                if ($this->checkPermissionInSet($permissionSet, $permission)) {
                    return true;
                }
            }

            if ($permissionGroup->permissions->contains('name', $permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper method to check if a permission exists in a permission set.
     * Excludes muted permissions.
     */
    private function checkPermissionInSet(PermissionSet $permissionSet, int|string|Permission $permission): bool
    {
        $permissions = $permissionSet->permissions->where('pivot.muted', false)->pluck('name');

        // Normalize both the permission to check and the permissions in the set
        $normalizedPermission = is_string($permission) ? strtolower(trim($permission)) : strtolower($permission->name);

        return $permissions->map(fn ($perm) => strtolower(trim($perm)))->contains($normalizedPermission);
    }

    /**
     * Helper method to check if a role has a permission via a PermissionSet.
     */
    private function hasPermissionViaRolePermissionSets(mixed $role, mixed $permission): bool
    {
        $normalizedPermission = is_string($permission) ? strtolower(trim($permission)) : strtolower($permission->name);
        foreach ($role->permissionSets as $permissionSet) {
            if ($permissionSet->permissions->contains('name', $normalizedPermission) && ! $permissionSet->permissions->where('name', $normalizedPermission)->first()->pivot->muted) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper method to check if a role has a permission via a PermissionGroup.
     */
    private function hasPermissionViaRolePermissionGroups(mixed $role, mixed $permission): bool
    {
        $normalizedPermission = is_string($permission) ? strtolower(trim($permission)) : strtolower($permission->name);

        foreach ($role->permissionGroups as $permissionGroup) {
            // Check if the permission is directly in the PermissionGroup
            if ($permissionGroup->permissions->contains('name', $normalizedPermission)) {
                return true;
            }

            // Check if the permission is in the PermissionSets within the PermissionGroup
            foreach ($permissionGroup->permissionSets as $permissionSet) {
                if ($permissionSet->permissions->contains('name', $normalizedPermission) && ! $permissionSet->permissions->where('name', $normalizedPermission)->first()->pivot->muted) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Define relationship with PermissionSets.
     */
    public function permissionSets(): BelongsToMany
    {
        // Get the model name for the model this trait is called from
        $model = get_class($this);

        // Get the name of the model without the namespace, lowercase
        $modelName = strtolower(class_basename($model));

        // Set the table name for the relationship table, based on the model name and the relationship, i.e. user_has_permission_set for User model
        $tableName = "{$modelName}_has_permission_set";

        // Return the relationship
        return $this->belongsToMany(PermissionSet::class, $tableName);
    }

    /**
     * Define relationship with PermissionGroups.
     */
    public function permissionGroups(): BelongsToMany
    {
        // Get the model name for the model this trait is called from
        $model = get_class($this);

        // Get the name of the model without the namespace, lowercase
        $modelName = strtolower(class_basename($model));

        // Set the table name for the relationship table, based on the model name and the relationship, i.e. user_has_permission_group for User model
        $tableName = "{$modelName}_has_permission_group";

        // Return the relationship
        return $this->belongsToMany(PermissionGroup::class, $tableName);
    }

    /**
     * Define relationship with Permissions.
     */
    public function permissions(): BelongsToMany
    {
        // Get the model name for the model this trait is called from
        $model = get_class($this);

        // Get the name of the model without the namespace, lowercase
        $modelName = strtolower(class_basename($model));

        // Set the table name for the relationship table, based on the model name and the relationship, i.e. user_has_permissions for User model
        $tableName = "{$modelName}_has_permissions";

        // Return the relationship
        return $this->belongsToMany(Permission::class, $tableName);
    }
}
