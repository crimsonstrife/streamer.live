<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\StoreObjects\Collection;
use Illuminate\Auth\Access\HandlesAuthorization;

class CollectionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-collection');
    }

    /**
     * Prevent users from creating new collections.
     */
    public function create(User $user): bool
    {
        return false; // Only FourthwallService can create
    }

    /**
     * Allow updates only under certain conditions.
     */
    public function update(User $user, Collection $collection): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('update-collection');
    }
}
