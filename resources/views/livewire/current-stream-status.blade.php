<x-filament::widget>
    <x-filament::card class="space-y-4">
        {{-- Header --}}
        <h2 class="grid flex-1 text-base font-semibold leading-6 text-gray-950 dark:text-white">
            Current Twitch Stream Status
        </h2>
        @if (! $twitchEnabled)
            <div class="filament-alert filament-alert-warning">
                <strong>Warning:</strong> Twitch integration is disabled.
                Please enable it in
                <a href="{{ route('filament.admin.integrations.pages.twitch-settings') }}">
                    Twitch Settings
                </a>
                before using the Stream Status Bar.
            </div>
        @else
            @if ($isLive)
                {{-- Live with ping animation --}}
                <div class="flex items-center space-x-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-red-600"></span>
                    <span class="text-lg font-semibold">Live Now</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Game / Category
                    </span>
                        <div class="text-xl">{{ $game }}</div>
                    </div>
                    <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Viewers
                    </span>
                        <div class="text-xl">{{ $viewers }}</div>
                    </div>
                    <div class="col-span-2">
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Duration
                    </span>
                        <div>{{ $duration }}</div>
                    </div>
                </div>
            @else
                {{-- Offline state --}}
                <div class="flex items-center space-x-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-gray-400"></span>
                    <span class="text-lg font-semibold text-gray-600">Offline</span>
                </div>
            @endif
        @endif
    </x-filament::card>
</x-filament::widget>
