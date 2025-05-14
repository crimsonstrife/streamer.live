<?php

namespace App\Models;

use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\HasReactions;
use App\Utilities\ModelResolver;
use App\Utilities\ModelResolver as M;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Reply extends Message
{
    use HasOwner;
    use HasOwnerAvatar;
    use HasReactions;
    use LogsActivity;

    protected $table = 'comments';

    protected $fillable = [
        'text',
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

    public function comment(): BelongsTo
    {
        return $this->belongsTo(M::commentClass());
    }

    public function commentedOn(): MorphTo
    {
        return $this->morphTo();
    }

    public function commentedBy(): MorphTo
    {
        return $this->morphTo();
    }

    public function replyReactions(): HasManyThrough
    {
        return $this->hasManyThrough(
            ModelResolver::reactionModel(), // Reaction class
            self::class,                    // through Comment (as Reply)
            'reply_id',                     // replies.reply_id → parent comment id
            'reactable_id',                 // reactions.reactable_id → reply comment id
            'id',                           // parent comment PK
            'id'                            // reply comment PK
        )
            ->where('reactable_type', self::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('comment')
            ->logFillable()
            ->logOnlyDirty()                // only changed fields
            ->dontSubmitEmptyLogs();
    }
}
