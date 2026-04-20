<?php

namespace App\Models\SponsorObjects;

use App\Casts\MoneyValueCast;
use App\Models\BaseModel;
use App\Models\Media;
use App\Models\ValueObjects\MoneyValue;
use App\Traits\HasSlug;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Goal extends BaseModel implements HasMedia
{
    use HasSlug;
    use InteractsWithMedia;
    use IsPermissible;
    use SoftDeletes;

    protected $table = 'goals';

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'description',
        'target_amount',
        'currency',
        'starts_at',
        'ends_at',
        'published_at',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'target_amount' => MoneyValueCast::class,
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('banner')
            ->singleFile()
            ->useDisk(config('filesystems.upload_disk', 'public'));

        $this->addMediaCollection('gallery')
            ->useDisk(config('filesystems.upload_disk', 'public'));
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function succeededDonations(): HasMany
    {
        return $this->hasMany(Donation::class)->where('status', 'succeeded');
    }

    public function bannerMedia(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')
            ->where('model_type', self::class)
            ->where('collection_name', 'banner');
    }

    public function galleryMedia(): MorphMany
    {
        return $this->morphMany(Media::class, 'model')
            ->where('model_type', self::class)
            ->where('collection_name', 'gallery');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->published()
            ->where('status', 'active')
            ->where(function (Builder $q) {
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function (Builder $q) {
                $q->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            });
    }

    public function getRaisedAmountAttribute(): MoneyValue
    {
        $total = (float) $this->succeededDonations()->sum('amount');

        return new MoneyValue($total, $this->currency ?? 'USD');
    }

    public function getProgressPercentAttribute(): float
    {
        $target = $this->target_amount?->raw() ?? 0.0;

        if ($target <= 0) {
            return 0.0;
        }

        return min(100.0, ($this->raised_amount->raw() / $target) * 100);
    }

    public function getDonorCountAttribute(): int
    {
        return (int) $this->succeededDonations()->count();
    }

    public function getIsActiveAttribute(): bool
    {
        if ($this->status !== 'active') {
            return false;
        }

        if ($this->published_at === null || $this->published_at->isFuture()) {
            return false;
        }

        if ($this->starts_at !== null && $this->starts_at->isFuture()) {
            return false;
        }

        if ($this->ends_at !== null && $this->ends_at->isPast()) {
            return false;
        }

        return true;
    }

    public function getBannerUrlAttribute(): string
    {
        return $this->getFirstMediaUrl('banner');
    }
}
