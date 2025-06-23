<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Storage;

class CreateMedia extends CreateRecord
{
    protected static string $resource = MediaResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        // pull out the temp file:
        $path = Storage::disk('public')->path($data['file']);

        // create the media via Spatie:
        $media = $this->recordInstance
            ->addMedia($path)
            ->usingFileName(basename($path))
            ->preservingOriginal()
            ->toMediaCollection($data['collection_name']);

        // stamp metadata:
        foreach ($data['custom_properties'] ?? [] as $key => $value) {
            $media->setCustomProperty($key, $value);
        }
        $media->save();

        return $media;
    }
}
