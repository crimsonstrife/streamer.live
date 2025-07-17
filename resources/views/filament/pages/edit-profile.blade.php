<x-filament-panels::page>
    @if (Laravel\Fortify\Features::canUpdateProfileInformation())
        @livewire(App\Http\Livewire\Profile\UpdateProfileInformationForm::class)

        <x-section-border/>
    @endif

    @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::updatePasswords()))
        <div class="mt-10 sm:mt-0">
            @livewire(App\Http\Livewire\Profile\UpdatePasswordForm::class)
        </div>

        <x-section-border/>
    @endif

    @if (Laravel\Fortify\Features::canManageTwoFactorAuthentication())
        <div class="mt-10 sm:mt-0">
            @livewire(App\Http\Livewire\Profile\TwoFactorAuthenticationForm::class)
        </div>

        <x-section-border/>
    @endif

    <div class="mt-10 sm:mt-0">
        @livewire(App\Http\Livewire\Profile\LogoutOtherBrowserSessionsForm::class)
    </div>

    @if (Laravel\Jetstream\Jetstream::hasAccountDeletionFeatures())
        <x-section-border/>

        <div class="mt-10 sm:mt-0">
            @livewire(App\Http\Livewire\Profile\DeleteUserForm::class)
        </div>
    @endif
</x-filament-panels::page>
