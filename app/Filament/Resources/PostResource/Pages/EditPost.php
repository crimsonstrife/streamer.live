<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Illuminate\Database\Eloquent\Model;
use Indra\RevisorFilament\Filament\EditRecord;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    public function hydrate(): void
    {
        if ($this->record instanceof Model && $this->record->getKey() && ! $this->record->isDraftTableRecord()) {
            $this->record = ($this->record)::withDraftContext()->findOrFail($this->record->getKey());
        }
    }
}
