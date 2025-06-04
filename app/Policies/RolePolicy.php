<?php

namespace App\Policies;

use App\Models\AuthObjects\Role;
use App\Models\AuthObjects\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class RolePolicy
 *
 * This class defines the authorization policies for the Role model.
 */
class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-role');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Role $role): bool
    {
        return $user->can('read-role', $role);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create-role');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Role $role): bool
    {
        return $user->can('update-role', $role);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Role $role): bool
    {
        // If the role is marked protected, disallow entirely:
        if ($role->protected) {
            return false;
        }

        return $user->can('delete-role', $role);
    }
}
