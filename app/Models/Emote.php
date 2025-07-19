<?php

namespace App\Models;

use Illuminate\Cache\TaggableStore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Emote extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['code', 'keywords', 'image_path'];

    protected static function booted(): void
    {
        static::created(fn () => self::flushEmoteCache());
        static::updated(fn () => self::flushEmoteCache());
        static::deleted(fn () => self::flushEmoteCache());
    }

    public static function flushEmoteCache(): void
    {
        if (Cache::getStore() instanceof TaggableStore) {
            Cache::tags(['emotes'])->flush();
        } else {
            Cache::forget('emotes:all');
            // Optionally forget known common searches if stored individually
            foreach (['lol', 'cry', 'hype'] as $term) {
                Cache::forget('emotes:search:'.md5($term));
            }
        }
    }

    // Optional: if you want keywords as an array
    public function getKeywordsAttribute($value): array
    {
        return $value ? explode(',', $value) : [];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('emotes')
            ->useDisk('public');
    }
}
