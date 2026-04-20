<?php

namespace App\Filament\Traits;

use Filament\Facades\Filament;
use Illuminate\Database\Eloquent\Model;
use Indra\Revisor\Enums\RevisorContext;

trait CreatesDraftRecord
{
    protected function handleRecordCreation(array $data): Model
    {
        $model = $this->getModel();
        $record = (new $model)->setRevisorContext(RevisorContext::Draft);
        $record->fill($data);

        if (
            static::getResource()::isScopedToTenant() &&
            ($tenant = Filament::getTenant())
        ) {
            return $this->associateRecordWithTenant($record, $tenant);
        }

        $record->save();

        return $record;
    }
}
