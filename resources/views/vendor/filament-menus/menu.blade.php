@php
    use TomatoPHP\FilamentMenus\Models\Menu;

    // the component passes you $menu (the slug) already:
    $menuModel = Menu::where('key', $menu)->first();
    $location  = optional($menuModel)->location;
@endphp
@if($location === 'footer')
    <nav class="py-2 bg-body-tertiary">
@else
            <nav class="py-2 bg-body-tertiary border-bottom">
@endif
    <div class="container d-flex flex-wrap">
        @if($location === 'footer')
            {{-- footer: vertical, columnar links --}}
            <ul class="nav flex-column">
                @else
                    {{-- header (and any other location): standard horizontal nav --}}
                    <ul class="nav me-auto">
                        @endif
            @foreach ($menuItems as $item)
                @php
                    $isActive = url()->current() === ($item['route'] ? route($item['route']) : $item['url']);
                    $link = $item['route'] ? route($item['route']) : $item['url'];
                @endphp

                <li class="nav-item">
                    <a
                        href="{{ $link }}"
                        class="nav-link d-flex align-items-center justify-content-between @if($isActive) active fw-bold text-primary @endif"
                        @if($item['new_tab']) target="_blank" @endif
                        x-on:click="window.matchMedia(`(max-width: 1024px)`).matches && $store.sidebar?.close()"
                    >
                <span class="d-flex align-items-center gap-2">
                    @if(!empty($item['icon']))
                        <x-icon
                            name="{{ $item['icon'] }}"
                            class="bi me-2 {{ $isActive ? 'text-primary' : 'text-secondary' }}"
                        />
                    @endif

                    {{ $item['title'][app()->getLocale()] }}
                </span>

                        @if($item['has_badge'])
                            <span class="badge bg-{{ $item['badge_color'] }}">
                        {{ $item['badge'][app()->getLocale()] }}
                    </span>
                        @endif
                    </a>
                </li>
            @endforeach
        </ul>
                    @if($location !== 'footer')
                        <ul class="nav">
                            @auth
                                <!-- Teams Dropdown -->
                                @if (Laravel\Jetstream\Jetstream::hasTeamFeatures())
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" id="teamDropdown"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ Auth::user()->currentTeam->name }}
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="teamDropdown">
                                            <li><span class="dropdown-item-text text-muted">{{ __('Manage Team') }}</span></li>
                                            <li><a class="dropdown-item"
                                                   href="{{ route('teams.show', Auth::user()->currentTeam->id) }}">{{ __('Team Settings') }}</a>
                                            </li>

                                            @can('create', Laravel\Jetstream\Jetstream::newTeamModel())
                                                <li><a class="dropdown-item"
                                                       href="{{ route('teams.create') }}">{{ __('Create New Team') }}</a></li>
                                            @endcan

                                            @if (Auth::user()->allTeams()->count() > 1)
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><span class="dropdown-item-text text-muted">{{ __('Switch Teams') }}</span></li>
                                                @foreach (Auth::user()->allTeams() as $team)
                                                    <li>
                                                        <x-switchable-team :team="$team" class="dropdown-item"/>
                                                    </li>
                                                @endforeach
                                            @endif
                                        </ul>
                                    </li>
                                @endif

                                <!-- Settings Dropdown -->
                                <li class="nav-item dropdown">
                                    @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown"
                                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img class="rounded-circle me-2" src="{{ Auth::user()->profile_photo_url }}"
                                                 alt="{{ Auth::user()->name }}" width="32" height="32">
                                        </a>
                                    @else
                                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {{ Auth::user()->name }}
                                        </a>
                                    @endif

                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li><span class="dropdown-item-text text-muted">{{ __('Manage Account') }}</span></li>
                                        <li><a class="dropdown-item" href="{{ route('profile.show') }}">{{ __('Profile') }}</a></li>

                                        @if (Laravel\Jetstream\Jetstream::hasApiFeatures())
                                            <li><a class="dropdown-item"
                                                   href="{{ route('api-tokens.index') }}">{{ __('API Tokens') }}</a></li>
                                        @endif

                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>

                                        <!-- Logout -->
                                        <li>
                                            <form method="POST" action="{{ route('logout') }}">
                                                @csrf
                                                <button type="submit" class="dropdown-item">{{ __('Log Out') }}</button>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            @else
                                <!-- Guest Navigation -->
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                                @if (Route::has('register'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                    </li>
                                @endif
                            @endauth
                        </ul>
                    @endif
    </div>
</nav>
