<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\StoreObjects\Product;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-product');
    }

    public function view(?User $user, Product $product): bool
    {
        if ($product->access === 'PUBLIC') {
            return true;
        }

        if ($product->access === 'AVAILABLE') {
            return true;
        }

        // visitors cannot view private or unavailable items
        if ($user === null) {
            return false;
        }

        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($user->can('read-product')) {
            return true;
        }

        return false;
    }

    /**
     * Prevent users from creating new products.
     */
    public function create(User $user): bool
    {
        return false; // Only FourthwallService can create
    }

    /**
     * Allow updates only under certain conditions.
     */
    public function update(User $user, Product $product): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('update-product');
    }

    /**
     * Prevent product deletion by users.
     */
    public function delete(User $user, Product $product): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('delete-product');
    }

    public function restore(User $user, Product $product): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('restore-product');
    }

    public function forceDelete(User $user, Product $product): bool
    {
        return false;
    }
}
