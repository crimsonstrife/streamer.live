<?php

namespace App\Models;

use App\Models\Message;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\HasReactions;
use App\Utilities\ModelResolver as M;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reply extends Message
{
    use HasOwner;
    use HasOwnerAvatar;
    use HasReactions;

    protected $table = 'comments';

    protected $fillable = [
        'text',
        'author_type',
        'author_id',
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
}
