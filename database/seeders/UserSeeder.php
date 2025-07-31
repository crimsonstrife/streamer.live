<?php

namespace Database\Seeders;

use App\Models\AuthObjects\User;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * UserSeeder class responsible for seeding the User model with necessary initial data.
 */
class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if there is already a super admin user, i.e., at least one user with the super-admin role
        $superAdmin = User::role('super-admin')->first();

        if ($superAdmin) {
            return;
        }

        // Check if there is only a single user, i.e. website has just been set up, needs super-admin.
        if (User::count() === 1) {
            $user = User::first();

            $user->assignRole('super-admin');

            // Check that a user was assigned the super-admin role, then return if so.
            $superAdmin = User::role('super-admin')->first();

            if ($superAdmin) {
                return;
            }
        }

        // Create the admin user from session
        $suppliedEmail    = session('installer.credentials.email');
        $suppliedPassword = session('installer.credentials.password');
        $suppliedUsername = session('installer.credentials.username');
        $suppliedFirstName = session('installer.credentials.firstname');
        $suppliedLastName = session('installer.credentials.lastname');
        if (!$suppliedPassword) {
            // Generate a password using faker
            $password = $this->generatePassword();
        } else {
            $password = $suppliedPassword;
        }
        if (!$suppliedEmail) {
            $email = 'admin@streamer.local';
        } else {
            $email = $suppliedEmail;
        }
        if (!$suppliedFirstName) {
            $firstName = 'Admin';
        } else {
            $firstName = $suppliedFirstName;
        }
        if (!$suppliedLastName) {
            $lastName = 'User';
        } else {
            $lastName = $suppliedLastName;
        }
        if (!$suppliedUsername) {
            $username = 'admin';
        } else {
            $username = $suppliedUsername;
        }

        // Create a super admin user
        $superAdmin = User::factory()->create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'username' => $username,
            'email' => $email,
            'password' => $this->isHashed($password) ? $password : bcrypt($password),
        ]);

        if ($superAdmin) {
            // store in session for the final step
            session([
                'installer.credentials.email'    => $superAdmin->email,
                'installer.credentials.password' => $password,
                'installer.credentials.username' => $superAdmin->username,
            ]);
            $superAdmin->assignRole('super-admin');
        }
    }

    /**
     * Generate a password using faker.
     */
    private function generatePassword(): string
    {
        $faker = Faker::create();

        $password = $faker->password(8, 20);

        // Since the password will be unknown, and ideally temporary, log it to the console for the user
        $this->command->info('Admin password: '.$password.' (This password will be used to log in as the super admin user, you should change it.)');

        // Wait for the user to see the password
        sleep(10); // 10 seconds

        // Return the password
        return $password;
    }
}
