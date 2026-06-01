<?php

namespace App\Models\StoreObjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FourthwallGiveawayLink extends Model
{
    protected $fillable = [
        'provider_id',
        'provider',
        'package_id',
        'product_provider_id',
        'product_id',
        'link',
        'status',
        'redeemed_at',
        'raw_payload',
        'synced_at',
    ];

    protected $casts = [
        'raw_payload' => 'array',
        'redeemed_at' => 'datetime',
        'synced_at' => 'datetime',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(FourthwallGiveawayPackage::class, 'package_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
