<?php

namespace App\Models\BlogObjects;

use App\Enums\ReactionType;
use App\Models\AuthObjects\User;
use App\Models\BaseModel as Model;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\IsPermissible;
use App\Utilities\ModelResolver;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;

/**
 * Class Reaction
 *
 * This class represents a reaction model that can be associated with various entities in the application.
 * It supports polymorphic relationships for the owner and the re-actable entities.
 *
 * @property int $id
 * @property string $owner_type
 * @property int $owner_id
 * @property string $reactable_type
 * @property int $reactable_id
 * @property ReactionType $type
 * @property int $point_value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|Eloquent $owner
 * @property-read \Illuminate\Database\Eloquent\Model|Eloquent $reactable
 *
 * @method static Builder<static>|Reaction newModelQuery()
 * @method static Builder<static>|Reaction newQuery()
 * @method static Builder<static>|Reaction query()
 * @method static Builder<static>|Reaction whereCreatedAt($value)
 * @method static Builder<static>|Reaction whereId($value)
 * @method static Builder<static>|Reaction whereOwnerId($value)
 * @method static Builder<static>|Reaction whereOwnerType($value)
 * @method static Builder<static>|Reaction wherePointValue($value)
 * @method static Builder<static>|Reaction whereReactableId($value)
 * @method static Builder<static>|Reaction whereReactableType($value)
 * @method static Builder<static>|Reaction whereType($value)
 * @method static Builder<static>|Reaction whereUpdatedAt($value)
 *
 * @mixin Eloquent
 */
class Reaction extends Model
{
    use HasOwner;
    use HasOwnerAvatar;
    use IsPermissible;

    protected string $userRelationshipName = 'owner';

    protected $fillable = ['type', 'owner_id', 'owner_type', 'reactable_id', 'reactable_type', 'point_value'];

    protected $casts = [
        'point_value' => 'integer',
    ];

    /**
     * Get the owning model of the reaction.
     *
     * This method defines a polymorphic relationship to the owner model.
     */
    public function owner(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the reactable model that the reaction belongs to.
     *
     * This method defines a polymorphic relationship to the reactable model.
     */
    public function reactable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the type of the reaction.
     *
     * This method returns the reaction type as an instance of the ReactionType enum.
     */
    public function getTypeAttribute(): ReactionType
    {
        return ReactionType::from($this->attributes['type']);
    }

    /** @return BelongsTo<User&CommenterContract, Reaction> **/
    public function user(): BelongsTo
    {
        return $this->belongsTo(ModelResolver::userModel());
    }
}
