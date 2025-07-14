<?php

namespace App\Providers;

use App\Models\AuthObjects\PermissionGroup;
use App\Models\AuthObjects\PermissionSet;
use App\Models\AuthObjects\Role;
use App\Models\AuthObjects\User;
use App\Models\BlogObjects\Comment;
use App\Models\BlogObjects\Post;
use App\Models\BlogObjects\Reply;
use App\Models\Media;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Order;
use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductVariant;
use App\Policies\CommentPolicy;
use App\Policies\MediaPolicy;
use App\Policies\OrderPolicy;
use App\Policies\PermissionGroupPolicy;
use App\Policies\PermissionPolicy;
use App\Policies\PermissionSetPolicy;
use App\Policies\PostPolicy;
use App\Policies\ProductPolicy;
use App\Policies\ProductVariantPolicy;
use App\Policies\ReplyPolicy;
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
        Post::class => PostPolicy::class,
        Comment::class => CommentPolicy::class,
        Reply::class => ReplyPolicy::class,
        Product::class => ProductPolicy::class,
        ProductVariant::class => ProductVariantPolicy::class,
        Collection::class => CommentPolicy::class,
        Order::class => OrderPolicy::class,
        Media::class => MediaPolicy::class,
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
