<?php

namespace App\Models\StoreObjects;

use App\Casts\MoneyValueCast;
use App\Models\BaseModel;
use App\Models\StoreObjects\OrderItem;
use App\Models\StoreObjects\ProductImage;
use App\Models\StoreObjects\Product;
use App\Traits\IsPermissible;
use Eloquent;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\Tags\HasTags;

/**
 * @property int $id
 * @property string $provider_id
 * @property int $product_id
 * @property string $name
 * @property string|null $description
 * @property string|null $color_name
 * @property string|null $color_swatch
 * @property string|null $size
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
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ProductImage> $images
 * @property-read int|null $images_count
 * @property-read Product $product
 *
 * @method static Builder<static>|ProductVariant newModelQuery()
 * @method static Builder<static>|ProductVariant newQuery()
 * @method static Builder<static>|ProductVariant query()
 * @method static Builder<static>|ProductVariant whereCompareAtPrice($value)
 * @method static Builder<static>|ProductVariant whereCreatedAt($value)
 * @method static Builder<static>|ProductVariant whereDimensionUnit($value)
 * @method static Builder<static>|ProductVariant whereHeight($value)
 * @method static Builder<static>|ProductVariant whereId($value)
 * @method static Builder<static>|ProductVariant whereLength($value)
 * @method static Builder<static>|ProductVariant whereName($value)
 * @method static Builder<static>|ProductVariant wherePrice($value)
 * @method static Builder<static>|ProductVariant whereProductId($value)
 * @method static Builder<static>|ProductVariant whereProviderId($value)
 * @method static Builder<static>|ProductVariant whereSku($value)
 * @method static Builder<static>|ProductVariant whereStockCount($value)
 * @method static Builder<static>|ProductVariant whereStockStatus($value)
 * @method static Builder<static>|ProductVariant whereUpdatedAt($value)
 * @method static Builder<static>|ProductVariant whereWeight($value)
 * @method static Builder<static>|ProductVariant whereWeightUnit($value)
 * @method static Builder<static>|ProductVariant whereWidth($value)
 *
 * @mixin Eloquent
 */
class ProductVariant extends BaseModel
{
    use HasTags;
    use IsPermissible;

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
        'dimension_unit',
        'description',
        'color_name',
        'color_swatch',
        'size',
    ];

    protected $casts = [
        'price' => MoneyValueCast::class,
        'compare_at_price' => MoneyValueCast::class,
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

    public function getNameAttribute(): string
    {
        return html_entity_decode($this->attributes['name']);
    }

    public function getFormattedPriceAttribute(): string
    {
        return $this->price ? $this->price->formatted() : 'N/A';
    }

    /**
     * @throws Exception
     */
    public function getSymbolPriceAttribute(): string
    {
        return $this->price ? $this->price->symbolFormatted() : 'N/A';
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'variant_id', 'id');
    }
}
