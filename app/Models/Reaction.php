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
