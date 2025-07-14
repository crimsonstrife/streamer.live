<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductVariant;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductVariantPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-product-variant');
    }

    public function view(?User $user, ProductVariant $variant): bool
    {
        $product = $variant->product;

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

        if ($user->can('read-product-variant')) {
            return true;
        }

        return $user->id === $product->user_id; // Users can always view their own orders
    }

    /**
     * Prevent users from creating new product variants.
     */
    public function create(User $user): bool
    {
        return false; // Only FourthwallService can create
    }

    /**
     * Allow updates only under certain conditions.
     */
    public function update(User $user, ProductVariant $variant): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('update-product-variant');
    }

    /**
     * Prevent product variant deletion by users.
     */
    public function delete(User $user, ProductVariant $variant): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('delete-product-variant');
    }

    public function restore(User $user, ProductVariant $variant): bool
    {
        // admin overrides status and access
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        return $user->can('restore-product-variant');
    }

    public function forceDelete(User $user, ProductVariant $variant): bool
    {
        return false;
    }
}
