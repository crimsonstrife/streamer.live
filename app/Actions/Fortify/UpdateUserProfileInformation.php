<?php

namespace App\Actions\Fortify;

use App\Models\AuthObjects\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, mixed>  $input
     */
    public function update(User $user, array $input): void
    {
        Validator::make($input, [
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id), 'blasp_check'],
            'first_name' => ['nullable', 'string', 'max:255', 'blasp_check'],
            'last_name' => ['nullable', 'string', 'max:255', 'blasp_check'],
            'display_name' => ['nullable', 'string', 'max:255', Rule::unique('users')->ignore($user->id), 'blasp_check'],
            'birthdate' => ['required', 'date'],
            'pronouns' => ['nullable', 'string', 'max:255', 'blasp_check'],
            'location' => ['nullable', 'string', 'max:255', 'blasp_check'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
        ])->validateWithBag('updateProfileInformation');

        if (isset($input['photo'])) {
            $user->updateProfilePhoto($input['photo']);
        }

        if (
            $input['email'] !== $user->email &&
            $user instanceof MustVerifyEmail
        ) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill([
                'username' => $input['username'],
                'birthdate' => $input['birthdate'],
                'email' => $input['email'],
            ])->save();
        }
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(User $user, array $input): void
    {
        $user->forceFill([
            'username' => $input['username'],
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'display_name' => $input['display_name'],
            'birthdate' => $input['birthdate'],
            'pronouns' => $input['pronouns'],
            'location' => $input['location'],
            'email' => $input['email'],
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
