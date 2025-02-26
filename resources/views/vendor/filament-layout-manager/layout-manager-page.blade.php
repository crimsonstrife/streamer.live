<div>
    @if($this->shouldWrapInFilamentPage())
        <x-filament-panels::page>
            <livewire:layout-manager :settings="$settings ?? []"/>
        </x-filament-panels::page>
    @else
        <livewire:layout-manager :settings="$settings ?? []"/>
    @endif
</div>
