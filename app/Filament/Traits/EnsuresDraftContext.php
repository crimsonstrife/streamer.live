<?php

namespace App\Filament\Traits;

use Illuminate\Database\Eloquent\Model;

trait EnsuresDraftContext
{
    /**
     * After each Livewire re-hydration, Livewire's ModelSynth re-fetches the
     * #[Locked] $record using the default (Published) Revisor context, bypassing
     * any Draft context set during the initial mount. This hook fires after
     * Livewire re-hydrates all properties and swaps the record back into Draft
     * context before any action executes.
     */
    public function hydrate(): void
    {
        if ($this->record instanceof Model && $this->record->getKey() && ! $this->record->isDraftTableRecord()) {
            $this->record = ($this->record)::withDraftContext()->findOrFail($this->record->getKey());
        }
    }
}
