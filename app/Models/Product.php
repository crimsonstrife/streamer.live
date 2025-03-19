<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

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
        'price' => 'float',
        'compare_at_price' => 'float'
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
