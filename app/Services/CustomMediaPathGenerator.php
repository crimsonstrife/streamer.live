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
