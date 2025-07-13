<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\BlogObjects\Comment;
use App\Models\BlogObjects\Reply;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReplyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('list-comment') || $user->can('list-reply');
    }

    public function view(?User $user, Reply $comment): bool
    {
        // Approved comments should be public and viewable
        if ($comment->approved) {
            return true;
        }

        // visitors cannot view un-approved items
        if ($user === null) {
            return false;
        }

        // admin overrides approved
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($user->can('read-comment') || $user->can('read-reply')) {
            return true;
        }

        // users can view their own comments
        return $user->id === $comment->commentedBy()->id;
    }

    public function create(User $user, Comment $comment): bool
    {
        // admin overrides approved
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($comment->replies_locked) {
            return false;
        }

        return $user->can('create-comment') || $user->can('create-reply');
    }

    public function update(User $user, Reply $comment): bool
    {
        if ($user->can('update-comment') || $user->can('update-reply')) {
            return true;
        }

        // Check if the user owns the comment
        if ($user->id === $comment->commentedBy()->id) {
            // Prevent edits if the comment is older than 15 minutes
            return now()->diffInMinutes($comment->created_at) <= 15;
        }

        return false;

    }

    public function delete(User $user, Reply $comment): bool
    {
        if ($user->can('delete-comment') || $user->can('delete-reply')) {
            return true;
        }

        // users can delete their own comments
        return $user->id === $comment->commentedBy()->id;
    }
}
