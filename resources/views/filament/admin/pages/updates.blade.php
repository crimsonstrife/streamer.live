@php use Carbon\Carbon; @endphp
<x-filament::page>
    <h2>Current Version: <strong>{{ $currentVersion }}</strong></h2>

    @if ($availableVersion)
        <p class="mt-2 text-green-600">Latest Available: <strong>{{ $availableVersion }}</strong></p>
    @endif

    <x-filament::button wire:click="loadReleases" class="my-4">
        Reload Releases
    </x-filament::button>

    <div wire:poll.5s="refreshUpdateStatus" class="mb-6">
        @if ($updateState !== 'idle')
            <x-filament::section>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Update Status</span>
                        <x-filament::badge
                            :color="match ($updateState) {
                                'queued' => 'warning',
                                'running' => 'info',
                                'succeeded' => 'success',
                                'failed' => 'danger',
                                default => 'gray',
                            }"
                        >
                            {{ ucfirst($updateState) }}
                        </x-filament::badge>
                    </div>

                    @if ($updateStatusVersion)
                        <p class="text-sm text-gray-700">
                            Version: <strong>{{ $updateStatusVersion }}</strong>
                        </p>
                    @endif

                    @if ($updateStatusMessage)
                        <p class="text-sm text-gray-700">{{ $updateStatusMessage }}</p>
                    @endif

                    @if ($updateStatusUpdatedAt)
                        <p class="text-xs text-gray-500">
                            Last updated {{ Carbon::parse($updateStatusUpdatedAt)->diffForHumans() }}
                        </p>
                    @endif
                </div>
            </x-filament::section>
        @endif
    </div>

    @if (!empty($releases))
        <div class="grid gap-6 mt-6">
            @foreach ($releases as $release)
                <div
                    class="p-4 border rounded-md shadow-sm @if($release['tag_name'] === $currentVersion) bg-green-50 @endif">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-bold">{{ $release['name'] ?? $release['tag_name'] }}</h3>
                            <p class="text-sm text-gray-500">Released
                                on {{ Carbon::parse($release['published_at'])->toFormattedDateString() }}</p>
                        </div>
                        <x-filament::button
                            wire:click="runSelectedUpdate('{{ $release['tag_name'] }}')"
                            :disabled="$release['tag_name'] === $currentVersion"
                        >
                            @if ($release['tag_name'] === $currentVersion)
                                Installed
                            @else
                                Update to {{ $release['tag_name'] }}
                            @endif
                        </x-filament::button>
                    </div>

                    @if (!empty($release['body']))
                        <div class="mt-2 text-sm whitespace-pre-wrap text-gray-700">
                            {!! nl2br(e($release['body'])) !!}
                        </div>
                    @endif
                </div>
            @endforeach
        </div>
    @else
        <p class="text-sm text-gray-600">No releases found or failed to fetch.</p>
    @endif
</x-filament::page>
