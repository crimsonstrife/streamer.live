<?php

namespace App\Models;

use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\HasReactions;
use App\Utilities\ModelResolver as M;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Reply extends Message
{
    use HasOwner;
    use HasOwnerAvatar;
    use HasReactions;

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
}
