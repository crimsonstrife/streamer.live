<x-guest-layout>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <main class="form-signin w-50 m-auto">
                <!-- Logo -->
                <div class="mb-4 text-center">
                    <x-authentication-card-logo class="w-auto h-9" height="57"/>
                </div>

                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <!-- Validation Errors -->
                <x-validation-errors class="alert alert-danger" />

                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="mb-3 form-floating">
                        <label for="email" class="form-label">{{ __('Email') }}</label>
                        <input id="email" type="email" name="email" class="form-control" value="{{ old('email') }}" required autofocus autocomplete="email">
                    </div>

                    <div class="mb-3 form-floating">
                        <label for="password" class="form-label">{{ __('Password') }}</label>
                        <input id="password" type="password" name="password" class="form-control" required autocomplete="current-password">
                    </div>

                    <div class="mb-3 text-start my-3">
                        <input type="checkbox" class="form-check-input" id="remember_me" name="remember">
                        <label class="form-check-label" for="remember_me">{{ __('Remember me') }}</label>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        @if (Route::has('password.request'))
                            <a class="text-decoration-none" href="{{ route('password.request') }}">
                                {{ __('Forgot your password?') }}
                            </a>
                        @endif

                        <button type="submit" class="btn btn-primary w-100 py-2">
                            {{ __('Log in') }}
                        </button>
                    </div>
                </form>

                {{-- Optional copyright line --}}
                @isset($settings->show_site_name)
                    @if ($settings->show_site_name)
                        <p style="margin-bottom: unset;">© {{ date('Y') }} {{ $siteName }}</p>
                    @endif
                @endisset
                <p class="mt-5 mb-3 text-body-secondary">
                    <span>
                        <p>Powered by Streamer.live © 2025 <?php if (date("Y") > date("Y", strtotime("2025"))) {
                            echo " - " . date("Y");
                        }; ?> by CrimsonStrife, All rights reserved.</p>
                    </span>
                </p>
        </main>
    </div>
</x-guest-layout>

