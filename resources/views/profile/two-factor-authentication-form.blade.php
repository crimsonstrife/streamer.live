<div class="shadow-sm card">
    <div class="text-white card-header bg-primary">
        {{ __('Two Factor Authentication') }}
    </div>

    <div class="card-body">
        <h5 class="card-title">
            @if ($this->enabled)
                @if ($showingConfirmation)
                    {{ __('Finish enabling two-factor authentication.') }}
                @else
                    {{ __('You have enabled two-factor authentication.') }}
                @endif
            @else
                {{ __('You have not enabled two-factor authentication.') }}
            @endif
        </h5>

        <p class="text-muted">
            {{ __('When two-factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone\'s Google Authenticator application.') }}
        </p>

        @if ($this->enabled)
            @if ($showingQrCode)
                <div class="mt-3 alert alert-info">
                    <p class="fw-bold">
                        @if ($showingConfirmation)
                            {{ __('To finish enabling two-factor authentication, scan the following QR code using your phone\'s authenticator application or enter the setup key and provide the generated OTP code.') }}
                        @else
                            {{ __('Two-factor authentication is now enabled. Scan the following QR code using your phone\'s authenticator application or enter the setup key.') }}
                        @endif
                    </p>
                </div>

                <div class="mt-3 d-flex justify-content-center">
                    <div class="p-3 bg-white rounded shadow-sm">
                        {!! $this->user->twoFactorQrCodeSvg() !!}
                    </div>
                </div>

                <div class="mt-3">
                    <p class="fw-bold text-danger">
                        {{ __('Setup Key') }}: {{ decrypt($this->user->two_factor_secret) }}
                    </p>
                </div>

                @if ($showingConfirmation)
                    <div class="mt-3">
                        <label for="code" class="form-label">{{ __('Enter Code') }}</label>
                        <input type="text" id="code" class="form-control w-50" inputmode="numeric" autofocus autocomplete="one-time-code"
                               wire:model="code" wire:keydown.enter="confirmTwoFactorAuthentication">
                        <x-input-error for="code" class="mt-2" />
                    </div>
                @endif
            @endif

            @if ($showingRecoveryCodes)
                <div class="mt-3 alert alert-warning">
                    <p class="fw-bold">
                        {{ __('Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two-factor authentication device is lost.') }}
                    </p>
                </div>

                <div class="p-3 rounded bg-light text-monospace">
                    @foreach (json_decode(decrypt($this->user->two_factor_recovery_codes), true) as $code)
                        <div>{{ $code }}</div>
                    @endforeach
                </div>
            @endif
        @endif

        <div class="mt-4">
            @if (!$this->enabled)
                <x-confirms-password wire:then="enableTwoFactorAuthentication">
                    <button class="btn btn-primary" wire:loading.attr="disabled">
                        {{ __('Enable') }}
                    </button>
                </x-confirms-password>
            @else
                @if ($showingRecoveryCodes)
                    <x-confirms-password wire:then="regenerateRecoveryCodes">
                        <button class="btn btn-secondary me-2">
                            {{ __('Regenerate Recovery Codes') }}
                        </button>
                    </x-confirms-password>
                @elseif ($showingConfirmation)
                    <x-confirms-password wire:then="confirmTwoFactorAuthentication">
                        <button class="btn btn-success me-2" wire:loading.attr="disabled">
                            {{ __('Confirm') }}
                        </button>
                    </x-confirms-password>
                @else
                    <x-confirms-password wire:then="showRecoveryCodes">
                        <button class="btn btn-secondary me-2">
                            {{ __('Show Recovery Codes') }}
                        </button>
                    </x-confirms-password>
                @endif

                @if ($showingConfirmation)
                    <x-confirms-password wire:then="disableTwoFactorAuthentication">
                        <button class="btn btn-warning" wire:loading.attr="disabled">
                            {{ __('Cancel') }}
                        </button>
                    </x-confirms-password>
                @else
                    <x-confirms-password wire:then="disableTwoFactorAuthentication">
                        <button class="btn btn-danger" wire:loading.attr="disabled">
                            {{ __('Disable') }}
                        </button>
                    </x-confirms-password>
                @endif
            @endif
        </div>
    </div>
</div>