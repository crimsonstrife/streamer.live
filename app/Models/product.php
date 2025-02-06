<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'price',
        'external_url',
        'image',
        'collection_slug'
    ];

    public function collection(): BelongsTo
    {
        return $this->belongsTo(ProductCollection::class, 'collection_slug', 'slug');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('product_images');
    }
}
