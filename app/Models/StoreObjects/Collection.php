<?php

namespace App\Models\StoreObjects;

use App\Models\BaseModel;
use App\Models\StoreObjects\Product;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 *
 *
 * @property int $id
 * @property string $provider_id
 * @property string $provider
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\Product> $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Collection whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Collection extends BaseModel
{
    use IsPermissible;

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

    public function getNameAttribute()
    {
        return html_entity_decode($this->attributes['name']);
    }

    public function getDescriptionAttribute()
    {
        return html_entity_decode($this->attributes['description']);
    }
}
