<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 *
 * Class UserPolicy
 *
 * This class defines the authorization policies for the User model.
 */
class UserPolicy
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
        return $user->can('list-user');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function view(User $user, User $model): bool
    {
        return $user->can('read-user', $model);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->can('create-user');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function update(User $user, User $model): bool
    {
        return $user->can('update-user', $model);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function delete(User $user, User $model): bool
    {
        return $user->can('delete-user', $model);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User $user The authenticated user.
     * @param User $model The User model instance being restored.
     * @return bool True if the user has the 'restore-user' permission for the given model, false otherwise.
     */
    public function restore(User $user, User $model): bool
    {
        return $user->can('restore-user', $model);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User $user The authenticated user.
     * @param User $model The User model instance being permanently deleted.
     * @return bool True if the user has the 'force-delete-user' permission for the given model, false otherwise.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return $user->can('force-delete-user', $model);
    }

    /**
     * Determine whether the user can replicate the model.
     *
     * @param User $user The authenticated user.
     * @param User $model The User model instance being replicated.
     * @return bool True if the user has the 'replicate-user' permission for the given model, false otherwise.
     */
    public function replicate(User $user, User $model): bool
    {
        return $user->can('replicate-user', $model);
    }
}
