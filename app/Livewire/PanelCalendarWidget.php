<?php

namespace App\Livewire;

use App\Models\Event;
use \Guava\Calendar\Widgets\CalendarWidget;
use Guava\Calendar\ValueObjects\CalendarEvent;
use Illuminate\Database\Eloquent\Collection;

class PanelCalendarWidget extends CalendarWidget
{
    protected static string $view = 'livewire.panel-calendar-widget';
}
