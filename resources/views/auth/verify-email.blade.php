<x-guest-layout>
    <x-authentication-card>
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
            <main class="form-signin w-50 m-auto">
                <!-- Logo -->
                <div class="mb-4 text-center">
                    <x-authentication-card-logo class="w-auto h-9" height="57"/>
                </div>

                <h1 class="h3 mb-3 fw-normal">Please verify your email</h1>

                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {{ __('Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}
                </div>

                <!-- Validation Errors -->
                <x-validation-errors class="alert alert-danger" />

                @if (session('status') == 'verification-link-sent')
                    <div class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                        {{ __('A new verification link has been sent to the email address you provided in your profile settings.') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('verification.send') }}">
                    @csrf

                    <div>
                        <x-button type="submit">
                            {{ __('Resend Verification Email') }}
                        </x-button>
                    </div>
                </form>

                <div>
                    <a
                        href="{{ route('profile.show') }}"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        {{ __('Edit Profile') }}</a>

                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf

                        <button type="submit" class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ms-2">
                            {{ __('Log Out') }}
                        </button>
                    </form>
                </div>

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
