<x-guest-layout>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="p-4 shadow-lg card w-100" style="max-width: 500px;">
            <!-- Logo -->
            <div class="mb-4 text-center">
                <x-authentication-card-logo />
            </div>

            <!-- Validation Errors -->
            <x-validation-errors class="alert alert-danger" />

            <form method="POST" action="{{ route('register') }}">
                @csrf

                <div class="mb-3">
                    <label for="username" class="form-label">{{ __('Username') }}</label>
                    <input id="username" type="text" name="username" class="form-control" value="{{ old('username') }}" required autofocus autocomplete="username">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">{{ __('Email') }}</label>
                    <input id="email" type="email" name="email" class="form-control" value="{{ old('email') }}" required autocomplete="email">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">{{ __('Password') }}</label>
                    <input id="password" type="password" name="password" class="form-control" required autocomplete="new-password">
                </div>

                <div class="mb-3">
                    <label for="password_confirmation" class="form-label">{{ __('Confirm Password') }}</label>
                    <input id="password_confirmation" type="password" name="password_confirmation" class="form-control" required autocomplete="new-password">
                </div>

                <div class="mb-3">
                    <label for="birthdate" class="form-label">{{ __('Birthdate') }}</label>
                    <input id="birthdate" type="date" name="birthdate" class="form-control" value="{{ old('birthdate') }}" required>
                </div>

                <x-turnstile::widget />
                @error('turnstile')
                    <div class="text-danger mt-2">{{ $message }}</div>
                @enderror

                @if (Laravel\Jetstream\Jetstream::hasTermsAndPrivacyPolicyFeature())
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="terms" name="terms" required>
                        <label class="form-check-label" for="terms">
                            {!! __('I agree to the :terms_of_service and :privacy_policy', [
                                'terms_of_service' => '<a target="_blank" href="'.route('terms.show').'" class="text-decoration-none">'.__('Terms of Service').'</a>',
                                'privacy_policy' => '<a target="_blank" href="'.route('policy.show').'" class="text-decoration-none">'.__('Privacy Policy').'</a>',
                            ]) !!}
                        </label>
                    </div>
                @endif

                <div class="d-flex justify-content-between align-items-center">
                    <a class="text-decoration-none" href="{{ route('login') }}">
                        {{ __('Already registered?') }}
                    </a>

                    <button type="submit" class="btn btn-primary">
                        {{ __('Register') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-guest-layout>
