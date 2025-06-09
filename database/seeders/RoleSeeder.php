<?php

namespace Database\Seeders;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Permission;
use App\Models\AuthObjects\PermissionSet;
use App\Models\AuthObjects\PermissionGroup;
use App\Models\AuthObjects\Role;

/**
 * A seeder class responsible for creating roles from a JSON file and
 * associating permissions, permission sets, and permission groups with these roles.
 */
class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Load the role definitions from the JSON file
        $jsonFilePath = database_path('data/roles.json');
        $rolesData = $this->loadRolesFromJson($jsonFilePath);

        // Create Roles dynamically
        $this->createRoles($rolesData);

        // Protect the Super Admin role from deletion
        $this->protectSuperAdminRole();
    }

    /**
     * Load roles from a JSON file.
     *
     * @param string $filePath
     * @return array
     * @throws FileNotFoundException
     */
    private function loadRolesFromJson(string $filePath): array
    {
        if (!File::exists($filePath)) {
            $this->command->error("Roles JSON file not found: {$filePath}");
            return [];
        }

        $jsonContent = File::get($filePath);
        return json_decode($jsonContent, true);
    }

    /**
     * Create roles dynamically based on the provided role data.
     *
     * @param array $rolesData
     */
    private function createRoles(array $rolesData): void
    {
        foreach ($rolesData['roles'] as $roleData) {
            // Create or update the Role
            $role = Role::firstOrCreate(['name' => $roleData['name']]);

            // Get the associated PermissionGroups, PermissionSets and sync permissions
            $permissionGroupIds = PermissionGroup::whereIn('name', $roleData['groups'])->pluck('id')->toArray();
            $permissionSetIds = PermissionSet::whereIn('name', $roleData['sets'])->pluck('id')->toArray();
            $permissions = Permission::whereIn('name', $roleData['permissions'])->pluck('id')->toArray();

            // Assign the permissions to the Role
            $this->assignPermissionsToRole($role, $permissions);

            // Assign the PermissionSets to the Role
            $this->assignPermissionSetsToRole($role, $roleData['sets']);

            // Assign the PermissionGroups to the Role
            $this->assignPermissionGroupsToRole($role, $roleData['groups']);

            // Log the creation or update of the Role
            $this->command->info("Role created/updated: {$roleData['name']}");
        }
    }

    /**
     * Ensure that the Super Admin role cannot be deleted.
     */
    private function protectSuperAdminRole(): void
    {
        // Find the Super Admin role and make sure it cannot be deleted
        $superAdminRole = Role::where('name', 'super-admin')->first();

        if ($superAdminRole) {
            // Disable deletion of the Super Admin role by setting a protected flag (soft-deletion prevention)
            $superAdminRole->update(['protected' => true]);

            $this->command->info("Super Admin role protected from deletion.");
        }
    }

    /**
     * Assign permissions to a role.
     */
    private function assignPermissionsToRole(Role $role, array $permissions): void
    {
        // Get the Permission IDs
        $permissionIds = Permission::whereIn('name', $permissions)->pluck('id')->toArray();

        // Chunk the Permission IDs to avoid memory issues
        foreach (array_chunk($permissionIds, 80) as $permissionIdsChunk) {
            // For each Permission, attach it to the Role
            foreach ($permissionIdsChunk as $permissionId) {
                $role->givePermissionTo($permissionId);
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }

        // Sync the permissions
        $role->syncPermissions($permissions);

        $this->command->info("Permissions assigned to role: {$role->name}");
    }

    /**
     * Assign permission sets to a role.
     */
    private function assignPermissionSetsToRole(Role $role, array $permissionSets): void
    {
        // Get the PermissionSet IDs
        $permissionSetIds = PermissionSet::whereIn('name', $permissionSets)->pluck('id')->toArray();

        foreach (array_chunk($permissionSetIds, 80) as $permissionSetIdsChunk) {
            // For each PermissionSet, attach it to the Role
            foreach ($permissionSetIdsChunk as $permissionSetId) {
                $role->permissionSets()->attach($permissionSetId);
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }

        $this->command->info("Permission sets assigned to role: {$role->name}");
    }

    /**
     * Assign permission groups to a role.
     */
    private function assignPermissionGroupsToRole(Role $role, array $permissionGroups): void
    {
        // Get the PermissionGroup IDs
        $permissionGroupIds = PermissionGroup::whereIn('name', $permissionGroups)->pluck('id')->toArray();

        foreach (array_chunk($permissionGroupIds, 80) as $permissionGroupIdsChunk) {
            // For each PermissionGroup, attach it to the Role
            foreach ($permissionGroupIdsChunk as $permissionGroupId) {
                $role->permissionGroups()->attach($permissionGroupId);
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }

        $this->command->info("Permission groups assigned to role: {$role->name}");
    }
}
