<?php

namespace App\Traits;

use App\Models\Reaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Trait HasReactions
 *
 * This trait provides methods to handle reactions for a model.
 *
 * @package App\Traits
 * @method morphMany(string $class, string $string)
 */
trait HasReactions
{
    /**
     * Define the polymorphic relationship for reactions.
     *
     * @return MorphMany
     */
    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    /**
     * Add a reaction to the model.
     *
     * @param string $type
     * @param Model $owner
     * @return Reaction
     */
    public function addReaction(string $type, Model $owner): Reaction
    {
        return $this->reactions()->create([
            'type' => $type,
            'owner_id' => $owner->id,
            'owner_type' => get_class($owner),
        ]);
    }

    /**
     * Remove a specific reaction.
     *
     * @param string $type
     * @param Model $owner
     * @return int
     */
    public function removeReaction(string $type, Model $owner): int
    {
        return $this->reactions()
            ->where('type', $type)
            ->where('owner_id', $owner->id)
            ->where('owner_type', get_class($owner))
            ->delete();
    }

    /**
     * Check if a specific type of reaction exists.
     *
     * @param string $type
     * @return bool
     */
    public function hasReaction(string $type): bool
    {
        return $this->reactions()->where('type', $type)->exists();
    }

    /**
     * Count reactions of a specific type.
     *
     * @param string|null $type
     * @return int
     */
    public function countReactions(string $type = null): int
    {
        $query = $this->reactions();
        if ($type) {
            $query->where('type', $type);
        }
        return $query->count();
    }

    /**
     * Get a summary of all reactions.
     * Returns counts for each reaction type of the model. "i.e. ['like' => 5, 'dislike' => 2]"
     * @return array
     */
    public function getReactionSummary(): array
    {
        return $this->reactions()
            ->select('type', DB::raw('COUNT(*) as count'))
            ->groupBy('type')
            ->pluck('count', 'type')
            ->toArray();
    }

    /**
     * Toggle a reaction on the model.
     *
     * @param string $type
     * @param Model $owner
     * @return string
     */
    public function toggleReaction(string $type, Model $owner): string
    {
        $reaction = $this->reactions()
            ->where('type', $type)
            ->where('owner_id', $owner->id)
            ->where('owner_type', get_class($owner))
            ->first();

        if ($reaction) {
            $reaction->delete();
            return 'removed';
        } else {
            $this->addReaction($type, $owner);
            return 'added';
        }
    }
}
