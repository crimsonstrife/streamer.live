<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use RuntimeException;

class RoleService
{
    /**
     * Attempt to delete a role by its ID.
     *
     * @throws RuntimeException If the role is marked protected.
     * @throws ModelNotFoundException If the role cannot be found.
     */
    public function deleteRole(int|string $roleId): void
    {
        // Find the role (or fail with a 404)
        $role = Role::findOrFail($roleId);

        // Check the “protected” flag
        if ($role->protected) {
            throw new RuntimeException("The '{$role->name}' role is protected and cannot be deleted.");
        }

        // If not protected, delete
        $role->delete();
    }
}
