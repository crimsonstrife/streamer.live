<?php

namespace App\Livewire;

use Filament\Widgets\Widget;
use Guava\Calendar\Widgets\CalendarWidget as BaseCalendarWidget;

class CalendarWidget extends BaseCalendarWidget
{
    protected static string $view = 'livewire.calendar-widget';
}
