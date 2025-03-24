<?php

namespace App\Models;

use App\Enums\ReactionType;
use App\Models\BaseModel as Model;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Reaction
 *
 * This class represents a reaction model that can be associated with various entities in the application.
 * It supports polymorphic relationships for the owner and the re-actable entities.
 *
 * @package App\Models
 * @property int $id
 * @property string $owner_type
 * @property int $owner_id
 * @property string $reactable_type
 * @property int $reactable_id
 * @property ReactionType $type
 * @property int $point_value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $owner
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $reactable
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereOwnerType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction wherePointValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereReactableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereReactableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reaction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Reaction extends Model
{
    use HasOwner;
    use HasOwnerAvatar;

    protected string $userRelationshipName = 'owner';

    protected $fillable = ['type', 'owner_id', 'owner_type', 'reactable_id', 'reactable_type', 'point_value'];

    protected $casts = [
        'point_value' => 'integer',
    ];

    /**
     * Get the owning model of the reaction.
     *
     * This method defines a polymorphic relationship to the owner model.
     *
     * @return MorphTo
     */
    public function owner(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the reactable model that the reaction belongs to.
     *
     * This method defines a polymorphic relationship to the reactable model.
     *
     * @return MorphTo
     */
    public function reactable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the type of the reaction.
     *
     * This method returns the reaction type as an instance of the ReactionType enum.
     *
     * @return ReactionType
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
