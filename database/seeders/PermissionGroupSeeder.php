<?php

namespace Database\Seeders;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Permission;
use App\Models\AuthObjects\PermissionSet;
use App\Models\AuthObjects\PermissionGroup;

class PermissionGroupSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Load the permission group definitions from the JSON file
        $jsonFilePath = database_path('data/permission_groups.json');
        $groupsData = $this->loadPermissionGroupsFromJson($jsonFilePath);

        // Create PermissionGroups dynamically
        $this->createPermissionGroups($groupsData);
    }

    /**
     * Load permission groups from a JSON file.
     *
     * @param string $filePath
     * @return array
     * @throws FileNotFoundException
     */
    private function loadPermissionGroupsFromJson(string $filePath): array
    {
        if (!File::exists($filePath)) {
            $this->command->error("Permission groups JSON file not found: {$filePath}");
            return [];
        }

        $jsonContent = File::get($filePath);
        return json_decode($jsonContent, true);
    }

    /**
     * Create PermissionGroups dynamically based on the provided group data.
     *
     * @param array $groupsData
     */
    private function createPermissionGroups(array $groupsData): void
    {
        foreach (array_chunk($groupsData['groups'], 10) as $groupChunk) {
            foreach ($groupChunk as $groupData) {
                // Create or update the PermissionGroup
                $permissionGroup = PermissionGroup::firstOrCreate(['name' => $groupData['name']]);

                // Get the IDs of the associated PermissionSets
                $permissionSetIds = PermissionSet::whereIn('name', $groupData['sets'])->pluck('id')->toArray();

                // Sync the PermissionSets with the PermissionGroup
                $permissionGroup->permissionSets()->sync($permissionSetIds);

                // Handle special permissions for the group
                if (!empty($groupData['permissions'])) {
                    $specialPermissionIds = Permission::whereIn('name', $groupData['permissions'])->pluck('id')->toArray();
                    $permissionGroup->permissions()->syncWithoutDetaching($specialPermissionIds); // Sync without detaching existing permissions
                }

                // Log the creation or update of the PermissionGroup
                $this->command->info("PermissionGroup created/updated: {$groupData['name']}");
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }

        // Free memory after all groups are created
        gc_collect_cycles();
    }
}
