<x-filament::widget>
    <x-filament::card class="space-y-4">
        <h2 class="grid flex-1 text-base font-semibold leading-6 text-gray-950 dark:text-white">
            Upcoming Streams
        </h2>
        @if ($streams->isEmpty())
            <div class="text-sm text-gray-500">No upcoming streams scheduled.</div>
        @else
            <ul class="divide-y divide-gray-200">
                @foreach ($streams as $stream)
                    @php
                        // your Event model casts starts_at to Carbon already
                        $start = $stream->starts_at->setTimezone(auth()->user()->timezone ?? config('app.timezone'));
                        $isSoon = $start->lte($soonThreshold);
                    @endphp

                    <li class="py-2 flex items-center justify-between">
                        {{-- Event title --}}
                        <span class="font-medium text-gray-800">
                            {{ $stream->title }}
                        </span>

                        <div class="flex items-center space-x-2">
                            {{-- Formatted start time --}}
                            <span class="text-sm text-gray-600">
                                {{ $start->format('M d, H:i') }}
                            </span>

                            @if ($isSoon)
                                <span class="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded">
                                    Starting Soon
                                </span>
                            @endif
                        </div>
                    </li>
                @endforeach
            </ul>
        @endif
    </x-filament::card>
</x-filament::widget>
