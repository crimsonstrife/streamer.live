<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\Page;
use Illuminate\Auth\Access\HandlesAuthorization;

class PagePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-page');
    }

    public function create(User $user): bool
    {
        return $user->can('create-page');
    }

    public function update(User $user, Page $page): bool
    {
        if ($user->can('update-page')) {
            return true;
        }

        return false;
    }

    public function delete(User $user, Page $page): bool
    {
        if ($user->can('delete-page')) {
            return true;
        }

        return false;
    }

    public function restore(User $user, Page $page): bool
    {
        if ($user->can('restore-page')) {
            return true;
        }

        return false;
    }
}
