<?php

namespace App\Models;

use App\Services\CustomMediaPathGenerator;
use Illuminate\Support\Facades\Storage;

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
        $path = app(CustomMediaPathGenerator::class)->getPath($this).$this->file_name;

        if (config("filesystems.disks.{$this->disk}.driver") === 's3') {
            return Storage::disk($this->disk)->url($path);
        }

        return url($path);
    }
}
