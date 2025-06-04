<?php

namespace App\Contracts;

use BackedEnum;
use Spatie\Permission\Contracts\Role as SpatieRole;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Exceptions\RoleDoesNotExist;

/**
 * @property int|string $id
 * @property string $name
 * @property string|null $guard_name
 *
 * @mixin \App\Models\Role
 *
 * @phpstan-require-extends \App\Models\Role
 */
interface Role extends SpatieRole
{
    /**
     * A role may be given various permissions.
     */
    public function permissions(): BelongsToMany;

    /**
     * Find a role by its name and guard name.
     *
     *
     * @throws RoleDoesNotExist
     */
    public static function findByName(string $name, ?string $guardName): self;

    /**
     * Find a role by its id and guard name.
     *
     *
     * @throws RoleDoesNotExist
     */
    public static function findById(int|string $id, ?string $guardName): self;

    /**
     * Find or create a role by its name and guard name.
     */
    public static function findOrCreate(string $name, ?string $guardName): self;

    /**
     * Determine if the user may perform the given permission.
     *
     * @param  string|int|Permission|BackedEnum  $permission
     */
    public function hasPermissionTo($permission, ?string $guardName): bool;
}
