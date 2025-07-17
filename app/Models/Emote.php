<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Emote extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['code', 'keywords', 'image_path'];

    // Optional: if you want keywords as an array
    public function getKeywordsAttribute($value)
    {
        return $value ? explode(',', $value) : [];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('emotes')
            ->useDisk('public');
    }
}
