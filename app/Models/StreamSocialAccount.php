<?php

namespace App\Models;

use App\Enums\StreamSocialPlatform;

class StreamSocialAccount extends BaseModel
{
    protected $fillable = [
        'platform',
        'name',
        'enabled',
        'credentials',
        'meta',
    ];

    protected function casts(): array
    {
        return [
            'platform' => StreamSocialPlatform::class,
            'enabled' => 'boolean',
            'credentials' => 'encrypted:array',
            'meta' => 'array',
        ];
    }

    public function postRules()
    {
        return $this->hasMany(StreamSocialPostRule::class, 'stream_social_account_id');
    }
}
