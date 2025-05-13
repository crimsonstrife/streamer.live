<?php

namespace App\Filament\Resources\CommentResource\Pages;

use App\Filament\Resources\CommentResource;
use Filament\Resources\Pages\ViewRecord;

class ViewComment extends ViewRecord
{
    protected static string $resource = CommentResource::class;

    protected function getHeaderWidgets(): array
    {
        return [
            // put any widgets here
        ];
    }

    protected function getTabs(): array
    {
        return [
            ViewRecord::TAB_DETAILS => fn () => $this->form,
            'activity' => fn () => $this->getRelationManager('activities'),
        ];
    }
}
