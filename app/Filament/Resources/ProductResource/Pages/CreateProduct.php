<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Filament\Traits\CreatesDraftRecord;
use Filament\Resources\Pages\CreateRecord;

class CreateProduct extends CreateRecord
{
    use CreatesDraftRecord;

    protected static string $resource = ProductResource::class;
}
