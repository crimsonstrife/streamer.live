<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Spatie\Permission\Models\Permission;

/**
 *
 * Class PermissionPolicy
 *
 * This class defines the authorization policies for permissions.
 */
class PermissionPolicy
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
        return $user->can('list-permission');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param Permission $permission
     * @return bool
     */
    public function view(User $user, Permission $permission): bool
    {
        return $user->can('read-permission', $permission);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->can('create-permission');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Permission $permission
     * @return bool
     */
    public function update(User $user, Permission $permission): bool
    {
        return $user->can('update-permission', $permission);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Permission $permission
     * @return bool
     */
    public function delete(User $user, Permission $permission): bool
    {
        return $user->can('delete-permission', $permission);
    }
}
