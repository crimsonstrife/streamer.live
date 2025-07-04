<?php

namespace App\Models;

use App\Services\CustomMediaPathGenerator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use Spatie\MediaLibrary\MediaCollections\FileAdderFactory;

class Media extends \Spatie\MediaLibrary\MediaCollections\Models\Media
{
    protected static function booted(): void
    {
        static::addGlobalScope('folder', function (Builder $query) {
            $folder = Folder::find(session()->get('folder_id'));
            if ($folder) {
                if (!$folder->model_type) {
                    $query->where('collection_name', $folder->collection);
                } else {
                    $query
                        ->where('model_type', $folder->model_type)
                        ->where('model_id', $folder->model_id)
                        ->where('collection_name', $folder->collection);
                }
            }
        });
    }

    public function getUrlAttribute(): string
    {
        return $this->getMediaUrl();
    }

    public function getMediaUrl(): string
    {
        return url(app(CustomMediaPathGenerator::class)->getPath($this) . $this->file_name);
    }
}
