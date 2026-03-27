@php
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Route;

    $style = app(\App\Settings\LookFeelSettings::class);
    $display_mode = $style->mode;
@endphp

<nav class="{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }} navbar-expand-lg navbar-{{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }} border-bottom">
    <div class="container">
        <a class="navbar-brand" href="{{ url('/') }}">
            <x-application-mark class="w-auto h-9" />
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto">
                {{-- Real site sections --}}
            </ul>

            <ul class="navbar-nav ms-auto">
                @auth
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="accountDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {{ Auth::user()->name ?? Auth::user()->username ?? __('Account') }}
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                            @if (Route::has('dashboard'))
                                <li>
                                    <a class="dropdown-item {{ request()->routeIs('dashboard') ? 'active' : '' }}"
                                       href="{{ route('dashboard') }}">
                                        Dashboard
                                    </a>
                                </li>
                            @endif

                            @if (Route::has('tickets.index'))
                                <li>
                                    <a class="dropdown-item {{ request()->routeIs('tickets.*') ? 'active' : '' }}"
                                       href="{{ route('tickets.index') }}">
                                        Support Tickets
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item"
                                       href="{{ route('tickets.create') }}">
                                        Open a Ticket
                                    </a>
                                </li>
                            @endif

                            @if (Route::has('shop.orders.index'))
                                <li>
                                    <a class="dropdown-item {{ request()->routeIs('shop.orders.*') ? 'active' : '' }}"
                                       href="{{ route('shop.orders.index') }}">
                                        My Orders
                                    </a>
                                </li>
                            @endif

                            @if (Route::has('profile.show'))
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item" href="{{ route('profile.show') }}">
                                        Profile Settings
                                    </a>
                                </li>
                            @endif

                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="dropdown-item">
                                        Log Out
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </li>
                @endauth
            </ul>
        </div>
    </div>
</nav>
