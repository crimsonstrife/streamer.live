<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use App\Filament\Traits\EnsuresDraftContext;
use Indra\RevisorFilament\Filament\ListVersions;

class ListPostVersions extends ListVersions
{
    use EnsuresDraftContext;

    protected static string $resource = PostResource::class;
}
