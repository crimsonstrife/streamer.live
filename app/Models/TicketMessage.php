<?php

namespace App\Models;

use App\Models\BaseModel as Model;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\IsPermissible;
use App\Utilities\ModelResolver as M;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Xetaio\Mentions\Models\Traits\HasMentionsTrait;

class TicketMessage extends Model
{
    use HasMentionsTrait;
    use HasOwner;
    use HasOwnerAvatar;
    use IsPermissible;
    use LogsActivity;

    protected $table = 'ticket_messages';

    protected $userRelationshipName = 'commented_by';

    protected $fillable = [
        'content',
        'commented_on_type',
        'commented_on_id',
        'commented_by_type',
        'commented_by_id',
        'reply_id',
        'is_public',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'is_public' => 'boolean',
    ];

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'reply_id')->with('replies');
    }

    public function getTable()
    {
        return M::ticketMessageModel()->table;
    }

    public function isEdited(): bool
    {
        return $this->created_at->diffInSeconds($this->updated_at) > 0;
    }

    public function commenter(): MorphTo
    {
        return $this->morphTo();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('ticket')
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

    public function content(): string
    {
        return html_entity_decode($this->content);
    }

    public function commentedOn(): MorphTo
    {
        return $this->morphTo();
    }

    public function commentedBy(): MorphTo
    {
        return $this->morphTo();
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'reply_id');
    }
}
