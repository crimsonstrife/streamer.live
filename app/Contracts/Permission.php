<?php

namespace App\Contracts;

use Spatie\Permission\Contracts\Permission as SpatiePermission;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

/**
 * @property int|string $id
 * @property string $name
 * @property string|null $guard_name
 *
 * @mixin \App\Models\Permission
 *
 * @phpstan-require-extends \App\Models\Permission
 */
interface Permission extends SpatiePermission
{
    /**
     * A permission can be applied to roles.
     */
    public function roles(): BelongsToMany;

    /**
     * Find a permission by its name.
     *
     *
     * @throws PermissionDoesNotExist
     */
    public static function findByName(string $name, ?string $guardName): self;

    /**
     * Find a permission by its id.
     *
     *
     * @throws PermissionDoesNotExist
     */
    public static function findById(int|string $id, ?string $guardName): self;

    /**
     * Find or Create a permission by its name and guard name.
     */
    public static function findOrCreate(string $name, ?string $guardName): self;
}
