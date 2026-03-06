<?php

namespace App\Filament\Resources\StreamSocialAccountResource\Pages;

use App\Filament\Resources\StreamSocialAccountResource;
use Filament\Resources\Pages\EditRecord;

class EditStreamSocialAccount extends EditRecord
{
    protected static string $resource = StreamSocialAccountResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $existing = $this->record->credentials ?? [];
        $incoming = $data['credentials'] ?? [];

        // If platform changed, don’t merge old credentials across platforms.
        $oldPlatform = $this->record->platform?->value ?? (string) ($this->record->platform ?? '');
        $newPlatform = (string) ($data['platform'] ?? $oldPlatform);

        $data['credentials'] = ($newPlatform !== $oldPlatform)
            ? $incoming
            : array_merge($existing, $incoming);

        return $data;
    }
}
