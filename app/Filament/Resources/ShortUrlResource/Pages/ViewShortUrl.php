<?php

namespace App\Filament\Resources\ShortUrlResource\Pages;

use App\Filament\Resources\ShortUrlResource;
use AshAllenDesign\ShortURL\Models\ShortURL;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Contracts\Support\Htmlable;

class ViewShortUrl extends ViewRecord
{
    protected static string $resource = ShortUrlResource::class;

    public function getTitle(): string | Htmlable
    {
        /* @var ShortURL $record */
        $record = $this->getRecord();

        return $record->default_short_url ?? 'Unknown';
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            Action::make('create')
                ->label('New')
                ->url(CreateShortUrl::getUrl()),
        ];
    }
}

