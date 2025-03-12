<?php

namespace App\Contracts;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Enums\Sort;
use App\Models\Comment;

/**
 * Interface CommentableContract
 *
 * This interface defines the contract for a commentable entity, including methods for managing comments,
 * authentication checks, and various configurations related to commenting.
 *
 * @package App\Contracts
 */
interface CommentableContract
{
    /**
     * Get the comments for the commenter.
     *
     * @return MorphMany<Comment>
     */
    public function comments(): MorphMany;

    /**
     * Check if the user is authenticated.
     *
     * @return bool
     */
    public function authCheck(): bool;

    /**
     * Get the authentication guard for the commenter.
     *
     * @return string
     */
    public function getAuthGuard(): string;

    /**
     * Determine if the user can create a comment.
     *
     * @param Authenticatable|null $user
     * @return bool
     */
    public function canCreateComment(Authenticatable $user = null): bool;

    /**
     * Check if guest mode is enabled.
     *
     * @return bool
     */
    public function guestModeEnabled(): bool;

    /**
     * Check if the comment limit has been exceeded.
     *
     * @param Authenticatable|null $user
     * @return bool
     */
    public function limitExceeded(Authenticatable $user = null): bool;

    /**
     * Check if pagination is enabled for comments.
     *
     * @return bool
     */
    public function paginationEnabled(): bool;

    /**
     * Check if the comment limit for guests has been exceeded.
     *
     * @param int $limit
     * @return bool
     */
    public function checkLimitForGuest(int $limit): bool;

    /**
     * Check if the comment limit for authenticated users has been exceeded.
     *
     * @param Authenticatable $user
     * @param int $limit
     * @return bool
     */
    public function checkLimitForAuthUser(Authenticatable $user, int $limit): bool;

    /**
     * Get the comment limit.
     *
     * @return int|null
     */
    public function getCommentLimit(): ?int;

    /**
     * Check if approval is required for comments.
     *
     * @return bool
     */
    public function approvalRequired(): bool;

    /**
     * Get the authenticated user.
     *
     * @return Authenticatable|null
     */
    public function getAuthUser(): ?Authenticatable;

    /**
     * Get the sort order for comments.
     *
     * @return Sort
     */
    public function getSortOrder(): Sort;

    /**
     * Get the sort order for replies.
     *
     * @return Sort
     */
    public function getRepliesSortOrder(): Sort;

    /**
     * Determine if the user can edit a comment.
     * (Guests cannot edit comments.)
     * @param Comment $comment
     * @return bool
     */
    public function canEditComment(Comment $comment): bool;

    /**
     * Determine if the user can delete a comment.
     * (Guests cannot delete comments.)
     * @param Comment $comment
     * @return bool
     */
    public function canDeleteComment(Comment $comment): bool;

    /**
     * Determine if the user can report a comment.
     * (Guests cannot report comments.)
     * @param Comment $comment
     * @return bool
     */
    public function canReportComment(Comment $comment): bool;

    /**
     * Determine if the user can reply to a comment.
     * (Guests cannot reply to comments.)
     * @param Comment $comment
     * @return bool
     */
    public function canReplyToComment(Comment $comment): bool;

    /**
     * Determine if the user can react to a comment.
     * (Guests cannot react to comments.)
     * @param Comment $comment
     * @return bool
     */
    public function canReactToComment(Comment $comment): bool;
}
