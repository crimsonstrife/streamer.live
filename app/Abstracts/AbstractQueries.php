<?php

namespace App\Abstracts;

use App\Contracts\CommentableContract;
use App\Contracts\CommenterContract;
use App\Data\UserData;
use App\Enums\Sort;
use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class AbstractQueries
{
    public static ?UserData $guest = null;

    abstract public static function guestCommentCount(Model $relatedModel): int;

    /**
     * Get the count of comments made by a user on a related model.
     *
     * @param  Authenticatable&CommenterContract  $user  The user who made the comments.
     * @param  Model&CommentableContract  $relatedModel  The model on which the comments were made.
     * @return int  The count of comments made by the user on the related model.
     */
    abstract public static function userCommentCount(Authenticatable $user, Model $relatedModel): int;

    /**
     * @param  Model&CommentableContract  $relatedModel
     * @param  ?int  $limit
     * @param  Sort  $sortBy
     * @param  string  $filter
     * @return LengthAwarePaginator|Collection
     */
    abstract public static function allRelatedComments(
        Model $relatedModel,
        ?int $limit,
        Sort $sortBy,
        string $filter = ''
    ): LengthAwarePaginator|Collection;

    abstract public static function addCount(): array;

    /**
     * @param  Reply|Comment  $comment
     * @param  string  $reactionType
     * @param  int  $limit
     * @param  bool  $authMode
     * @return \Illuminate\Support\Collection<int, UserData>
     */
    abstract public static function reactedUsers(
        Reply|Comment $comment,
        string $reactionType,
        int $limit,
        bool $authMode
    ): \Illuminate\Support\Collection;

    abstract public static function lastReactedUser(Reply|Comment $comment, string $reactionType, bool $authMode): ?UserData;

    abstract public static function userReplyCountForComment(Comment $comment, bool $guestMode, ?Authenticatable $user): int;

    /**
     * @param Comment $comment
     * @param Model&CommentableContract $relatedModel
     * @param bool $approvalRequired
     * @param int $limit
     * @param Sort $sortBy
     * @param string $filter
     * @return LengthAwarePaginator|Collection
     */
    abstract public static function commentReplies(
        Comment $comment,
        Model $relatedModel,
        bool $approvalRequired,
        int $limit,
        Sort $sortBy,
        string $filter = ''
    ): LengthAwarePaginator|Collection;

    abstract public static function usersStartWithName(string $name, bool $guestMode, int $limit): \Illuminate\Support\Collection;

    abstract public static function usersCount(): int;


    abstract public static function guest(): UserData;
}
