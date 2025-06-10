<?php

namespace App\Filament\Clusters\Security\Resources\PermissionSetResource\Pages;

use App\Filament\Clusters\Security\Resources\PermissionSetResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePermissionSet extends CreateRecord
{
    protected static string $resource = PermissionSetResource::class;
}
