<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProductImage extends BaseModel
{
    protected $fillable = [
        'product_id',
        'variant_id',
        'provider_id',
        'url',
        'local_path',
        'width',
        'height'
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
    public function getImageUrlAttribute(): string
    {
        return $this->local_path ? Storage::url($this->local_path) : $this->url;
    }
}
