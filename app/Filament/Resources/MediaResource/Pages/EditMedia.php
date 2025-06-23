<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditMedia extends EditRecord
{
    protected static string $resource = MediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function handleRecordUpdate(\Illuminate\Database\Eloquent\Model $record, array $data): \Illuminate\Database\Eloquent\Model
    {
        // update metadata:
        $record->forceFill([
            'custom_properties' => $data['custom_properties'] ?? [],
        ])->save();

        if (! empty($data['file'])) {
            $path = Storage::disk('public')->path($data['file']);
            // remove old file:
            $record->clearMediaCollection($record->collection_name);
            // add new one:
            $new = $record
                ->addMedia($path)
                ->usingFileName(basename($path))
                ->preservingOriginal()
                ->toMediaCollection($record->collection_name);
            $new->custom_properties = $record->custom_properties;
            $new->save();
            return $new;
        }

        return $record;
    }
}
