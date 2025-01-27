<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User and Role Management
            'manage users',
            'manage roles',
            'manage permissions',

            // Content Management
            'create posts',
            'edit posts',
            'delete posts',
            'view posts',
            'manage comments',

            // Stream Management
            'manage schedules',
            'view schedules',

            // Perks and API Integrations
            'manage perks',
            'manage integrations',

            // Merch and Donations
            'view donations',
            'manage merch',

            // General Admin Tools
            'view analytics',
            'manage settings',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
