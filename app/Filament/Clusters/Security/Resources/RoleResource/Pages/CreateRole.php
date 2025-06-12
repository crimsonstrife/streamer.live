<?php

namespace App\Filament\Clusters\Security\Resources\RoleResource\Pages;

use App\Filament\Clusters\Security\Resources\RoleResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;
}
