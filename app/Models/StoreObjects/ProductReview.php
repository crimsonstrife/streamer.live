<?php

namespace App\Models\StoreObjects;

use App\Models\AuthObjects\User;
use App\Models\StoreObjects\OrderItem;
use App\Models\StoreObjects\Product;
use App\Utilities\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductReview extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'rating',
        'review',
        'is_verified',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function canReview(): bool
    {
        return Helpers::userHasPurchasedProduct($this->user_id, $this->product_id);
    }

    public function verifyPurchase($user_id, $product_id): bool
    {
        return OrderItem::whereHas(
            'order',
            static fn ($q) => $q->where('user_id', $user_id)
        )->whereHas(
            'variant',
            fn ($q) => $q->where('product_id', $product_id)
        )->exists();
    }
}
