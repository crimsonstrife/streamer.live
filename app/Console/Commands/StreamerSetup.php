<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

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

        $this->info('Setup complete! Your application is ready to use.');
    }

    private function configureDatabase()
    {
        $this->info('Configuring database settings...');

        $dbHost = $this->ask('Enter your database host (default: 127.0.0.1)', '127.0.0.1');
        $dbName = $this->ask('Enter your database name');
        $dbUser = $this->ask('Enter your database username');
        $dbPass = $this->secret('Enter your database password');

        $this->updateEnv([
            'DB_HOST' => $dbHost,
            'DB_DATABASE' => $dbName,
            'DB_USERNAME' => $dbUser,
            'DB_PASSWORD' => $dbPass,
        ]);

        $this->info('Database configuration complete!');
    }

    private function seedDatabase()
    {
        // Run the database seeder
        $this->info('Seeding the database...');
        $this->call('db:seed');
    }

    private function createFirstAdmin()
    {
        $username = $this->ask('Enter the admin username');
        $email = $this->ask('Enter the admin email');
        $password = $this->secret('Enter the admin password');

        $admin = User::create([
            'username' => $username,
            'email' => $email,
            'password' => bcrypt($password),
        ]);

        $admin->assignRole('Admin');

        // Mark user as verified
        $admin->markEmailAsVerified();

        // Mark user as Filament admin
        $admin->update(['is_filament_admin' => true]);

        $this->info("Admin user '{$username}' has been created successfully!");
    }

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
}
