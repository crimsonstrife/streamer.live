<?php

namespace App\Models;

use App\Services\CustomMediaPathGenerator;

class Media extends \Spatie\MediaLibrary\MediaCollections\Models\Media
{
    protected static function booted(): void
    {
    }

    public function getUrlAttribute(): string
    {
        return $this->getMediaUrl();
    }

    public function getMediaUrl(): string
    {
        return url(app(CustomMediaPathGenerator::class)->getPath($this).$this->file_name);
    }
}
