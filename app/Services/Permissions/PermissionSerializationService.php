<?php

namespace App\Services\Permissions;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

/**
 * Handle serialization of permissions for caching.
 */
class PermissionSerializationService
{
    private array $alias = [];

    private array $cachedRoles = [];

    private array $except = [];

    public function __construct(private string $permissionClass, private string $roleClass)
    {
    }

    public function getSerializedPermissions(Collection $permissionsWithRoles): array
    {
        $this->except = config('permission.cache.column_names_except', ['created_at', 'updated_at', 'deleted_at']);

        $permissions = $permissionsWithRoles
            ->map(function ($permission) {
                if (! $this->alias) {
                    $this->aliasModelFields($permission);
                }

                return $this->aliasedArray($permission) + $this->getSerializedRoleRelation($permission);
            })->all();
        $roles = array_values($this->cachedRoles);
        $this->cachedRoles = [];

        return ['alias' => array_flip($this->alias)] + compact('permissions', 'roles');
    }

    public function getHydratedPermissions(array $permissions): Collection
    {
        $permissionInstance = new ($this->permissionClass)();

        return Collection::make(array_map(
            fn ($item) => $permissionInstance->newInstance([], true)
                ->setRawAttributes($this->aliasedArray(array_diff_key($item, ['r' => 0])), true)
                ->setRelation('roles', $this->getHydratedRoleCollection($item['r'] ?? [])),
            $permissions
        ));
    }

    public function hydrateRolesCache(array $roles): void
    {
        $roleInstance = new ($this->roleClass)();

        array_map(function ($item) use ($roleInstance) {
            $role = $roleInstance->newInstance([], true)
                ->setRawAttributes($this->aliasedArray($item), true);
            $this->cachedRoles[$role->getKey()] = $role;
        }, $roles);
    }

    private function getHydratedRoleCollection(array $roles): Collection
    {
        return Collection::make(array_values(
            array_intersect_key($this->cachedRoles, array_flip($roles))
        ));
    }

    private function getSerializedRoleRelation(Permission $permission): array
    {
        if (! $permission->roles->count()) {
            return [];
        }

        if (! isset($this->alias['roles'])) {
            $this->alias['roles'] = 'r';
            $this->aliasModelFields($permission->roles[0]);
        }

        return [
            'r' => $permission->roles->map(function ($role) {
                if (! isset($this->cachedRoles[$role->getKey()])) {
                    $this->cachedRoles[$role->getKey()] = $this->aliasedArray($role);
                }

                return $role->getKey();
            })->all(),
        ];
    }

    private function aliasedArray(Model|array $model): array
    {
        return collect(is_array($model) ? $model : $model->getAttributes())->except($this->except)
            ->keyBy(fn ($value, $key) => $this->alias[$key] ?? $key)
            ->all();
    }

    private function aliasModelFields(object|array $newKeys = []): void
    {
        $i = 0;
        $alphas = ! count($this->alias) ? range('a', 'h') : range('j', 'p');

        $attributes = is_object($newKeys) && method_exists($newKeys, 'getAttributes') ? $newKeys->getAttributes() : $newKeys;

        foreach (array_keys($attributes) as $value) {
            if (! isset($this->alias[$value])) {
                $this->alias[$value] = $alphas[$i++] ?? $value;
            }
        }

        $this->alias = array_diff_key($this->alias, array_flip($this->except));
    }
}
