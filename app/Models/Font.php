<?php

namespace App\Models;

use App\Traits\HasSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Font extends BaseModel implements HasMedia
{
    use InteractsWithMedia;
    use HasSlug;

    protected $fillable = ['slug','name','file_path','weight_min', 'weight_max','is_builtin'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('fonts')
            ->useDisk('public');
    }
}
