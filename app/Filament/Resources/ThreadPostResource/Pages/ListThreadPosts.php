<?php

namespace App\Filament\Resources\ThreadPostResource\Pages;

use App\Filament\Resources\ThreadPostResource;
use Filament\Resources\Pages\ListRecords;

class ListThreadPosts extends ListRecords
{
    protected static string $resource = ThreadPostResource::class;
}
