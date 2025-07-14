<?php

namespace App\Http\Controllers;

use App\Filament\Fabricator\PageBlocks\ScheduleCalendarBlock;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        // Figure out which month/year to show (from ?scheduleMonth, ?scheduleYear or fallback to now)
        $month = (int) $request->query('scheduleMonth', now()->month);
        $year  = (int) $request->query('scheduleYear',  now()->year);

        // Get all the computed calendar data
        $calendarData = ScheduleCalendarBlock::mutateData([
            'month' => $month,
            'year'  => $year,
        ]);

        // Compute “prev” and “next” month links
        $prev = Carbon::create($year, $month, 1)->subMonth();
        $next = Carbon::create($year, $month, 1)->addMonth();

        // Pass everything to the view
        return view('events.index', array_merge($calendarData, [
            'prev' => $prev,
            'next' => $next,
        ]));
    }

    public function show(Event $event)
    {
        return view('events.show', compact('event'));
    }
}
