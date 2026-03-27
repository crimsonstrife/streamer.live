<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use Illuminate\Database\Eloquent\Model;
use Indra\RevisorFilament\Filament\ListVersions;

class ListPageVersions extends ListVersions
{
    protected static string $resource = PageResource::class;

    protected function resolveRecord(int | string $key): Model
    {
        return $this->getModel()::withDraftContext()->findOrFail($key);
    }

    public function hydrate(): void
    {
        if ($this->record instanceof Model && $this->record->getKey() && ! $this->record->isDraftTableRecord()) {
            $this->record = ($this->record)::withDraftContext()->findOrFail($this->record->getKey());
        }
    }
}
