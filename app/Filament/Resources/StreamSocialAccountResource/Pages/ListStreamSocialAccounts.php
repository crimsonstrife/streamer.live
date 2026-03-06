<?php

namespace App\Filament\Resources\StreamSocialAccountResource\Pages;

use App\Filament\Resources\StreamSocialAccountResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStreamSocialAccounts extends ListRecords
{
    protected static string $resource = StreamSocialAccountResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
