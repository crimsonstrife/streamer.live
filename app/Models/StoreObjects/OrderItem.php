<?php

namespace App\Models\StoreObjects;

use App\Casts\MoneyValueCast;
use App\Models\StoreObjects\Order;
use App\Models\StoreObjects\ProductVariant;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use IsPermissible;

    protected $fillable = [
        'order_id',
        'provider_id',
        'name',
        'slug',
        'description',
        'image_url',
        'variant_id',
        'sku',
        'variant_name',
        'quantity',
        'unit_price',
        'price',
        'currency',
        'attributes',
    ];

    protected $casts = [
        'unit_price' => MoneyValueCast::class,
        'price' => MoneyValueCast::class,
        'attributes' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        return $this->price ? $this->price->symbolFormatted() : 'N/A';
    }

    public function getColorAttribute(): ?string
    {
        return $this->attributes['color']['name'] ?? null;
    }

    public function getSizeAttribute(): ?string
    {
        return $this->attributes['size']['name'] ?? null;
    }
}
