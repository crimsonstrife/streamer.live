<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Collection extends BaseModel
{
    protected $fillable = [
        'provider_id',
        'provider',
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the products belonging to this collection.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'collection_products');
    }
}
