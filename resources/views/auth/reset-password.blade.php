<x-guest-layout>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <main class="form-signin w-50 m-auto">
            <!-- Logo -->
            <div class="mb-4 text-center">
                <x-authentication-card-logo class="w-auto h-9" height="57"/>
            </div>

            <h1 class="h3 mb-3 fw-normal">Uh-Oh, forgot your password?</h1>

            <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {{ __('Forgot your password? No problem, it happens. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
            </div>

            @session('status')
            <div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                {{ $value }}
            </div>
            @endsession

            <x-validation-errors class="mb-4" />

            <form method="POST" action="{{ route('password.update') }}">
                @csrf

                <input type="hidden" name="token" value="{{ $request->route('token') }}">

                <div class="block">
                    <x-label for="email" value="{{ __('Email') }}" />
                    <x-input id="email" class="form-control" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="email" />
                </div>

                <div class="mt-4">
                    <x-label for="password" value="{{ __('Password') }}" />
                    <x-input id="password" class="form-control" type="password" name="password" required autocomplete="new-password" />
                </div>

                <div class="mt-4">
                    <x-label for="password_confirmation" value="{{ __('Confirm Password') }}" />
                    <x-input id="password_confirmation" class="form-control" type="password" name="password_confirmation" required autocomplete="new-password" />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <x-button>
                        {{ __('Reset Password') }}
                    </x-button>
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
                                echo " - " . date("Y");}; ?> by CrimsonStrife, All rights reserved.</p>
                    </span>
            </p>
        </main>
    </div>
</x-guest-layout>
