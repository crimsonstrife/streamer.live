<?php

namespace App\Models\StoreObjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Promotion extends Model
{
    protected $fillable = [
        'provider_id',
        'provider',
        'title',
        'code',
        'discount_type',
        'percentage',
        'amount_value',
        'amount_currency',
        'shipping_option',
        'applies_to',
        'once_per_order',
        'min_order_value',
        'min_order_currency',
        'max_uses',
        'one_use_per_customer',
        'status',
        'type',
    ];

    protected $casts = [
        'once_per_order'         => 'boolean',
        'one_use_per_customer'   => 'boolean',
        'percentage'             => 'integer',
        'amount_value'           => 'integer',
        'min_order_value'        => 'integer',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'promotion_product');
    }
}
