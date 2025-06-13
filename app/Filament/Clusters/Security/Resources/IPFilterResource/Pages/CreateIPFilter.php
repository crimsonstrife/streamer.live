<?php

namespace App\Filament\Clusters\Security\Resources\IPFilterResource\Pages;

use App\Filament\Clusters\Security\Resources\IPFilterResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateIPFilter extends CreateRecord
{
    protected static string $resource = IPFilterResource::class;
}
