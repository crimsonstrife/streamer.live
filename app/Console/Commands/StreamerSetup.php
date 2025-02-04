<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

/**
 * Class StreamerSetup
 *
 * This command sets up the streamer environment.
 *
 * @package App\Console\Commands
 */
class StreamerSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'streamer:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set up the Streamer.live application';

    public function handle()
    {
        $this->info('Welcome to the Streamer.live Setup Wizard!');

        // Step 1: Database Configuration
        $this->configureDatabase();

        // Step 2: Run Migrations
        $this->info('Running database migrations...');
        $this->call('migrate');

        // Step 3: Seed the database
        $this->info('Seeding default database entries...');
        $this->seedDatabase();

        // Step 4: Create First Admin User
        $this->info('Creating your first admin user...');
        $this->createFirstAdmin();

        // Step 5: Seed Posts, using the PostSeeder
        $this->info('Seeding posts...');
        $this->call('db:seed', ['--class' => 'PostSeeder']);

        // Step 6: Generate Application Key
        $this->generateApplicationKey();

        $this->info('Setup complete! Your application is ready to use.');
    }

    /**
     * Configures the database settings for the application.
     *
     * This method is responsible for configuring the database settings for
     * the application. It will prompt the user for the database host, name,
     * username, and password, and update the .env file with the provided
     * information.
     *
     * @return void
     */
    private function configureDatabase()
    {
        $this->info('Configuring database settings...');

        $dbConnection = $this->ask('Enter your database connection (default: mysql)', 'mysql');
        $dbHost = $this->ask('Enter your database host (default: 127.0.0.1)', '127.0.0.1');
        $dbName = $this->ask('Enter your database name', 'streamer');
        $dbUser = $this->ask('Enter your database username', 'root');
        $dbPass = $this->secret('Enter your database password');

        // Check if the ENV file exists
        if (!file_exists(app()->environmentFilePath())) {
            $this->createEnv([
                'DB_CONNECTION' => $dbConnection,
                'DB_HOST' => $dbHost,
                'DB_DATABASE' => $dbName,
                'DB_USERNAME' => $dbUser,
                'DB_PASSWORD' => $dbPass,
            ]);

            $this->info('Database configuration complete!');

            return;
        }

        // ENV file exists, update the database settings
        $this->updateEnv([
            'DB_CONNECTION' => $dbConnection,
            'DB_HOST' => $dbHost,
            'DB_DATABASE' => $dbName,
            'DB_USERNAME' => $dbUser,
            'DB_PASSWORD' => $dbPass,
        ]);

        $this->info('Database configuration complete!');
    }

    /**
     * Seed the database with default data.
     *
     * This method is responsible for seeding the database with the default
     * data required for the application to function correctly. It will run
     * the database seeder to populate the database with the necessary data.
     *
     * @return void
     */
    private function seedDatabase()
    {
        // Run the database seeder
        $this->info('Seeding the database...');
        $this->call('db:seed');
    }

    /**
     * Creates the first admin user for the application.
     *
     * This method is responsible for setting up the initial admin user
     * during the streamer setup process. It ensures that there is at least
     * one admin user in the system with the necessary permissions to manage
     * the application.
     *
     * @return void
     */
    private function createFirstAdmin()
    {
        $passwordConfirmed = false;

        // Ask for the admin user details
        $username = $this->ask('Enter the admin username');
        $email = $this->ask('Enter the admin email');
        $password = $this->secret('Enter the admin password');
        $confirmPassword = $this->secret('Re-enter the admin password');

        // Confirm the password
        while (!$passwordConfirmed) {
            if ($password === $confirmPassword) {
                $passwordConfirmed = true;
            } else {
                $this->error('Passwords do not match! Please try again.');
                $password = $this->secret('Enter the admin password');
                $confirmPassword = $this->secret('Re-enter the admin password');
            }
        }

        // Create the admin user
        $user = new User();

        $admin = $user->create([
            'username' => $username,
            'email' => $email,
            'password' => bcrypt($password),
        ]);

        // Assign the Admin role to the user
        $admin->assignRole('Admin');

        // Assign the Moderator role to the user
        $admin->assignRole('Moderator');

        // Assign the Editor role to the user
        $admin->assignRole('Editor');

        // Assign the Viewer role to the user
        $admin->assignRole('Viewer');

        // Mark user as verified
        $admin->markEmailAsVerified();

        // Mark user as Filament admin
        $admin->update(['is_filament_admin' => true]);

        // Save the user
        $admin->save();

        $this->info("Admin user '{$username}' has been created successfully!");
    }

    /**
     * Updates the .env file with the provided data.
     *
     * @param array $data
     * @return void
     */
    private function updateEnv(array $data)
    {
        foreach ($data as $key => $value) {
            file_put_contents(app()->environmentFilePath(), preg_replace(
                "/^{$key}=.*$/m",
                "{$key}={$value}",
                file_get_contents(app()->environmentFilePath())
            ));
        }
    }

    /**
     * Creates a new .env file, and updates it with the provided data.
     *
     * @param array $data
     * @return void
     */
    private function createEnv(array $data)
    {
        // get the env.example file and copy it to .env
        copy(base_path('.env.example'), base_path('.env'));

        // update the .env file with the provided data
        $this->updateEnv($data);
    }

    /**
     * Retrieve the value of a given environment variable.
     *
     * @param string $key The key of the environment variable to retrieve.
     * @return mixed The value of the environment variable, or null if the key does not exist.
     */
    private function getEnvValue($key)
    {
        $envFile = file_get_contents(app()->environmentFilePath());

        preg_match("/^{$key}=(.*)$/m", $envFile, $matches);

        return $matches[1] ?? null;
    }

    /**
     * Sets the value of a given key in the environment configuration.
     *
     * @param string $key The environment variable key to set.
     * @param string $value The value to set for the given key.
     * @return void
     */
    private function generateApplicationKey()
    {
        // Generate the application key
        $this->info('Generating application key...');
        $keyGenerated = $this->call('key:generate');

        // Check if the key was generated successfully
        if ($keyGenerated === 0) {
            $this->info('Application key generated successfully!');
        } else {
            $this->error('Failed to generate application key!');
        }
    }
}
