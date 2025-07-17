<x-filament-panels::page>
    @livewire(App\Http\Livewire\Profile\UpdateTeamNameForm::class, compact('team'))

    @livewire(App\Http\Livewire\Profile\TeamMemberManager::class, compact('team'))

    @if (Gate::check('delete', $team) && ! $team->personal_team)
        <x-section-border/>

        @livewire(App\Http\Livewire\Profile\DeleteTeamForm::class, compact('team'))
    @endif
</x-filament-panels::page>
