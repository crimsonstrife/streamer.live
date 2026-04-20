<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use App\Filament\Traits\CreatesDraftRecord;
use Z3d0X\FilamentFabricator\Resources\PageResource\Pages\CreatePage as BaseCreatePage;

class CreatePage extends BaseCreatePage
{
    use CreatesDraftRecord;

    protected static string $resource = PageResource::class;
}
