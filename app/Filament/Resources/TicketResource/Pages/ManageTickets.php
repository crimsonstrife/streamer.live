<?php

namespace App\Filament\Resources\TicketResource\Pages;

use App\Filament\Resources\TicketResource;
use Filament\Resources\Pages\ListRecords;

class ManageTickets extends ListRecords
{
    protected static string $resource = TicketResource::class;
}
