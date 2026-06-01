<?php

namespace App\Models\StoreObjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FourthwallGiveawayPackage extends Model
{
    protected $fillable = [
        'provider_id',
        'provider',
        'product_provider_id',
        'product_id',
        'link_count',
        'raw_payload',
        'synced_at',
    ];

    protected $casts = [
        'link_count' => 'integer',
        'raw_payload' => 'array',
        'synced_at' => 'datetime',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function links(): HasMany
    {
        return $this->hasMany(FourthwallGiveawayLink::class, 'package_id');
    }
}
