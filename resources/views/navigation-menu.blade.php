<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="{{ route('dashboard') }}">
            <x-application-mark class="h-9 w-auto" />
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

            <ul class="navbar-nav ms-auto">
                <!-- Teams Dropdown -->
                @if (Laravel\Jetstream\Jetstream::hasTeamFeatures())
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" id="teamDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ Auth::user()->currentTeam->name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="teamDropdown">
                            <li><span class="dropdown-item-text text-muted">{{ __('Manage Team') }}</span></li>
                            <li><a class="dropdown-item" href="{{ route('teams.show', Auth::user()->currentTeam->id) }}">{{ __('Team Settings') }}</a></li>

                            @can('create', Laravel\Jetstream\Jetstream::newTeamModel())
                                <li><a class="dropdown-item" href="{{ route('teams.create') }}">{{ __('Create New Team') }}</a></li>
                            @endcan

                            @if (Auth::user()->allTeams()->count() > 1)
                                <li><hr class="dropdown-divider"></li>
                                <li><span class="dropdown-item-text text-muted">{{ __('Switch Teams') }}</span></li>
                                @foreach (Auth::user()->allTeams() as $team)
                                    <li><x-switchable-team :team="$team" class="dropdown-item" /></li>
                                @endforeach
                            @endif
                        </ul>
                    </li>
                @endif

                <!-- Settings Dropdown -->
                <li class="nav-item dropdown">
                    @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img class="rounded-circle me-2" src="{{ Auth::user()->profile_photo_url }}" alt="{{ Auth::user()->name }}" width="32" height="32">
                        </a>
                    @else
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ Auth::user()->name }}
                        </a>
                    @endif

                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><span class="dropdown-item-text text-muted">{{ __('Manage Account') }}</span></li>
                        <li><a class="dropdown-item" href="{{ route('profile.show') }}">{{ __('Profile') }}</a></li>

                        @if (Laravel\Jetstream\Jetstream::hasApiFeatures())
                            <li><a class="dropdown-item" href="{{ route('api-tokens.index') }}">{{ __('API Tokens') }}</a></li>
                        @endif

                        <li><hr class="dropdown-divider"></li>

                        <!-- Logout -->
                        <li>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="dropdown-item">{{ __('Log Out') }}</button>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
