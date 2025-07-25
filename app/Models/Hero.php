<?php

namespace App\Models;

use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Hero extends Model implements HasMedia
{
    use HasFactory;
    use IsPermissible;
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'subtitle',
        'background_image',
        'primary_cta_text',
        'primary_cta_url',
        'secondary_cta_text',
        'secondary_cta_url',
        'sort_order',
        'is_active',
        'full_width',
        'show_socials',
    ];

    protected $table = 'hero_banners';

    protected $appends = [
        'background_image_url',
    ];

    public function getBackgroundImageURLAttribute(): object|string
    {
        return url($this->background_image);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useDisk('public')
            ->singleFile();
    }

    public function heroMedia(): MorphMany
    {
        return $this
            ->media() // the base Spatie morphMany
            ->where('model_type', 'App\Models\Hero') // only “heroes” files
            ->where('collection_name', 'images');
    }
}
