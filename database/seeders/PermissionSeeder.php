<?php

namespace Database\Seeders;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Utilities\DynamicModelUtility as ModelUtility;
use Spatie\Permission\Models\Permission;
use App\Models\AuthObjects\PermissionRegistrar;

/**
 * Class PermissionSeeder
 *
 * The PermissionSeeder class is responsible for seeding the database with various types of permissions.
 * This includes basic, CRUD, advanced, and special permissions. The class ensures that permissions
 * are created only if they do not already exist, and it handles the caching of permissions as well.
 */
class PermissionSeeder extends Seeder
{
    use WithoutModelEvents;

    private $basicActions = ['viewAny'];
    private $crudActions = ['create', 'read', 'update', 'delete'];
    private $advancedActions = ['list', 'restore', 'force-delete', 'export', 'import', 'reorder'];
    private $specialPermissions = [
        'access-filament',
        'access-jetstream',
        'access-horizon',
        'access-telescope',
        'manage-settings',
        'manage-general-settings',
        'manage-integration-settings',
        'manage-discord-settings',
        'manage-fourthwall-settings',
        'manage-twitch-settings',
        'view-analytics',
        'view-settings',
        'is-admin',
        'is-super-admin',
        'is-moderator',
    ];

    /**
     * Run the database seeds.
     * @throws BindingResolutionException
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create basic permissions
        $this->createBasicPermissions();

        // Create specialty permissions
        $this->createSpecialPermissions();

        // Create permissions dynamically based on models
        $this->generatePermissions();

        // Re-cache permissions
        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * Create basic permissions.
     */
    private function createBasicPermissions(): void
    {
        // Loop through each basic action and create a permission for it
        foreach (array_chunk($this->basicActions, 10) as $actionChunk) {
            foreach ($actionChunk as $action) {
                // Use firstOrCreate to ensure permissions are only created if they don't exist
                $createdPermission = Permission::firstOrCreate(['name' => $action, 'guard_name' => 'web']);

                // Log whether the permission was created or already existed
                if ($createdPermission->wasRecentlyCreated) {
                    $this->command->info("Basic permission created: {$action}");
                } else {
                    $this->command->comment("Basic permission already exists: {$action}, skipping");
                }
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }
    }

    /**
     * Create specialty permissions.
     */
    private function createSpecialPermissions(): void
    {
        if (empty($this->specialPermissions)) {
            $this->command->warn('No special permissions found to create.');
            return;
        }

        foreach (array_chunk($this->specialPermissions, 10) as $permissionChunk) {
            foreach ($this->specialPermissions as $permission) {
                $createdPermission = Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);

                if ($createdPermission->wasRecentlyCreated) {
                    $this->command->info("Special permission created: {$permission}");
                } else {
                    $this->command->comment("Special permission already exists: {$permission}, skipping");
                }
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }
    }

    /**
     * Generate permissions for the application based on models.
     *
     * @return bool True if the permissions were generated successfully, false otherwise.
     */
    private function generatePermissions(): bool
    {
        // Create CRUD permissions for each type of object, e.g. 'users', 'posts', 'comments'
        try {
            // Get all models with the IsPermissible trait
            $models = ModelUtility::getModelsByTrait('App\Traits\IsPermissible');

            // If no models are found, output a warning and return false
            if (empty($models)) {
                $this->command->warn('No models found with the IsPermissible trait.');
                return false;
            }

            // Count models and output for logging
            $this->command->info('Found ' . count($models) . ' models with the IsPermissible trait');

            // Loop through the models and add them to the objects array
            foreach ($models as $model) {
                // Format the model name for the permission
                $modelName = ModelUtility::getNameForPermission($model);
                $modelName = strtolower(str_replace(' ', '-', trim($modelName)));  // Normalize the model name

                // Create CRUD permissions for the model
                $this->createCrudPermissions($modelName);

                // Create advanced permissions for the model
                $this->createAdvancedPermissions($modelName);
            }

            // Create permissions for the permissions model
            $this->createCrudPermissions('permission');

            // Create advanced permissions for the permissions model
            $this->createAdvancedPermissions('permission');

            return true;
        } catch (\Exception $e) {
            // Log the exception for debugging
            $this->command->error('Error while generating permissions: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Create a permission for each CRUD operation.
     *
     * @param string $object
     * @return void
     * @example $this->createCrudPermissions('user');
     */
    private function createCrudPermissions(string $object): void
    {
        // Loop through each CRUD action and create a permission for it
        foreach ($this->crudActions as $action) {
            $permissionName = "{$action}-{$object}";

            // Use firstOrCreate to ensure permissions are only created if they don't exist
            $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);

            // Log whether the permission was created or already existed
            if ($permission->wasRecentlyCreated) {
                $this->command->info("Permission created: {$permissionName}");
            } else {
                $this->command->comment("Permission already exists: {$permissionName}, skipping");
            }
        }
    }

    /**
     * Create advanced permissions for each object.
     *
     * @param string $object
     * @return void
     * @example $this->createAdvancedPermissions('user');
     */
    private function createAdvancedPermissions(string $object): void
    {
        // Loop through each advanced action and create a permission for it
        foreach ($this->advancedActions as $action) {
            $permissionName = "{$action}-{$object}";

            // Use firstOrCreate to ensure permissions are only created if they don't exist
            $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);

            // Log whether the permission was created or already existed
            if ($permission->wasRecentlyCreated) {
                $this->command->info("Permission created: {$permissionName}");
            } else {
                $this->command->comment("Permission already exists: {$permissionName}, skipping");
            }
        }
    }
}
