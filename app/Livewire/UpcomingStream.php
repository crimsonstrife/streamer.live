<?php

namespace App\Livewire;

use App\Models\Event;
use Carbon\Carbon;
use Filament\Widgets\Widget;

class UpcomingStream extends Widget
{
    protected static string $view = 'livewire.upcoming-stream';

    protected static ?string $heading = 'Upcoming Streams';

    protected function getViewData(): array
    {
        $now = Carbon::now();
        $soon = $now->copy()->addMinutes(15);

        $events = Event::query()
            ->where('starts_at', '>=', $now)
            ->orderBy('starts_at')
            ->limit(2)
            ->get();

        return [
            // we still call them streams for context, but they're your Event models
            'streams' => $events,
            'soonThreshold' => $soon,
        ];
    }
}
