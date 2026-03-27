<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;
use Indra\RevisorFilament\Filament\ListVersions;

class ListProductVersions extends ListVersions
{
    protected static string $resource = ProductResource::class;

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
