<?php

namespace App\Models\ContentObjects;

use App\Models\BaseModel;
use App\Traits\HasSlug;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentType extends BaseModel
{
    use HasSlug;
    use IsPermissible;

    protected $table = 'content_types';

    protected $fillable = [
        'name',
        'singular_name',
        'slug',
        'description',
        'icon',
        'is_active',
        'has_revisor',
        'has_tags',
        'route_prefix',
        'sort_order',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'has_revisor' => 'boolean',
        'has_tags' => 'boolean',
        'sort_order' => 'integer',
        'settings' => 'array',
    ];

    protected function slugSourceColumn(): string
    {
        return 'name';
    }

    public function fields(): HasMany
    {
        return $this->hasMany(ContentField::class)->orderBy('sort_order');
    }

    public function entries(): HasMany
    {
        return $this->hasMany(ContentEntry::class);
    }

    public function layouts(): HasMany
    {
        return $this->hasMany(ContentLayout::class);
    }

    /**
     * Get active fields ordered by sort_order.
     */
    public function getActiveFields(): Collection
    {
        return $this->fields()->orderBy('sort_order')->get();
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the default layout for a given type (list, detail, block).
     */
    public function getDefaultLayout(string $type): ?ContentLayout
    {
        return $this->layouts()
            ->where('type', $type)
            ->where('is_default', true)
            ->first();
    }
}
