<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CustomMediaPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        // Use model type + model id + collection
        $modelType = class_basename($media->model_type);
        $modelId = $media->model_id;
        $collection = $media->collection_name;

        if (empty($modelType)) {
            Log::error("Media model type is missing for media ID {$media->id}.");
            throw new \InvalidArgumentException("Media model type is missing for media ID {$media->id}.");
        }

        if (empty($modelId)) {
            Log::error("Media model ID is missing for media ID {$media->id}.");
            throw new \InvalidArgumentException("Media model ID is missing for media ID {$media->id}.");
        }

        if (empty($collection)) {
            Log::error("Media collection name is missing for media ID {$media->id}.");
            throw new \InvalidArgumentException("Media collection name is missing for media ID {$media->id}.");
        }

        if ($modelType === null) {
            Log::error("Media model type is null for media ID {$media->id}.");
            return '';
        }

        if ($collection === null) {
            Log::error("Media collection name is null for media ID {$media->id}.");
            return '';
        }

        return strtolower("{$modelType}/{$modelId}/{$collection}/");
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive/';
    }
}
