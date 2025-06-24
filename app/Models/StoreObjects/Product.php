<?php

namespace App\Models\StoreObjects;

use App\Casts\MoneyValueCast;
use App\Models\BaseModel;
use App\Models\SharedObjects\Category;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\ProductImage;
use App\Models\StoreObjects\ProductReview;
use App\Models\StoreObjects\ProductVariant;
use App\Traits\IsPermissible;
use App\Utilities\ShopHelper;
use DB;
use Eloquent;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Tags\HasTags;

/**
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
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Collection> $collections
 * @property-read int|null $collections_count
 * @property-read string $primary_image_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ProductImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ProductVariant> $variants
 * @property-read int|null $variants_count
 *
 * @method static Builder<static>|Product newModelQuery()
 * @method static Builder<static>|Product newQuery()
 * @method static Builder<static>|Product query()
 * @method static Builder<static>|Product whereAccess($value)
 * @method static Builder<static>|Product whereCompareAtPrice($value)
 * @method static Builder<static>|Product whereCreatedAt($value)
 * @method static Builder<static>|Product whereDescription($value)
 * @method static Builder<static>|Product whereExternalUrl($value)
 * @method static Builder<static>|Product whereId($value)
 * @method static Builder<static>|Product whereName($value)
 * @method static Builder<static>|Product wherePrice($value)
 * @method static Builder<static>|Product whereProvider($value)
 * @method static Builder<static>|Product whereProviderId($value)
 * @method static Builder<static>|Product whereSlug($value)
 * @method static Builder<static>|Product whereState($value)
 * @method static Builder<static>|Product whereUpdatedAt($value)
 *
 * @mixin Eloquent
 */
class Product extends BaseModel implements Searchable, HasMedia
{
    use HasTags;
    use IsPermissible;
    use InteractsWithMedia;

    protected $fillable = [
        'provider_id',
        'provider',
        'name',
        'slug',
        'description',
        'state',
        'access',
        'price',
        'is_featured',
        'compare_at_price',
        'external_url',
    ];

    protected $casts = [
        'price' => MoneyValueCast::class,
        'compare_at_price' => MoneyValueCast::class,
        'is_featured' => 'boolean',
    ];

    protected $appends = [
        'more_details',
        'product_information',
    ];

    /**
     * Cached additional data for this product.
     *
     * @var array|null
     */
    protected $cachedAdditionalData = null;

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

    public function getNameAttribute(): string
    {
        return html_entity_decode($this->attributes['name']);
    }

    public function getDescriptionAttribute(): string
    {
        return html_entity_decode($this->attributes['description']);
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

    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function getAverageRatingAttribute(): ?float
    {
        return $this->reviews()->avg('rating');
    }

    public function getReviewCountAttribute(): int
    {
        return $this->reviews()->count();
    }

    public function getVerifiedReviewCountAttribute(): int
    {
        return $this->reviews()->where('is_verified', true)->count();
    }

    public function additionalData(): array
    {
        if ($this->cachedAdditionalData !== null) {
            return $this->cachedAdditionalData;
        }

        $data = DB::table('additional_product_data')
            ->where('product_id', $this->id)
            ->first();

        $this->cachedAdditionalData = (array) $data;

        return $this->cachedAdditionalData;
    }

    public function getMoreDetailsAttribute(): string
    {
        $moreDetails = $this->additionalData()['more_details'] ?? '';

        return html_entity_decode($moreDetails);
    }

    public function getProductInformationAttribute(): string
    {
        $productInformation = $this->additionalData()['product_information'] ?? '';

        return html_entity_decode($productInformation);
    }

    public function getSearchResult(): SearchResult
    {
        $url = route(ShopHelper::getShopSlug().'.product', $this->slug);

        return new SearchResult(
            $this,
            $this->name,
            $url
        );
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useDisk('public');
    }

    public function productMedia(): MorphMany
    {
        return $this
            ->media() // the base Spatie morphMany
            ->where('model_type', 'App\Models\StoreObjects\Product') // only “products” files
            ->where('collection_name', 'images');
    }
}
