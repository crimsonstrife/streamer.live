<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">Events Calendar</h2>
    </x-slot>
    <style>
        .monthly-schedule-block table {
            table-layout: fixed;
            width: 100%;
        }
        .monthly-schedule-block th,
        .monthly-schedule-block td {
            width: 14.2857%;    /* exactly 100% ÷ 7 columns */
            vertical-align: top;
            word-wrap: break-word;  /* wrap long titles */
            overflow-wrap: break-word;
        }
    </style>
    <div class="container py-5 monthly-schedule-block">
        {{-- Prev / Month Title / Next --}}
        <div class="d-flex justify-content-between align-items-center mb-3">
            <a href="{{ url()->current() }}?scheduleMonth={{ $prev->month }}&scheduleYear={{ $prev->year }}"
               class="btn btn-outline-secondary">
                &larr; {{ $prev->format('F') }}
            </a>

            <h5 class="mb-0">{{ $monthName }}</h5>

            <a href="{{ url()->current() }}?scheduleMonth={{ $next->month }}&scheduleYear={{ $next->year }}"
               class="btn btn-outline-secondary">
                {{ $next->format('F') }} &rarr;
            </a>
        </div>

        @php
            // Build the weeks array exactly like the Fabricator block does:
            $weeks   = [];
            $day     = 1;
            // startWeekday is Mon=1 - Sun=7
            $current = 1 - ($startWeekday - 7);

            while ($day <= $daysInMonth) {
              $week = [];
              for ($dow = 1; $dow <= 7; $dow++, $current++) {
                if ($current >= 1 && $current <= $daysInMonth) {
                  $cells = $eventsByDay[$current] ?? [];
                  $week[] = ['day' => $current, 'cells' => $cells];
                  $day = max($day, $current + 1);
                } else {
                  $week[] = null;
                }
              }
              $weeks[] = $week;
            }
        @endphp

        {{-- Calendar Table --}}
        <table class="table table-bordered text-center">
            <thead>
            <tr class="bg-light">
                <th>Sun</th>
                <th>Mon</th><th>Tue</th><th>Wed</th>
                <th>Thu</th><th>Fri</th><th>Sat</th>
            </tr>
            </thead>
            <tbody>
            @foreach($weeks as $week)
                <tr>
                    @foreach($week as $cell)
                        @if($cell)
                            @php
                                // Build a Carbon date for this cell’s day
                                $cellDate = \Carbon\Carbon::create($year, $month, $cell['day']);
                                $isToday  = $cellDate->isToday();
                            @endphp

                            <td @class(['table-info' => $isToday]) style="vertical-align: top; height:120px;">
                                <div class="fw-bold">
                                    {{ $cell['day'] }}
                                    @if($isToday)
                                        <small class="text-danger">(Today)</small>
                                    @endif
                                </div>
                                @foreach($cell['cells'] as $evt)
                                    @php
                                        // parse the ISO string into a Carbon instance
                                        $evtTime = \Carbon\Carbon::parse($evt['iso']);
                                        $isFuture = $evtTime->isFuture();
                                    @endphp
                                    <div class="small mt-1">
                                        <time datetime="{{ $evt['iso'] }}" class="event-time">
                                            {{ $evt['label'] }}
                                        </time>
                                        <br>
                                        <a href="{{ route('events.show', $evt['id'] ?? '#') }}">
                                            <time datetime="{{ $evt['iso'] }}" class="event-time">{{ $evt['label'] }}</time>
                                            {{ $evt['title'] }}
                                        </a>
                                        <span class="badge bg-{{ $isFuture ? 'success' : 'secondary' }}">
                                            {{ $isFuture ? 'Upcoming' : 'Past' }}
                                        </span>
                                    </div>
                                @endforeach
                            </td>
                        @else
                            <td></td>
                        @endif
                    @endforeach
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    {{-- re-localize the time display --}}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('time.event-time').forEach(el => {
                const iso = el.getAttribute('datetime');
                if (!iso) return;
                el.textContent = new Date(iso).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            });
        });
    </script>
</x-app-layout>
