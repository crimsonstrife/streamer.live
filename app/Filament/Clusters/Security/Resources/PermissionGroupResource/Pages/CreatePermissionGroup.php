<?php

namespace App\Filament\Clusters\Security\Resources\PermissionGroupResource\Pages;

use App\Filament\Clusters\Security\Resources\PermissionGroupResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePermissionGroup extends CreateRecord
{
    protected static string $resource = PermissionGroupResource::class;
}
