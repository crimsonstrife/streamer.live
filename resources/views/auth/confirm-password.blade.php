<x-guest-layout>
    <x-authentication-card>
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
            <main class="form-signin w-50 m-auto">
                <!-- Logo -->
                <div class="mb-4 text-center">
                    <x-authentication-card-logo class="w-auto h-9" height="57"/>
                </div>

                <h1 class="h3 mb-3 fw-normal">Password Confirmation</h1>

                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
                </div>

                <x-validation-errors class="mb-4" />

                <form method="POST" action="{{ route('password.confirm') }}">
                    @csrf

                    <div>
                        <x-label for="password" value="{{ __('Password') }}" />
                        <x-input id="password" class="form-control" type="password" name="password" required autocomplete="current-password" autofocus />
                    </div>

                    <div class="flex justify-end mt-4">
                        <x-button class="ms-4">
                            {{ __('Confirm') }}
                        </x-button>
                    </div>
                </form>

                {{-- Optional copyright line --}}
                @isset($settings->show_site_name)
                    @if ($settings->show_site_name)
                        <p style="margin-bottom: unset;">© {{ date('Y') }} {{ $siteName }}</p>
                    @endif
                @endisset
                <x-copyright />
            </main>
        </div>
    </x-authentication-card>
</x-guest-layout>
