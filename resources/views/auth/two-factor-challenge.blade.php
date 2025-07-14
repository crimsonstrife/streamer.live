<x-guest-layout>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <main class="form-signin w-50 m-auto">
            <!-- Logo -->
            <div class="mb-4 text-center">
                <x-authentication-card-logo class="w-auto h-9" height="57"/>
            </div>

            <h1 class="h3 mb-3 fw-normal">Authentication Challenge</h1>

            <div x-data="{ recovery: false }">
                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400" x-show="! recovery">
                    {{ __('Please confirm access to your account by entering the authentication code provided by your authenticator application.') }}
                </div>

                <div class="mb-4 text-sm text-gray-600 dark:text-gray-400" x-cloak x-show="recovery">
                    {{ __('Please confirm access to your account by entering one of your emergency recovery codes.') }}
                </div>

                <x-validation-errors class="mb-4" />

                <form method="POST" action="{{ route('two-factor.login') }}">
                    @csrf

                    <div class="mt-4" x-show="! recovery">
                        <x-label for="code" value="{{ __('Code') }}" />
                        <x-input id="code" class="form-control" type="text" inputmode="numeric" name="code" autofocus x-ref="code" autocomplete="one-time-code" />
                    </div>

                    <div class="mt-4" x-cloak x-show="recovery">
                        <x-label for="recovery_code" value="{{ __('Recovery Code') }}" />
                        <x-input id="recovery_code" class="form-control" type="text" name="recovery_code" x-ref="recovery_code" autocomplete="one-time-code" />
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <button type="button" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
                                x-show="! recovery"
                                x-on:click="
                                        recovery = true;
                                        $nextTick(() => { $refs.recovery_code.focus() })
                                    ">
                            {{ __('Use a recovery code') }}
                        </button>

                        <button type="button" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
                                x-cloak
                                x-show="recovery"
                                x-on:click="
                                        recovery = false;
                                        $nextTick(() => { $refs.code.focus() })
                                    ">
                            {{ __('Use an authentication code') }}
                        </button>

                        <x-button class="ms-4">
                            {{ __('Log in') }}
                        </x-button>
                    </div>
                </form>
            </div>

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
