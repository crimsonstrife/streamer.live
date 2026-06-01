<?php

namespace App\Models\StoreObjects;

use Illuminate\Database\Eloquent\Model;

class FourthwallThankYou extends Model
{
    protected $fillable = [
        'provider_id',
        'provider',
        'media_url',
        'contribution_id',
        'contribution_type',
        'shop_id',
        'supporter_email',
        'supporter_username',
        'supporter_message',
        'raw_payload',
        'synced_at',
    ];

    protected $casts = [
        'raw_payload' => 'array',
        'synced_at' => 'datetime',
    ];
}
