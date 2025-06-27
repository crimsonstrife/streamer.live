<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            IconSeeder::class,
            SpamFilterPatternsSeeder::class,
            FabricatorHomePageSeeder::class,
            FabricatorStorePagesSeeder::class,
            FabricatorBlogPagesSeeder::class,
            MenuSeeder::class,
            PermissionSeeder::class,
            PermissionSetSeeder::class,
            PermissionGroupSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            BlogSeeder::class,
        ]);
    }
}
