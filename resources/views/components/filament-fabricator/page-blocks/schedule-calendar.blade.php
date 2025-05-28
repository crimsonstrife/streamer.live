@aware(['page'])
@php
    // 1) Determine current month/year from query or mutateData vars
    $reqMonth   = (int) request()->query('scheduleMonth', 0);
    $reqYear    = (int) request()->query('scheduleYear', 0);
    $month      = $reqMonth ?: ($month ?? now()->month);
    $year       = $reqYear  ?: ($year  ?? now()->year);

    // 2) Prev / Next month
    $prev    = \Carbon\Carbon::create($year, $month, 1)->subMonth();
    $next    = \Carbon\Carbon::create($year, $month, 1)->addMonth();
    $baseUrl = url()->current();

    // 3) Variables from mutateData()
    //    $monthName, $daysInMonth, $startWeekday (Mon=1…Sun=7), $eventsByDay

    // 4) Build the weeks array for the table
    $weeks   = [];
    $day     = 1;
    $current = 1 - ($startWeekday - 1);
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
<div class="monthly-schedule-block">
    {{-- Prev / Title / Next --}}
    <div class="d-flex justify-content-between align-items-center mb-3">
        <a href="{{ $baseUrl }}?scheduleMonth={{ $prev->month }}&scheduleYear={{ $prev->year }}" class="btn btn-outline-secondary">
            &larr; {{ $prev->format('F') }}
        </a>
        <h2 class="mb-0">{{ $monthName }}</h2>
        <a href="{{ $baseUrl }}?scheduleMonth={{ $next->month }}&scheduleYear={{ $next->year }}" class="btn btn-outline-secondary">
            {{ $next->format('F') }} &rarr;
        </a>
    </div>

    {{-- Calendar Table --}}
    <table class="table table-bordered text-center">
        <thead>
        <tr class="bg-light">
            <th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
        </tr>
        </thead>
        <tbody>
        @foreach($weeks as $week)
            <tr>
                @foreach($week as $cell)
                    @if($cell)
                        <td style="vertical-align: top; height:120px;">
                            <div class="fw-bold">{{ $cell['day'] }}</div>
                            @foreach($cell['cells'] as $evt)
                                <div class="small mt-1">
                                    <time datetime="{{ $evt['iso'] }}" class="event-time">
                                        {{ $evt['label'] }}
                                    </time><br>
                                    @if($evt['url'])
                                        <a href="{{ $evt['url'] }}" target="_blank">{{ $evt['title'] }}</a>
                                    @else
                                        {{ $evt['title'] }}
                                    @endif
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
