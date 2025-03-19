<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 *
 *
 * @property int $id
 * @property string $provider_id
 * @property int $product_id
 * @property string $name
 * @property string|null $sku
 * @property numeric $price
 * @property numeric|null $compare_at_price
 * @property string|null $stock_status
 * @property int $stock_count
 * @property int|null $weight
 * @property string|null $weight_unit
 * @property int|null $length
 * @property int|null $width
 * @property int|null $height
 * @property string|null $dimension_unit
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductImage> $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereCompareAtPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereDimensionUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereStockCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereStockStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereWeightUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereWidth($value)
 * @mixin \Eloquent
 */
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
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
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

    public function getNameAttribute()
    {
        return html_entity_decode($this->attributes['name']);
    }
}
