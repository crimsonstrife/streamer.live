<x-filament::page>
    <h2>Current Version: <strong>{{ $currentVersion }}</strong></h2>

    @if ($availableVersion)
        <div class="mt-4">
            <p>New Version Available:&nbsp;<strong>{{ $availableVersion }}</strong></p>
            <x-filament::button wire:click="runUpdate" wire:loading.attr="disabled" class="mt-2">
                Update Now
            </x-filament::button>
        </div>
    @else
        <p class="mt-4 text-sm text-gray-600">Your application is up to date.</p>
    @endif
    <x-filament::button wire:click="checkForUpdate" wire:loading.attr="disabled" class="mt-2">
        Check for Updates
    </x-filament::button>
</x-filament::page>
