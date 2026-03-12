<?php

namespace App\Filament\Resources\StreamSocialAccountResource\Pages;

use App\Enums\StreamSocialPlatform;
use App\Filament\Resources\StreamSocialAccountResource;
use Filament\Actions;
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

    protected function getHeaderActions(): array
    {
        $record = $this->record;

        $platform = $record->platform?->value ?? (string) $record->platform;
        $isX = $platform === StreamSocialPlatform::X->value;

        $hasToken = (bool)(
            ($record->credentials['access_token'] ?? null)
            || ($record->credentials['user_access_token'] ?? null) // legacy
        );

        return [
            Actions\Action::make('connect_x')
                ->label('Connect X')
                ->icon(StreamSocialPlatform::X->getIcon())
                ->visible(fn () => $isX)
                ->url(fn () => route('social.x.connect', ['account' => $record->getKey()])),

            Actions\Action::make('disconnect_x')
                ->label('Disconnect X')
                ->color('danger')
                ->visible(fn () => $isX && $hasToken)
                ->requiresConfirmation()
                ->action(function () use ($record) {
                    $creds = $record->credentials ?? [];
                    unset($creds['access_token'], $creds['refresh_token'], $creds['expires_at'], $creds['scope'], $creds['token_type'], $creds['user_access_token']);
                    $record->credentials = $creds;
                    $record->save();
                }),
        ];
    }
}
