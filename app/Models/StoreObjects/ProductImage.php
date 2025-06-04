<?php

namespace App\Models\StoreObjects;

use App\Models\BaseModel;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductVariant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int|null $product_id
 * @property int|null $variant_id
 * @property string|null $provider_id
 * @property string|null $url
 * @property string|null $local_path
 * @property string|null $alt_text
 * @property int|null $width
 * @property int|null $height
 * @property string|null $model_name
 * @property int|null $model_height_cm
 * @property string|null $model_size_worn
 * @property string|null $model_description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read string $image_url
 * @property-read Product|null $product
 * @property-read ProductVariant|null $variant
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereLocalPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereVariantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereWidth($value)
 *
 * @mixin \Eloquent
 */
class ProductImage extends BaseModel
{
    protected $fillable = [
        'product_id',
        'variant_id',
        'provider_id',
        'url',
        'local_path',
        'alt_text',
        'width',
        'height',
        'model_name',
        'model_height_cm',
        'model_size_worn',
        'model_description',
    ];

    /**
     * Get the product that owns this image.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the variant that owns this image.
     */
    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    /**
     * Get the image URL, preferring local if available.
     */
    public function getImageUrlAttribute(): ?string
    {
        $returnURL = null;
        // If the local path is set, and starts with '/storage/', remove it
        if (isset($this->local_path) && starts_with($this->local_path, '/storage/')) {
            // Remove the '/storage/' from the path
            $returnURL = str_replace('/storage/', '', $this->local_path);
        }

        return $this->local_path ? Storage::url($returnURL) : $this->url;
    }
}
