<?php

namespace App\Models\CommunityObjects;

use App\Enums\ApprovalStatus;
use App\Models\AuthObjects\User;
use App\Models\BaseModel as Model;
use App\Models\BlogObjects\Reaction;
use App\Models\SharedObjects\Category;
use App\Services\BBCodeService;
use App\Traits\HasReactions;
use App\Traits\HasSlug;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;
use Xetaio\Mentions\Models\Traits\HasMentionsTrait;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $category_id
 * @property string $title
 * @property string $slug
 * @property string $body
 * @property Carbon|null $pinned_until
 * @property bool $is_locked
 * @property ApprovalStatus $approval_status
 * @property int|null $approval_reviewed_by
 * @property Carbon|null $approval_reviewed_at
 * @property string|null $approval_notes
 * @property Carbon|null $last_activity_at
 * @property int $posts_count
 * @property int $views_count
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
class Thread extends Model implements Searchable
{
    use HasMentionsTrait;
    use HasReactions;
    use HasSlug;
    use HasTags;
    use IsPermissible;
    use LogsActivity;
    use SoftDeletes;

    protected $table = 'threads';

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'body',
        'pinned_until',
        'is_locked',
        'approval_status',
        'approval_reviewed_by',
        'approval_reviewed_at',
        'approval_notes',
        'last_activity_at',
        'posts_count',
        'views_count',
    ];

    protected $casts = [
        'pinned_until'         => 'datetime',
        'is_locked'            => 'bool',
        'approval_status'      => ApprovalStatus::class,
        'approval_reviewed_at' => 'datetime',
        'last_activity_at'     => 'datetime',
        'posts_count'          => 'int',
        'views_count'          => 'int',
        'created_at'           => 'datetime',
        'updated_at'           => 'datetime',
        'deleted_at'           => 'datetime',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected function slugSourceColumn(): string
    {
        return 'title';
    }

    // -----------------------------------------------------------------
    // Relationships
    // -----------------------------------------------------------------

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approval_reviewed_by');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(ThreadPost::class, 'thread_id')
            ->orderBy('created_at');
    }

    public function approvedPosts(): HasMany
    {
        return $this->posts()
            ->where('approval_status', ApprovalStatus::Approved->value);
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

    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('approval_status', ApprovalStatus::Rejected->value);
    }

    public function scopePinned(Builder $query): Builder
    {
        return $query->whereNotNull('pinned_until')
            ->where('pinned_until', '>', now());
    }

    /**
     * Ordered feed: pinned first, then most-recently-active.
     */
    public function scopeFeed(Builder $query): Builder
    {
        return $query->approved()
            ->orderByRaw('(pinned_until IS NOT NULL AND pinned_until > NOW()) DESC')
            ->orderByDesc('last_activity_at')
            ->orderByDesc('created_at');
    }

    public function scopeForCategory(Builder $query, int $categoryId): Builder
    {
        return $query->where('category_id', $categoryId);
    }

    // -----------------------------------------------------------------
    // State helpers
    // -----------------------------------------------------------------

    public function isPinned(): bool
    {
        return $this->pinned_until?->isFuture() ?? false;
    }

    public function isApproved(): bool
    {
        return $this->approval_status === ApprovalStatus::Approved;
    }

    public function isPending(): bool
    {
        return $this->approval_status === ApprovalStatus::Pending;
    }

    public function isLocked(): bool
    {
        return (bool) $this->is_locked;
    }

    /**
     * A thread is visible to a given viewer if:
     *  - approved, OR
     *  - the viewer is the author, OR
     *  - the viewer is a moderator.
     */
    public function isVisibleTo(?User $user): bool
    {
        if ($this->isApproved()) {
            return true;
        }

        if (! $user) {
            return false;
        }

        if ($user->id === $this->user_id) {
            return true;
        }

        return $user->isModerator() || $user->isAdmin();
    }

    /**
     * Can the given user reply to this thread?
     */
    public function canReply(?User $user): bool
    {
        if (! $user || ! $this->isApproved() || $this->isLocked()) {
            return false;
        }

        return true;
    }

    /**
     * Can the given user edit this thread?
     * Authors can edit their own threads; moderators can always edit.
     */
    public function canEdit(?User $user): bool
    {
        if (! $user) {
            return false;
        }

        if ($user->isModerator() || $user->isAdmin()) {
            return true;
        }

        return $user->id === $this->user_id && ! $this->isLocked();
    }

    // -----------------------------------------------------------------
    // BBCode body accessors
    // -----------------------------------------------------------------

    /**
     * Rendered HTML for display. Wraps BBCodeService so views can just echo
     * {!! $thread->body_html !!} without knowing the service exists.
     */
    protected function bodyHtml(): Attribute
    {
        return Attribute::get(fn () => app(BBCodeService::class)->render($this->body));
    }

    /**
     * BBCode source for editing (unparsed XML). Populate the SCEditor textarea
     * with {{ $thread->body_source }}.
     */
    protected function bodySource(): Attribute
    {
        return Attribute::get(fn () => app(BBCodeService::class)->unparse($this->body));
    }

    // -----------------------------------------------------------------
    // Activity log
    // -----------------------------------------------------------------

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('community-thread')
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    // -----------------------------------------------------------------
    // Searchable
    // -----------------------------------------------------------------

    public function getSearchResult(): SearchResult
    {
        return new SearchResult(
            $this,
            $this->title,
            route('community.thread.show', $this->slug),
        );
    }
}
