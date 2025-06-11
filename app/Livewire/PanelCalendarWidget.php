<?php

namespace App\Livewire;

use App\Models\Event;
use Guava\Calendar\Widgets\CalendarWidget;
use Guava\Calendar\ValueObjects\CalendarEvent;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class PanelCalendarWidget extends CalendarWidget
{
    protected static string $view = 'guava-calendar::widgets.calendar';

    //protected string $calendarView = 'resourceTimeGridWeek';

    public function getEvents(array $fetchInfo = []): Collection | array
    {
        $calendarEvents = Event::all()
            ->map(fn ($event) => $event->toCalendarEvent())->toArray();

        Log::debug('Events Array: ' . print_r($calendarEvents, true));

        return $calendarEvents;
    }
}
