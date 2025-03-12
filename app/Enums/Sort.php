<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * Enum Sort
 *
 * This enum represents the different sorting options available in the application.
 *
 * @method static self TOP()
 * @method static self NEWEST()
 * @method static self OLDEST()
 * @method static self CONTROVERSIAL()
 * @method static self REPLIES()
 * @method static self POPULAR()
 *
 * @package App\Enums
 */
final class Sort extends Enum
{
    /**
     * Represents sorting by the highest score, which is the sum of likes and dislikes.
     */
    const TOP = 'top';

    /**
     * Represents a 'newest' sorting option.
     */
    const NEWEST = 'newest';

    /**
     * Represents a 'oldest' sorting option.
     */
    const OLDEST = 'oldest';

    /**
     * Represents sorting by the highest ratio of likes to dislikes.
     */
    const CONTROVERSIAL = 'controversial';

    /**
     * Represents sorting by the most replies, which is the count of comments that are replies to the comment.
     * This is only applicable to comments.
     */
    const REPLIES = 'replies';

    /**
     * Represents a 'popular' sorting option.
     */
    const POPULAR = 'popular';

    /**
     * Get the default value for the enum.
     *
     * @return string
     */
    public static function default(): string
    {
        return self::TOP;
    }
}
