<?php

namespace App\Models\SharedObjects;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BrandPartnerLink extends BaseModel
{
    protected $fillable = [
        'brand_partner_id',
        'label',
        'url',
        'link_type',
        'coupon_code',
        'button_text',
        'is_primary',
        'is_active',
        'open_in_new_tab',
        'nofollow',
        'sponsored',
        'sort_order',
        'meta',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_active' => 'boolean',
        'open_in_new_tab' => 'boolean',
        'nofollow' => 'boolean',
        'sponsored' => 'boolean',
        'meta' => 'array',
    ];

    protected static function booted(): void
    {
        static::saving(function (BrandPartnerLink $link) {
            if (! $link->is_primary || ! $link->brand_partner_id) {
                return;
            }

            static::query()
                ->where('brand_partner_id', $link->brand_partner_id)
                ->when(
                    $link->exists,
                    fn (Builder $query) => $query->whereKeyNot($link->getKey())
                )
                ->update(['is_primary' => false]);
        });
    }

    public function brandPartner(): BelongsTo
    {
        return $this->belongsTo(BrandPartner::class);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderByDesc('is_primary')
            ->orderBy('sort_order')
            ->orderBy('label');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopePrimary(Builder $query): Builder
    {
        return $query->where('is_primary', true);
    }

    public function getRelAttribute(): string
    {
        $rels = ['noopener'];

        if ($this->nofollow) {
            $rels[] = 'nofollow';
        }

        if ($this->sponsored) {
            $rels[] = 'sponsored';
        }

        return implode(' ', array_unique($rels));
    }

    public function getTargetAttribute(): string
    {
        return $this->open_in_new_tab ? '_blank' : '_self';
    }

    public function getEffectiveButtonTextAttribute(): string
    {
        return $this->button_text
            ?: $this->label
                ?: $this->brandPartner?->cta_label
                    ?: 'Learn More';
    }
}
