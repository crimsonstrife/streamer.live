<?php

namespace App\Models;

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

    public static function booted()
    {
        static::creating(function ($review) {
            if (! $review->user_id) {
                return;
            }

            $review->is_verified = OrderItem::whereHas(
                'order',
                fn ($q) => $q->where('user_id', $review->user_id)
            )->whereHas(
                'variant',
                fn ($q) => $q->where('product_id', $review->product_id)
            )->exists();
        });
    }

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
}
