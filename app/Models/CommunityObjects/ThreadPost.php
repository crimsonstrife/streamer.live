<?php

namespace App\Models\CommunityObjects;

use App\Enums\ApprovalStatus;
use App\Models\AuthObjects\User;
use App\Models\BaseModel as Model;
use App\Models\BlogObjects\Reaction;
use App\Observers\ThreadPostObserver;
use App\Traits\HasReactions;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Xetaio\Mentions\Models\Traits\HasMentionsTrait;

/**
 * @property int $id
 * @property int $thread_id
 * @property int $user_id
 * @property int|null $reply_to_post_id
 * @property string $body
 * @property ApprovalStatus $approval_status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[ObservedBy([ThreadPostObserver::class])]
class ThreadPost extends Model
{
    use HasMentionsTrait;
    use HasReactions;
    use IsPermissible;
    use LogsActivity;
    use SoftDeletes;

    protected $table = 'thread_posts';

    protected $fillable = [
        'thread_id',
        'user_id',
        'reply_to_post_id',
        'body',
        'approval_status',
    ];

    protected $casts = [
        'approval_status' => ApprovalStatus::class,
        'created_at'      => 'datetime',
        'updated_at'      => 'datetime',
        'deleted_at'      => 'datetime',
    ];

    // -----------------------------------------------------------------
    // Relationships
    // -----------------------------------------------------------------

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function parentPost(): BelongsTo
    {
        return $this->belongsTo(self::class, 'reply_to_post_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'reply_to_post_id')
            ->where('approval_status', ApprovalStatus::Approved->value)
            ->orderBy('created_at');
    }

    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'subject')
            ->orderBy('created_at', 'desc');
    }

    // -----------------------------------------------------------------
    // Scopes
    // -----------------------------------------------------------------

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('approval_status', ApprovalStatus::Approved->value);
    }

    public function scopePendingReview(Builder $query): Builder
    {
        return $query->where('approval_status', ApprovalStatus::Pending->value);
    }

    public function scopeTopLevel(Builder $query): Builder
    {
        return $query->whereNull('reply_to_post_id');
    }

    // -----------------------------------------------------------------
    // State helpers
    // -----------------------------------------------------------------

    public function isApproved(): bool
    {
        return $this->approval_status === ApprovalStatus::Approved;
    }

    public function isPending(): bool
    {
        return $this->approval_status === ApprovalStatus::Pending;
    }

    public function canEdit(?User $user): bool
    {
        if (! $user) {
            return false;
        }

        if ($user->isModerator() || $user->isAdmin()) {
            return true;
        }

        return $user->id === $this->user_id;
    }

    public function isVisibleTo(?User $user): bool
    {
        if ($this->isApproved()) {
            return true;
        }

        if (! $user) {
            return false;
        }

        return $user->id === $this->user_id || $user->isModerator() || $user->isAdmin();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('community-thread-post')
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
