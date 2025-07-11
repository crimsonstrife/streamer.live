@php
    $style = app(\App\Settings\LookFeelSettings::class);
    $display_mode = $style->mode;
@endphp

<nav class="{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }} navbar-expand-lg navbar-{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }} border-bottom">
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="{{ route('dashboard') }}">
            <x-application-mark class="w-auto h-9" />
        </a>

        <!-- Mobile Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
            <!-- Navigation Links -->
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <x-nav-link href="{{ route('dashboard') }}" :active="request()->routeIs('dashboard')" class="nav-link">
                        {{ __('Dashboard') }}
                    </x-nav-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
