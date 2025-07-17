<?php

namespace App\Models\SharedObjects;

use App\Models\BaseModel as Model;
use App\Models\BlogObjects\Reaction;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Utilities\ModelResolver as M;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Xetaio\Mentions\Models\Traits\HasMentionsTrait;

class Message extends Model
{
    use HasOwner;
    use HasOwnerAvatar;
    use LogsActivity;
    use HasMentionsTrait;

    protected $table = 'comments';

    protected $userRelationshipName = 'commented_by';

    protected $fillable = [
        'content',
        'commented_on_type',
        'commented_on_id',
        'commented_by_type',
        'commented_by_id',
        'reply_id',
        'approved',
        'is_spam',
    ];

    protected $casts = [
        'approved' => 'bool',
        'is_spam' => 'bool',
    ];

    public function getTable()
    {
        return M::commentModel()->table;
    }

    public function isEdited(): bool
    {
        return $this->created_at->diffInSeconds($this->updated_at) > 0;
    }

    public function commenter(): MorphTo
    {
        return $this->morphTo();
    }

    /** @return MorphMany<Reaction> */
    public function reactions(): MorphMany
    {
        return $this->morphMany(M::reactionClass(), 'reactable');
    }

    public function ownerReactions(): HasMany
    {
        return $this->hasMany(M::reactionClass(), 'comment_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('message')
            ->logFillable()
            ->logOnlyDirty()                // only changed fields
            ->dontSubmitEmptyLogs();
    }

    // Expose the polymorphic relation for the logs:
    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'subject')
            ->orderBy('created_at', 'desc');
    }

    public function getTextAttribute(): ?string
    {
        return $this->attributes['content'] ?? null;
    }

    public function setTextAttribute($value): void
    {
        $this->attributes['content'] = $value;
    }
}
