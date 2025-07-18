<?php

namespace App\Actions\Fortify;

use App\Models\AuthObjects\User;
use App\Models\AuthObjects\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laragear\Turnstile\Facades\Turnstile;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            // User's birthdate is required and must be a date, should be validated to ensure it is in the past and the user is at least 13 years old
            'birthdate' => ['required', 'date', 'before:today', 'before:-13 years'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
            Turnstile::rules(),
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ])->validate();

        $user = User::create([
            'username' => $input['username'],
            'display_name' => $input['username'],
            'birthdate' => $input['birthdate'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        // Add the user role to new user
        $role = Role::where('name', 'user');

        $user->assignRole($role->name);

        return $user;
    }
}
