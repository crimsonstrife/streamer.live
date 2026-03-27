<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use App\Filament\Traits\EnsuresDraftContext;
use Indra\RevisorFilament\Filament\ListVersions;

class ListPageVersions extends ListVersions
{
    use EnsuresDraftContext;

    protected static string $resource = PageResource::class;
}
