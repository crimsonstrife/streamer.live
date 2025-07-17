<div class="shadow-sm card">
    <div class="text-white card-header bg-primary">
        {{ __('Profile Information') }}
    </div>

    <div class="card-body">
        <p class="text-muted">
            {{ __('Update your account\'s profile information and email address.') }}
        </p>

        <form wire:submit.prevent="updateProfileInformation">
            <div class="row g-3">
                <!-- Profile Photo -->
                @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                    <div x-data="{photoName: null, photoPreview: null}" class="col-12">
                        <label for="photo" class="form-label">{{ __('Photo') }}</label>
                        <input type="file" id="photo" class="d-none" wire:model.live="photo"
                               x-ref="photo"
                               x-on:change="
                                    photoName = $refs.photo.files[0].name;
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        photoPreview = e.target.result;
                                    };
                                    reader.readAsDataURL($refs.photo.files[0]);
                               " />

                        <div class="mt-2 d-flex align-items-center">
                            <!-- Current Profile Photo -->
                            <img x-show="!photoPreview" class="rounded-circle me-3" src="{{ $this->user->profile_photo_url }}" alt="{{ $this->user->display_name }}" width="80" height="80">

                            <!-- New Profile Photo Preview -->
                            <span x-show="photoPreview" x-bind:style="'background-image: url(\'' + photoPreview + '\');'" class="rounded-circle d-block" style="width: 80px; height: 80px; background-size: cover; display: none;"></span>
                        </div>

                        <button type="button" class="mt-2 btn btn-secondary" x-on:click.prevent="$refs.photo.click()">
                            {{ __('Select A New Photo') }}
                        </button>

                        @if ($this->user->profile_photo_path)
                            <button type="button" class="mt-2 btn btn-danger ms-2" wire:click="deleteProfilePhoto">
                                {{ __('Remove Photo') }}
                            </button>
                        @endif

                        <x-input-error for="photo" class="mt-2" />
                    </div>
                @endif

                <!-- Username -->
                <div class="col-md-6">
                    <label for="username" class="form-label">{{ __('Username') }}</label>
                    <input id="username" type="text" class="form-control" wire:model="state.username" required autocomplete="username">
                    <x-input-error for="username" />
                </div>

                <!-- First Name -->
                <div class="col-md-6">
                    <label for="first_name" class="form-label">{{ __('First Name') }}</label>
                    <input id="first_name" type="text" class="form-control" wire:model="state.first_name" required autocomplete="given-name">
                    <x-input-error for="first_name" />
                </div>

                <!-- Last Name -->
                <div class="col-md-6">
                    <label for="last_name" class="form-label">{{ __('Last Name') }}</label>
                    <input id="last_name" type="text" class="form-control" wire:model="state.last_name" required autocomplete="family-name">
                    <x-input-error for="last_name" />
                </div>

                <!-- Display Name -->
                <div class="col-md-6">
                    <label for="display_name" class="form-label">{{ __('Display Name') }}</label>
                    <input id="display_name" type="text" class="form-control" wire:model="state.display_name" autocomplete="username">
                    <x-input-error for="display_name" />
                </div>

                <!-- Email -->
                <div class="col-md-6">
                    <label for="email" class="form-label">{{ __('Email') }}</label>
                    <input id="email" type="email" class="form-control" wire:model="state.email" required autocomplete="email">
                    <x-input-error for="email" />

                    @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::emailVerification()) && ! $this->user->hasVerifiedEmail())
                        <div class="mt-2 text-danger">
                            {{ __('Your email address is unverified.') }}
                            <button type="button" class="p-0 btn btn-link" wire:click.prevent="sendEmailVerification">
                                {{ __('Click here to re-send the verification email.') }}
                            </button>
                        </div>

                        @if ($this->verificationLinkSent)
                            <p class="mt-2 text-success">
                                {{ __('A new verification link has been sent to your email address.') }}
                            </p>
                        @endif
                    @endif
                </div>

                <!-- Birthdate -->
                <div class="col-md-6">
                    <label for="birthdate" class="form-label">{{ __('Birthdate') }}</label>
                    <input id="birthdate" type="date" class="form-control" wire:model="state.birthdate" required>
                    <x-input-error for="birthdate" />
                </div>

                <!-- Pronouns -->
                <div class="col-md-6">
                    <label for="pronouns" class="form-label">{{ __('Pronouns') }}</label>
                    <input id="pronouns" type="text" class="form-control" wire:model="state.pronouns">
                    <x-input-error for="pronouns" />
                </div>

                <!-- Location -->
                <div class="col-md-6">
                    <label for="location" class="form-label">{{ __('Location') }}</label>
                    <input id="location" type="text" class="form-control" wire:model="state.location">
                    <x-input-error for="location" />
                </div>
            </div>

            <div class="mt-4 d-flex justify-content-end">
                <div class="me-3">
                    <x-action-message on="saved">
                        {{ __('Saved.') }}
                    </x-action-message>
                </div>

                <button type="submit" class="btn btn-primary" wire:loading.attr="disabled" wire:target="photo">
                    {{ __('Save') }}
                </button>
            </div>
        </form>
    </div>
</div>
