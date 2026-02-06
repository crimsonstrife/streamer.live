<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StreamSocialPostRule extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'stream_social_account_id',
        'event',                // 'live' for now
        'streamer_username',    // nullable = any streamer
        'category_pattern',     // nullable = any category
        'message_template',
        'enabled',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
        ];
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(StreamSocialAccount::class, 'stream_social_account_id');
    }

    public static function defaultMessageTemplate(): string
    {
        return '{streamer} is live in {category}! {title} {url}';
    }
}
