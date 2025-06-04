<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\AuthObjects\PermissionSet;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 *
 * Class PermissionSetPolicy
 *
 * This class defines the authorization policies for permission sets.
 */
class PermissionSetPolicy
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
        return $user->can('list-permission-set');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param PermissionSet $permissionSet
     * @return bool
     */
    public function view(User $user, PermissionSet $permissionSet): bool
    {
        return $user->can('read-permission-set', $permissionSet);
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
     * @param PermissionSet $permissionSet
     * @return bool
     */
    public function update(User $user, PermissionSet $permissionSet): bool
    {
        return $user->can('update-permission-set', $permissionSet);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param PermissionSet $permissionSet
     * @return bool
     */
    public function delete(User $user, PermissionSet $permissionSet): bool
    {
        return $user->can('delete-permission-set', $permissionSet);
    }
}
