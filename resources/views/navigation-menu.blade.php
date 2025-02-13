<nav class="navbar navbar-expand-md navbar-light bg-light" aria-label="{{ __('Main Navigation') }}">
    <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-block h-100" style="max-height: 50px; width: 50px;" href="{{ route('dashboard') }}">
            <x-application-mark class="d-block" style="max-height: 50px; width: 50px;" />
        </a>

        <!-- Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primaryNavbar" aria-controls="primaryNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Items -->
        <div class="collapse navbar-collapse" id="primaryNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" aria-current="page" href="{{ route('home') }}">
                        {{ __('Home') }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('blog') ? 'active' : '' }}" aria-current="page" href="{{ route('blog') }}">
                        {{ ucfirst(config('cms.posts_page_slug', 'Blog')) }}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}" aria-current="page" href="{{ route('dashboard') }}">
                        {{ __('Dashboard') }}
                    </a>
                </li>
            </ul>
            <!-- Site Search -->
            <form role="search">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
            <!-- Authentication Links -->
            @if (Auth::check())
                <!-- User Dropdown -->
                <div class="dropdown userDropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="userDropdown" aria-expanded="false">
                        @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                            <img class="rounded-circle" src="{{ Auth::user()->profile_photo_url }}" width="32" height="32" alt="{{ Auth::user()->username }}">
                        @else
                            {{ Auth::user()->username }}
                        @endif
                    </a>
                    <ul class="dropdown-menu text-small" aria-labelledby="userDropdown">
                        <li>
                            <h6 class="dropdown-header">
                                {{ __('Manage Account') }}
                            </h6>
                        </li>
                        <li>
                            <a class="dropdown-item" href="{{ route('profile.show') }}">
                                {{ __('Profile') }}
                            </a>
                        </li>
                        @if (Laravel\Jetstream\Jetstream::hasApiFeatures())
                            <li>
                                <a class="dropdown-item" href="{{ route('api-tokens.index') }}">{{ __('API Tokens') }}</a>
                            </li>
                        @endif
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <!-- Logout -->
                            <form method="POST" action="{{ route('logout') }}" x-data>
                                @csrf
                                <button class="dropdown-item" type="submit">{{ __('Log Out') }}</button>
                            </form>
                        </li>
                    </ul>
                </div>
            @else
                <!-- Guest Links -->
                <div class="text-end">
                    <a href="{{ route('login') }}" class="btn btn-outline-primary me-2">{{ __('Login') }}</a>
                    <a href="{{ route('register') }}" class="btn btn-primary">{{ __('Sign-up') }}</a>
                </div>
            @endif
        </div>
    </div>
</nav>
