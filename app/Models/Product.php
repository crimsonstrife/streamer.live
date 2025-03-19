<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

/**
 *
 *
 * @property int $id
 * @property string $provider_id
 * @property string $provider
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $state
 * @property string|null $access
 * @property numeric $price
 * @property numeric|null $compare_at_price
 * @property string|null $external_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Collection> $collections
 * @property-read int|null $collections_count
 * @property-read string $primary_image_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductVariant> $variants
 * @property-read int|null $variants_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCompareAtPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereExternalUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Product extends BaseModel
{
    protected $fillable = [
        'provider_id',
        'provider',
        'name',
        'slug',
        'description',
        'state',
        'access',
        'price',
        'compare_at_price',
        'external_url'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2'
    ];

    /**
     * Get the collections this product belongs to.
     */
    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class, 'collection_products');
    }

    /**
     * Get the variants for this product.
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Get the images for this product.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Get the primary image URL (first image or placeholder).
     */
    public function getPrimaryImageUrlAttribute(): string
    {
        $image = $this->images()->first();
        return $image ? Storage::url($image->local_path ?? $image->url) : '/default-image.jpg';
    }
}
