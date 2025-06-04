<?php

namespace App\Contracts;

use App\Enums\Sort;
use App\Models\BlogObjects\Comment;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Interface CommentableContract
 *
 * This interface defines the contract for a commentable entity, including methods for managing comments,
 * authentication checks, and various configurations related to commenting.
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
     */
    public function authCheck(): bool;

    /**
     * Get the authentication guard for the commenter.
     */
    public function getAuthGuard(): string;

    /**
     * Determine if the user can create a comment.
     */
    public function canCreateComment(?Authenticatable $user = null): bool;

    /**
     * Check if guest mode is enabled.
     */
    public function guestModeEnabled(): bool;

    /**
     * Check if the comment limit has been exceeded.
     */
    public function limitExceeded(?Authenticatable $user = null): bool;

    /**
     * Check if pagination is enabled for comments.
     */
    public function paginationEnabled(): bool;

    /**
     * Check if the comment limit for guests has been exceeded.
     */
    public function checkLimitForGuest(int $limit): bool;

    /**
     * Check if the comment limit for authenticated users has been exceeded.
     */
    public function checkLimitForAuthUser(Authenticatable $user, int $limit): bool;

    /**
     * Get the comment limit.
     */
    public function getCommentLimit(): ?int;

    /**
     * Check if approval is required for comments.
     */
    public function approvalRequired(): bool;

    /**
     * Get the authenticated user.
     */
    public function getAuthUser(): ?Authenticatable;

    /**
     * Get the sort order for comments.
     */
    public function getSortOrder(): Sort;

    /**
     * Get the sort order for replies.
     */
    public function getRepliesSortOrder(): Sort;

    /**
     * Determine if the user can edit a comment.
     * (Guests cannot edit comments.)
     */
    public function canEditComment(Comment $comment): bool;

    /**
     * Determine if the user can delete a comment.
     * (Guests cannot delete comments.)
     */
    public function canDeleteComment(Comment $comment): bool;

    /**
     * Determine if the user can report a comment.
     * (Guests cannot report comments.)
     */
    public function canReportComment(Comment $comment): bool;

    /**
     * Determine if the user can reply to a comment.
     * (Guests cannot reply to comments.)
     */
    public function canReplyToComment(Comment $comment): bool;

    /**
     * Determine if the user can react to a comment.
     * (Guests cannot react to comments.)
     */
    public function canReactToComment(Comment $comment): bool;
}
