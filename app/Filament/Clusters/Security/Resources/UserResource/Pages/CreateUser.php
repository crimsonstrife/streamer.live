<?php

namespace App\Filament\Clusters\Security\Resources\UserResource\Pages;

use App\Filament\Clusters\Security\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
}
