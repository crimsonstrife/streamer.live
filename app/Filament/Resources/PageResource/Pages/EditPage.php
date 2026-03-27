<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use App\Filament\Traits\EnsuresDraftContext;
use Indra\RevisorFilament\Filament\EditRecord;

class EditPage extends EditRecord
{
    use EnsuresDraftContext;

    protected static string $resource = PageResource::class;
}
