@php
    $record = \TomatoPHP\FilamentMenus\Models\MenuItem::find($getState());
@endphp

<div class="d-flex align-items-center gap-2">
    @if(!empty($record->icon))
        <x-icon :name="$record->icon" class="bi me-2"/>
    @endif

    <span>{{ $record->title[app()->getLocale()] }}</span>

    @if($record->has_badge)
        <span class="badge bg-{{ $record->badge_color }}">
            {{ $record->badge[app()->getLocale()] }}
        </span>
    @endif
</div>
