<div class="shadow-sm card">
    <div class="text-white card-header bg-primary">
        {{ __('Update Password') }}
    </div>

    <div class="card-body">
        <p class="text-muted">
            {{ __('Ensure your account is using a long, random password to stay secure.') }}
        </p>

        <form wire:submit.prevent="updatePassword">
            <div class="row g-3">
                <!-- Current Password -->
                <div class="col-md-6">
                    <label for="current_password" class="form-label">{{ __('Current Password') }}</label>
                    <input id="current_password" type="password" class="form-control" wire:model="state.current_password" autocomplete="current-password">
                    <x-input-error for="current_password" />
                </div>

                <!-- New Password -->
                <div class="col-md-6">
                    <label for="password" class="form-label">{{ __('New Password') }}</label>
                    <input id="password" type="password" class="form-control" wire:model="state.password" autocomplete="new-password">
                    <x-input-error for="password" />
                </div>

                <!-- Confirm New Password -->
                <div class="col-md-6">
                    <label for="password_confirmation" class="form-label">{{ __('Confirm Password') }}</label>
                    <input id="password_confirmation" type="password" class="form-control" wire:model="state.password_confirmation" autocomplete="new-password">
                    <x-input-error for="password_confirmation" />
                </div>
            </div>

            <div class="mt-4 d-flex justify-content-end">
                <div class="me-3">
                    <x-action-message on="saved">
                        {{ __('Saved.') }}
                    </x-action-message>
                </div>

                <button type="submit" class="btn btn-primary">
                    {{ __('Save') }}
                </button>
            </div>
        </form>
    </div>
</div>