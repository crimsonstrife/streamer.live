<?php

namespace Database\Seeders;

use App\Models\AuthObjects\PermissionRegistrar;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Utilities\DynamicModelUtility as ModelUtility;
use Spatie\Permission\Models\Permission;
use App\Models\AuthObjects\PermissionSet;

class PermissionSetSeeder extends Seeder
{
    use WithoutModelEvents;

    private $modelsWithoutIsPermissible = ['permission'];

    /**
     * Run the database seeds.
     * @throws BindingResolutionException
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create default PermissionSets dynamically
        $this->createDynamicPermissionSets();

        // Re-cache permissions
        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * Dynamically create PermissionSets based on models and available permissions.
     */
    private function createDynamicPermissionSets(): void
    {
        // Get all models that use the IsPermissible trait
        $models = ModelUtility::getModelsByTrait('App\Traits\IsPermissible');

        // Add additional models as needed that don't use the IsPermissible trait
        $models = array_merge($models, $this->modelsWithoutIsPermissible);

        foreach (array_chunk($models, 10) as $modelChunk) {
            // Loop through each model and create a PermissionSet for it
            foreach ($modelChunk as $model) {
                // Format the model name for the permission
                $modelName = ModelUtility::getNameForPermission($model);
                $setName = ucfirst($modelName) . ' Management';  // e.g., 'Blog Management'
                $modelName = strtolower(str_replace(' ', '-', trim($modelName)));  // Normalize the model name

                // Generate permission names (CRUD pattern)
                $permissions = [
                    "create-{$modelName}",
                    "read-{$modelName}",
                    "update-{$modelName}",
                    "delete-{$modelName}",
                    "list-{$modelName}",
                    "restore-{$modelName}",
                    "force-delete-{$modelName}",
                    "export-{$modelName}",
                    "import-{$modelName}",
                    "reorder-{$modelName}",
                ];

                // Create or update the PermissionSet for this model
                $permissionSet = PermissionSet::firstOrCreate(['name' => $setName, 'guard_name' => 'web']);

                // Get the corresponding permission IDs and check if they exist
                $permissionIds = Permission::whereIn('name', $permissions)->pluck('id')->toArray();

                if (count($permissionIds) < count($permissions)) {
                    $missingPermissions = array_diff($permissions, Permission::whereIn('name', $permissions)->pluck('name')->toArray());
                    $this->command->warn("Missing permissions for {$modelName}: " . implode(', ', $missingPermissions));
                }

                // Sync existing permission IDs with the PermissionSet
                $permissionSet->permissions()->sync($permissionIds);

                // Log the creation or update of the PermissionSet
                $this->command->info("PermissionSet created/updated: {$setName}");
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }
    }
}
