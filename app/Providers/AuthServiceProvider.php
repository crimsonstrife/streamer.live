<?php

namespace App\Providers;

use App\Models\PermissionGroup;
use App\Models\PermissionSet;
use App\Models\Role;
use App\Models\User;
use App\Policies\PermissionGroupPolicy;
use App\Policies\PermissionPolicy;
use App\Policies\PermissionSetPolicy;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Spatie\Permission\Models\Permission;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        User::class => UserPolicy::class,
        Role::class => RolePolicy::class,
        Permission::class => PermissionPolicy::class,
        PermissionSet::class => PermissionSetPolicy::class,
        PermissionGroup::class => PermissionGroupPolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->register();
        $this->registerPolicies();
    }
}
