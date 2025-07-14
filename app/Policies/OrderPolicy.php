<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\StoreObjects\Order;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-order');
    }

    public function view(?User $user, Order $order): bool
    {
        // visitors cannot view orders
        if ($user === null) {
            return false;
        }

        // admin overrides access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($user->can('read-order')) {
            return true;
        }

        return false;
    }

    /**
     * Prevent users from creating new orders.
     */
    public function create(User $user): bool
    {
        return false; // Only FourthwallService can create
    }

    /**
     * Allow updates only under certain conditions.
     */
    public function update(User $user, Order $order): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('update-order');
    }

    /**
     * Prevent order deletion by users.
     */
    public function delete(User $user, Order $order): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('delete-order');
    }

    public function restore(User $user, Order $order): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('restore-order');
    }

    public function forceDelete(User $user, Order $order): bool
    {
        return false;
    }
}
