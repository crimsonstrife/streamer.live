<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\AuthObjects\PermissionGroup;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 *
 * Class PermissionGroupPolicy
 *
 * This class defines the authorization policies for permission groups.
 */
class PermissionGroupPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-permission-group');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param PermissionGroup $permissionGroup
     * @return bool
     */
    public function view(User $user, PermissionGroup $permissionGroup): bool
    {
        return $user->can('read-permission-set', $permissionGroup);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->can('create-permission-set');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param PermissionGroup $permissionGroup
     * @return bool
     */
    public function update(User $user, PermissionGroup $permissionGroup): bool
    {
        return $user->can('update-permission-set', $permissionGroup);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param PermissionGroup $permissionGroup
     * @return bool
     */
    public function delete(User $user, PermissionGroup $permissionGroup): bool
    {
        return $user->can('delete-permission-set', $permissionGroup);
    }
}
