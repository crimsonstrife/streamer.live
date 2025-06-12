<?php

namespace App\Filament\Resources\ShortUrlResource\Pages;

use App\Filament\Resources\ShortUrlResource;
use Filament\Actions\Action;
use Filament\Pages\Concerns\ExposesTableToWidgets;
use Filament\Resources\Pages\ListRecords;

class ListShortUrls extends ListRecords
{
    use ExposesTableToWidgets;

    protected static string $resource = ShortUrlResource::class;
    protected static ?string $title = "Short URLs";

    protected function getHeaderActions(): array
    {
        return [
            Action::make('create')
                ->label('New ShortURL')
                ->url(CreateShortUrl::getUrl()),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return ShortUrlResource::getWidgets();
    }
}
