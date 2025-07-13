<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\BlogObjects\Post;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-post');
    }

    public function view(?User $user, Post $post): bool
    {
        if ($post->published_at !== null) {
            return true;
        }

        // visitors cannot view unpublished items
        if ($user === null) {
            return false;
        }

        // admin overrides published status
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($user->can('read-post')) {
            return true;
        }

        // authors can view their own unpublished posts
        $author = $post->author();
        $authorUser = $author->user();

        return $user->id === $authorUser->id;
    }

    public function create(User $user): bool
    {
        return $user->can('create-post');
    }

    public function update(User $user, Post $post): bool
    {
        if ($user->can('update-post')) {
            return true;
        }

        $author = $post->author();
        $authorUser = $author->user();

        return $user->id === $authorUser->id;
    }

    public function delete(User $user, Post $post): bool
    {
        if ($user->can('delete-post')) {
            return true;
        }

        $author = $post->author();
        $authorUser = $author->user();

        return $user->id === $authorUser->id;
    }

    public function restore(User $user, Post $post): bool
    {
        if ($user->can('restore-post')) {
            return true;
        }

        $author = $post->author();
        $authorUser = $author->user();

        return $user->id === $authorUser->id;
    }
}
