<x-app-layout>
    <x-slot name="header">
        <div class="container mt-4">
            <h2 class="fw-semibold fs-4 text-dark">
                {{ __('Profile') }}
            </h2>
        </div>
    </x-slot>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                @if (Laravel\Fortify\Features::canUpdateProfileInformation())
                    <div class="mb-4 shadow-sm card">
                        <div class="text-white card-header bg-primary">
                            {{ __('Update Profile Information') }}
                        </div>
                        <div class="card-body">
                            @livewire('profile.update-profile-information-form')
                        </div>
                    </div>
                @endif

                @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::updatePasswords()))
                    <div class="mb-4 shadow-sm card">
                        <div class="card-header bg-warning text-dark">
                            {{ __('Update Password') }}
                        </div>
                        <div class="card-body">
                            @livewire('profile.update-password-form')
                        </div>
                    </div>
                @endif

                @if (Laravel\Fortify\Features::canManageTwoFactorAuthentication())
                    <div class="mb-4 shadow-sm card">
                        <div class="text-white card-header bg-info">
                            {{ __('Two-Factor Authentication') }}
                        </div>
                        <div class="card-body">
                            @livewire('profile.two-factor-authentication-form')
                        </div>
                    </div>
                @endif

                <div class="mb-4 shadow-sm card">
                    <div class="text-white card-header bg-secondary">
                        {{ __('Logout Other Browser Sessions') }}
                    </div>
                    <div class="card-body">
                        @livewire('profile.logout-other-browser-sessions-form')
                    </div>
                </div>

                @if (Laravel\Jetstream\Jetstream::hasAccountDeletionFeatures())
                    <div class="mb-4 shadow-sm card">
                        <div class="text-white card-header bg-danger">
                            {{ __('Delete Account') }}
                        </div>
                        <div class="card-body">
                            @livewire('profile.delete-user-form')
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>