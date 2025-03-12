<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * Enum ReactionType
 *
 * This enum represents the different types of reactions available in the application.
 *
 * @package App\Enums
 *
 * @method static self LIKE()
 * @method static self DISLIKE()
 * @method static self LOVE()
 * @method static self HAHA()
 * @method static self WOW()
 * @method static self SAD()
 * @method static self ANGRY()
 * @method static self THANKFUL()
 * @method static self SUPPORT()
 * @method static self CARE()
 * @method static self CELEBRATE()
 */
final class ReactionType extends Enum
{
    /**
     * Represents a 'like' reaction.
     */
    public const LIKE = 'like';

    /**
     * Represents a 'dislike' reaction.
     */
    public const DISLIKE = 'dislike';

    /**
     * Represents a 'love' reaction.
     */
    public const LOVE = 'love';

    /**
     * Represents a 'haha' reaction.
     */
    public const HAHA = 'haha';

    /**
     * Represents a 'wow' reaction.
     */
    public const WOW = 'wow';

    /**
     * Represents a 'sad' reaction.
     */
    public const SAD = 'sad';

    /**
     * Represents an 'angry' reaction.
     */
    public const ANGRY = 'angry';

    /**
     * Represents a 'thankful' reaction.
     */
    public const THANKFUL = 'thankful';

    /**
     * Represents a 'support' reaction.
     */
    public const SUPPORT = 'support';

    /**
     * Represents a 'care' reaction.
     */
    public const CARE = 'care';

    /**
     * Represents a 'celebrate' reaction.
     */
    public const CELEBRATE = 'celebrate';

    /**
     * Get all possible values of the enum.
     *
     * @return array
     */
    public static function getValues(): array
    {
        return [
            self::LIKE,
            self::DISLIKE,
            self::LOVE,
            self::HAHA,
            self::WOW,
            self::SAD,
            self::ANGRY,
            self::THANKFUL,
            self::SUPPORT,
            self::CARE,
            self::CELEBRATE,
        ];
    }

    /**
     * Get the display name for the current reaction type.
     *
     * @return string
     */
    public function getDisplayNames(): string
    {
        return match ($this) {
            self::LIKE => 'Like',
            self::DISLIKE => 'Dislike',
            self::LOVE => 'Love',
            self::HAHA => 'Haha',
            self::WOW => 'Wow',
            self::SAD => 'Sad',
            self::ANGRY => 'Angry',
            self::THANKFUL => 'Thankful',
            self::SUPPORT => 'Support',
            self::CARE => 'Care',
            self::CELEBRATE => 'Celebrate',
        };
    }

    /**
     * Get the emoji representation for the current reaction type.
     *
     * @return string
     */
    public function getEmoji(): string
    {
        return match ($this) {
            self::LIKE => '👍',
            self::DISLIKE => '👎',
            self::LOVE => '❤️',
            self::HAHA => '😂',
            self::WOW => '😮',
            self::SAD => '😢',
            self::ANGRY => '😡',
            self::THANKFUL => '🙏',
            self::SUPPORT => '👏',
            self::CARE => '❤️‍🩹',
            self::CELEBRATE => '🎉',
        };
    }

    /**
     * Get the icon name for the current reaction type.
     *
     * @return string
     */
    public function getIcon(): string
    {
        return match ($this) {
            self::LIKE => 'like',
            self::DISLIKE => 'dislike',
            self::LOVE => 'love',
            self::HAHA => 'haha',
            self::WOW => 'wow',
            self::SAD => 'sad',
            self::ANGRY => 'angry',
            self::THANKFUL => 'thankful',
            self::SUPPORT => 'support',
            self::CARE => 'care',
            self::CELEBRATE => 'celebrate',
        };
    }
}
