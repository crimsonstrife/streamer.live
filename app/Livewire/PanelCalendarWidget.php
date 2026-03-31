<?php

namespace App\Livewire;

use App\Models\Event;
use Guava\Calendar\Widgets\CalendarWidget;
use Illuminate\Support\Collection;

class PanelCalendarWidget extends CalendarWidget
{
    protected static string $view = 'guava-calendar::widgets.calendar';

    public function getEvents(array $fetchInfo = []): Collection | array
    {
        $query = Event::query();

        if (! empty($fetchInfo['start']) && ! empty($fetchInfo['end'])) {
            $query->where('starts_at', '<', $fetchInfo['end'])
                  ->where('ends_at', '>', $fetchInfo['start']);
        }

        return $query->get();
    }
}
