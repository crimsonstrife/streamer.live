<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends BaseModel
{
    protected $fillable = [
        'provider_id',
        'product_id',
        'name',
        'sku',
        'price',
        'compare_at_price',
        'stock_status',
        'stock_count',
        'weight',
        'weight_unit',
        'length',
        'width',
        'height',
        'dimension_unit'
    ];

    protected $casts = [
        'price' => 'float',
        'compare_at_price' => 'float',
    ];

    /**
     * Get the product that this variant belongs to.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get images for this variant.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'variant_id');
    }
}
