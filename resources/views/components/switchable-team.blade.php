@props(['team', 'component' => 'dropdown-item'])

<form method="POST" action="{{ route('current-team.update') }}" x-data class="d-inline">
    @method('PUT')
    @csrf

    <!-- Hidden Team ID -->
    <input type="hidden" name="team_id" value="{{ $team->id }}">

    <x-dynamic-component :component="$component" href="#" x-on:click.prevent="$root.submit();" class="d-flex align-items-center">
        @if (Auth::user()->isCurrentTeam($team))
            <i class="bi bi-check-circle text-success me-2"></i>
        @endif
        <span class="text-truncate">{{ $team->name }}</span>
    </x-dynamic-component>
</form>