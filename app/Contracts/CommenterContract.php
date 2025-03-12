<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Models\Comment;

/**
 * Interface CommenterContract
 *
 * This interface defines the contract for a commenter, including methods for managing comments,
 * retrieving profile information, and handling replies.
 *
 * @package App\Contracts
 */
interface CommenterContract
{
    /**
     * Get the comments for the commenter.
     *
     * @return MorphMany<Comment>
     */
    public function comments(): MorphMany;

    /**
     * Get the replies for the commenter.
     *
     * @return HasMany
     */
    public function replies(): HasMany;

    /**
     * Get the profile URL for the commenter.
     * (Guests will return false)
     * @return false|string
     */
    public function profileUrl(): false|string;

    /**
     * Get the photo URL for the commenter.
     * (Guests will have a default photo)
     * @return string
     */
    public function photoUrl(): string;

    /**
     * Get the name of the commenter.
     * (Should return the username if the commenter is a user)
     * @return string
     */
    public function name(): string;

    /**
     * Get the email of the commenter.
     *
     * @return string
     */
    public function email(): string;
}
