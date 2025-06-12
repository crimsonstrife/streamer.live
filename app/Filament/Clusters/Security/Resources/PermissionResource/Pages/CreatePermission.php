<?php

namespace App\Filament\Clusters\Security\Resources\PermissionResource\Pages;

use App\Filament\Clusters\Security\Resources\PermissionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePermission extends CreateRecord
{
    protected static string $resource = PermissionResource::class;
}
