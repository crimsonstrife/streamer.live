<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //User::factory()->create([
        //    'name' => 'Test User',
        //    'email' => 'test@example.com',
        //]);

        // Run the RolesSeeder
        $this->call(RolesSeeder::class);

        // Run the PermissionsSeeder
        $this->call(PermissionsSeeder::class);

        // Run the PageSeeder
        $this->call(PageSeeder::class);

        // Run the CategorySeeder
        $this->call(CategorySeeder::class);

        // Run the TagSeeder
        $this->call(TagSeeder::class);
    }
}
