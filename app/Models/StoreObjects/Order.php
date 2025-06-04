<?php

namespace App\Models\StoreObjects;

use App\Casts\MoneyValueCast;
use App\Models\AuthObjects\User;
use App\Models\StoreObjects\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'provider_id',
        'friendly_id',
        'checkout_id',
        'promotion_id',
        'status',
        'email',
        'username',
        'email_marketing_opt_in',
        'message',
        'billing_address',
        'shipping_address',
        'subtotal',
        'shipping',
        'tax',
        'donation',
        'discount',
        'total',
        'currency',
        'user_id',
    ];

    protected $casts = [
        'billing_address' => 'array',
        'shipping_address' => 'array',
        'email_marketing_opt_in' => 'boolean',
        'subtotal' => MoneyValueCast::class,
        'shipping' => MoneyValueCast::class,
        'tax' => MoneyValueCast::class,
        'donation' => MoneyValueCast::class,
        'discount' => MoneyValueCast::class,
        'total' => MoneyValueCast::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function getFormattedTotalAttribute(): string
    {
        return $this->total ? $this->total->symbolFormatted() : 'N/A';
    }

    public function getCustomerNameAttribute(): string
    {
        return $this->billing_address['name'] ?? $this->username ?? $this->email;
    }

    public function orderItems(): HasMany
    {
        return $this->items();
    }
}
