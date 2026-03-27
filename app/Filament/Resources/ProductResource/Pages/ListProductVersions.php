<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Filament\Traits\EnsuresDraftContext;
use Indra\RevisorFilament\Filament\ListVersions;

class ListProductVersions extends ListVersions
{
    use EnsuresDraftContext;

    protected static string $resource = ProductResource::class;
}
