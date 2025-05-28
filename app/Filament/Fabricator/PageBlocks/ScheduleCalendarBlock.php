<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Event;
use Carbon\Carbon;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class ScheduleCalendarBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        // Build month options 1→12 => January…December
        $months = [];
        for ($m = 1; $m <= 12; $m++) {
            $months[$m] = Carbon::create()->month($m)->format('F');
        }

        return Block::make('schedule-calendar')
            ->schema([
                TextInput::make('title')
                    ->label('Heading')
                    ->default('Monthly Calendar'),
                Select::make('month')
                    ->label('Month')
                    ->options($months)
                    ->default(now()->month),
                TextInput::make('year')
                    ->label('Year')
                    ->numeric()
                    ->default(now()->year),
            ]);
    }

    public static function mutateData(array $data): array
    {
        //  Determine which month/year to show: first look at ?scheduleMonth=&scheduleYear= in the URL,
        //    otherwise fall back to the block settings, then to today.
        $reqMonth = (int) request()->query('scheduleMonth', 0);
        $reqYear  = (int) request()->query('scheduleYear', 0);

        $month = $reqMonth ?: ((int) ($data['month'] ?? now()->month));
        $year  = $reqYear ?: ((int) ($data['year']  ?? now()->year));

        // build first/last day
        $start         = Carbon::create($year, $month, 1)->startOfDay();
        $daysInMonth   = $start->daysInMonth;
        $startWeekday  = $start->dayOfWeekIso; // Mon=1…Sun=7

        // fetch all events in that month
        $rawEvents = Event::query()
            ->whereBetween('starts_at', [$start, $start->copy()->endOfMonth()])
            ->orderBy('starts_at')
            ->get();

        // map into a simple array and group by day of month
        $grouped = $rawEvents
            ->map(fn ($e) => [
                'day'   => $e->starts_at->day,
                'iso'   => $e->starts_at->toIso8601String(),
                'label' => $e->starts_at->format('g:ia'),  // time only
                'title' => $e->title,
                'url'   => $e->url ?? null,
            ])
            ->groupBy('day')  // collection keyed by day number
            ->toArray();

        $data['title']         = $data['title']     ?? 'Monthly Calendar';
        $data['monthName']     = $start->format('F Y');
        $data['daysInMonth']   = $daysInMonth;
        $data['startWeekday']  = $startWeekday;
        $data['eventsByDay']   = $grouped;

        return $data;
    }
}
