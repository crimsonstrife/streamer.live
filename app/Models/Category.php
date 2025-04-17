<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Stephenjude\FilamentBlog\Models\Category as BaseCategory;

class Category extends BaseCategory
{
    /**
     * @var string
     */
    protected $table = 'categories';

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'is_visible',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(\App\Models\Post::class, 'category_id', 'id');
    }

    public function products(): MorphToMany
    {
        return $this->morphedByMany(Product::class, 'categorizable');
    }

    /**
     * @param  Builder<\Stephenjude\FilamentBlog\Models\Category>  $query
     * @return Builder<Category>
     */
    public function scopeIsVisible(Builder $query): Builder
    {
        return $query->whereIsVisible(true);
    }

    /**
     * @param  Builder<Category>  $query
     * @return Builder<Category>
     */
    public function scopeIsInvisible(Builder $query): Builder
    {
        return $query->whereIsVisible(false);
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
