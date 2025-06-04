<?php

namespace App\Utilities;

use App\Models\BlogObjects\Comment;
use App\Models\AuthObjects\Guest;
use App\Models\BlogObjects\Reaction;
use App\Models\AuthObjects\User;
use Illuminate\Database\Eloquent\Builder;

final class ModelResolver
{
    /** @return class-string */
    public static function commentClass(): string
    {
        return config('comments.model', Comment::class);
    }

    public static function commentModel(): Comment
    {
        return app(self::commentClass());
    }

    public static function commentQuery(): Builder
    {
        return self::commentModel()->newQuery();
    }

    /** @return class-string */
    public static function userClass(): string
    {
        return config('comments.user_model', User::class);
    }

    public static function userModel(): User
    {
        return app(self::userClass());
    }

    public static function userQuery(): Builder
    {
        return self::userModel()->newQuery();
    }

    /** @return class-string */
    public static function reactionClass(): string
    {
        return config('comments.reaction_model', Reaction::class);
    }

    public static function reactionModel(): Reaction
    {
        return app(self::reactionClass());
    }

    public static function reactionQuery(): Builder
    {
        return self::reactionModel()->newQuery();
    }

    /** @return class-string */
    public static function guestClass(): string
    {
        return config('comments.guest_model', Guest::class);
    }

    public static function guestModel(): Guest
    {
        return app(self::guestClass());
    }

    public static function guestQuery(): Builder
    {
        return self::guestModel()->newQuery();
    }
}
