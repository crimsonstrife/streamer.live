<?php

namespace App\Models\SharedObjects;

use App\Models\BaseModel;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class BrandPartner extends BaseModel implements HasMedia
{
    use InteractsWithMedia;
    use IsPermissible;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'status',
        'headline',
        'excerpt',
        'body',
        'badge',
        'cta_label',
        'is_featured',
        'is_active',
        'show_disclosure',
        'disclosure_text',
        'sort_order',
        'starts_at',
        'ends_at',
        'meta',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'show_disclosure' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'meta' => 'array',
    ];

    public function links(): HasMany
    {
        return $this->hasMany(BrandPartnerLink::class)
            ->orderByDesc('is_primary')
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderBy('sort_order')
            ->orderBy('name');
    }

    public function scopeOfTypes(Builder $query, array $types = []): Builder
    {
        $types = array_values(array_filter($types));

        if ($types === []) {
            return $query;
        }

        return $query->whereIn('type', $types);
    }

    public function scopeDisplayable(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->where('status', 'active')
            ->where(function (Builder $query) {
                $query->whereNull('starts_at')
                    ->orWhere('starts_at', '<=', now());
            })
            ->where(function (Builder $query) {
                $query->whereNull('ends_at')
                    ->orWhere('ends_at', '>=', now());
            });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logos')->singleFile();
        $this->addMediaCollection('banners')->singleFile();
    }

    public function getLogoUrlAttribute(): ?string
    {
        $url = $this->getFirstMediaUrl('logos');

        return $url !== '' ? $url : null;
    }

    public function getBannerUrlAttribute(): ?string
    {
        $url = $this->getFirstMediaUrl('banners');

        return $url !== '' ? $url : null;
    }

    public function getPrimaryLinkAttribute(): ?BrandPartnerLink
    {
        $links = $this->relationLoaded('links')
            ? $this->links
            : $this->links()->where('is_active', true)->get();

        return $links->firstWhere('is_primary', true) ?? $links->first();
    }

    public function getEffectiveDisclosureTextAttribute(): ?string
    {
        if (! $this->show_disclosure) {
            return null;
        }

        if (filled($this->disclosure_text)) {
            return $this->disclosure_text;
        }

        return match ($this->type) {
            'affiliate' => 'Affiliate link',
            'sponsor' => 'Sponsored partner',
            default => 'Brand partner',
        };
    }
}
