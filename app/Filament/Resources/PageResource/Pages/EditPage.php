<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use Illuminate\Database\Eloquent\Model;
use Indra\RevisorFilament\Filament\EditRecord;

class EditPage extends EditRecord
{
    protected static string $resource = PageResource::class;

    public function hydrate(): void
    {
        if ($this->record instanceof Model && $this->record->getKey() && ! $this->record->isDraftTableRecord()) {
            $this->record = ($this->record)::withDraftContext()->findOrFail($this->record->getKey());
        }
    }
}
