<?php

namespace App\Filament\Clusters\Appearance\Resources\EmoteResource\Pages;

use App\Filament\Clusters\Appearance\Resources\EmoteResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateEmote extends CreateRecord
{
    protected static string $resource = EmoteResource::class;
}
