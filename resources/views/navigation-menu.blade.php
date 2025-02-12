<nav class="bg-white navbar navbar-expand-lg navbar-light border-bottom">
    <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-block h-100" style="max-height: 50px; width: 50px;" href="{{ route('dashboard') }}">
            <x-application-mark class="d-block" style="max-height: 50px; width: 50px;" />
        </a>

        <!-- Mobile Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Items (Now Always Visible on Desktop) -->
        <div class="collapse navbar-collapse show" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">
                        {{ __('Home') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('blog') ? 'active' : '' }}" href="{{ route('blog') }}">
                        {{ ucfirst(config('cms.posts_page_slug', 'Blog')) }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}" href="{{ route('dashboard') }}">
                        {{ __('Dashboard') }}
                    </a>
                </li>
            </ul>

            <!-- Authentication Links -->
            <ul class="navbar-nav ms-auto">
                @if (Auth::check())
                    <!-- User Dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                                <img class="rounded-circle" src="{{ Auth::user()->profile_photo_url }}" width="30"
                                    height="30" alt="{{ Auth::user()->username }}">
                            @else
                                {{ Auth::user()->username }}
                            @endif
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                                <h6 class="dropdown-header">{{ __('Manage Account') }}</h6>
                            </li>
                            <li>
                                <a class="dropdown-item" href="{{ route('profile.show') }}">{{ __('Profile') }}</a>
                            </li>

                            @if (Laravel\Jetstream\Jetstream::hasApiFeatures())
                                <li>
                                    <a class="dropdown-item" href="{{ route('api-tokens.index') }}">{{ __('API Tokens') }}</a>
                                </li>
                            @endif

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li>
                                <!-- Logout -->
                                <form method="POST" action="{{ route('logout') }}" x-data>
                                    @csrf
                                    <button class="dropdown-item" type="submit">{{ __('Log Out') }}</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                @else
                    <!-- Guest Links -->
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
