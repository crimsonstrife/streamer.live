<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

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

        // Assign permissions to roles
        $this->assignPermissionsToRoles();
    }

    private function assignPermissionsToRoles(): void
    {
        // Assign all permissions to Admin role
        $adminRole = Role::firstWhere('name', 'Admin');
        $adminRole->syncPermissions(Permission::all());

        // Assign limited permissions to Moderator role
        $moderatorRole = Role::firstWhere('name', 'Moderator');
        $moderatorRole->syncPermissions([
            'manage comments',
            'manage schedules',
            'view posts',
            'view schedules',
        ]);

        // Assign view-only permissions to Viewer role
        $fanRole = Role::firstWhere('name', 'Viewer');
        $fanRole->syncPermissions(['view posts', 'view schedules']);
    }
}
