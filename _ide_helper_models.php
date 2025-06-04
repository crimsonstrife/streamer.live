<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $provider_id
     * @property string $provider
     * @property string $name
     * @property string $slug
     * @property string|null $description
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\Product> $products
     * @property-read int|null $products_count
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereDescription($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereProvider($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereProviderId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereSlug($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Collection whereUpdatedAt($value)
     * @mixin \Eloquent
     */
    class Collection extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereUpdatedAt($value)
     * @mixin \Eloquent
     */
    class Event extends \Eloquent implements \Guava\Calendar\Contracts\Eventable
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string|null $name
     * @property string|null $email
     * @property string|null $ip_address
     * @property string|null $user_agent
     * @property bool $is_spammer
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property \Illuminate\Support\Carbon|null $deleted_at
     * @property int|null $deleted_by
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BlogObjects\Reaction> $reactions
     * @property-read int|null $reactions_count
     * @method static Builder<static>|AuthObjects\Guest createOrUpdate(\App\Data\GuestData $data)
     * @method static Builder<static>|AuthObjects\Guest newModelQuery()
     * @method static Builder<static>|AuthObjects\Guest newQuery()
     * @method static Builder<static>|AuthObjects\Guest onlyTrashed()
     * @method static Builder<static>|AuthObjects\Guest query()
     * @method static Builder<static>|AuthObjects\Guest whereCreatedAt($value)
     * @method static Builder<static>|AuthObjects\Guest whereDeletedAt($value)
     * @method static Builder<static>|AuthObjects\Guest whereDeletedBy($value)
     * @method static Builder<static>|AuthObjects\Guest whereEmail($value)
     * @method static Builder<static>|AuthObjects\Guest whereId($value)
     * @method static Builder<static>|AuthObjects\Guest whereIpAddress($value)
     * @method static Builder<static>|AuthObjects\Guest whereIsSpammer($value)
     * @method static Builder<static>|AuthObjects\Guest whereName($value)
     * @method static Builder<static>|AuthObjects\Guest whereUpdatedAt($value)
     * @method static Builder<static>|AuthObjects\Guest whereUserAgent($value)
     * @method static Builder<static>|AuthObjects\Guest withTrashed()
     * @method static Builder<static>|AuthObjects\Guest withoutTrashed()
     * @mixin \Eloquent
     */
    class Guest extends \Eloquent implements \App\Contracts\CommenterContract
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property int|null $blog_author_id
     * @property int|null $blog_category_id
     * @property string $title
     * @property string $slug
     * @property string|null $excerpt
     * @property string|null $banner
     * @property string $content
     * @property \Illuminate\Support\Carbon|null $published_at
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read mixed $banner_url
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \LakM\Comments\Models\Comment> $comments
     * @property-read int|null $comments_count
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BlogObjects\Reaction> $reactions
     * @property-read int|null $reactions_count
     * @property \Illuminate\Database\Eloquent\Collection<int, \Spatie\Tags\Tag> $tags
     * @property-read int|null $tags_count
     * @method static Builder<static>|BlogObjects\Post draft()
     * @method static Builder<static>|BlogObjects\Post newModelQuery()
     * @method static Builder<static>|BlogObjects\Post newQuery()
     * @method static Builder<static>|BlogObjects\Post published()
     * @method static Builder<static>|BlogObjects\Post query()
     * @method static Builder<static>|BlogObjects\Post whereBanner($value)
     * @method static Builder<static>|BlogObjects\Post whereBlogAuthorId($value)
     * @method static Builder<static>|BlogObjects\Post whereBlogCategoryId($value)
     * @method static Builder<static>|BlogObjects\Post whereContent($value)
     * @method static Builder<static>|BlogObjects\Post whereCreatedAt($value)
     * @method static Builder<static>|BlogObjects\Post whereExcerpt($value)
     * @method static Builder<static>|BlogObjects\Post whereId($value)
     * @method static Builder<static>|BlogObjects\Post wherePublishedAt($value)
     * @method static Builder<static>|BlogObjects\Post whereSlug($value)
     * @method static Builder<static>|BlogObjects\Post whereTitle($value)
     * @method static Builder<static>|BlogObjects\Post whereUpdatedAt($value)
     * @method static Builder<static>|BlogObjects\Post withAllTags(\ArrayAccess|\Spatie\Tags\Tag|array|string $tags, ?string $type = null)
     * @method static Builder<static>|BlogObjects\Post withAllTagsOfAnyType($tags)
     * @method static Builder<static>|BlogObjects\Post withAnyTags(\ArrayAccess|\Spatie\Tags\Tag|array|string $tags, ?string $type = null)
     * @method static Builder<static>|BlogObjects\Post withAnyTagsOfAnyType($tags)
     * @method static Builder<static>|BlogObjects\Post withAnyTagsOfType(array|string $type)
     * @method static Builder<static>|BlogObjects\Post withoutTags(\ArrayAccess|\Spatie\Tags\Tag|array|string $tags, ?string $type = null)
     * @mixin \Eloquent
     */
    class Post extends \Eloquent implements \App\Contracts\CommentableContract
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $provider_id
     * @property string $provider
     * @property string $name
     * @property string $slug
     * @property string|null $description
     * @property string|null $state
     * @property string|null $access
     * @property numeric $price
     * @property numeric|null $compare_at_price
     * @property string|null $external_url
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\Collection> $collections
     * @property-read int|null $collections_count
     * @property-read string $primary_image_url
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\ProductImage> $images
     * @property-read int|null $images_count
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\ProductVariant> $variants
     * @property-read int|null $variants_count
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereAccess($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereCompareAtPrice($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereDescription($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereExternalUrl($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product wherePrice($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereProvider($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereProviderId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereSlug($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereState($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\Product whereUpdatedAt($value)
     * @mixin \Eloquent
     */
    class Product extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property int|null $product_id
     * @property int|null $variant_id
     * @property string|null $provider_id
     * @property string $url
     * @property string|null $local_path
     * @property int|null $width
     * @property int|null $height
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read string $image_url
     * @property-read \App\Models\StoreObjects\Product|null $product
     * @property-read \App\Models\StoreObjects\ProductVariant|null $variant
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereHeight($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereLocalPath($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereProductId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereProviderId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereUrl($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereVariantId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductImage whereWidth($value)
     * @mixin \Eloquent
     */
    class ProductImage extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $provider_id
     * @property int $product_id
     * @property string $name
     * @property string|null $sku
     * @property numeric $price
     * @property numeric|null $compare_at_price
     * @property string|null $stock_status
     * @property int $stock_count
     * @property int|null $weight
     * @property string|null $weight_unit
     * @property int|null $length
     * @property int|null $width
     * @property int|null $height
     * @property string|null $dimension_unit
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StoreObjects\ProductImage> $images
     * @property-read int|null $images_count
     * @property-read \App\Models\StoreObjects\Product $product
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereCompareAtPrice($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereDimensionUnit($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereHeight($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereLength($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant wherePrice($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereProductId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereProviderId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereSku($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereStockCount($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereStockStatus($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereWeight($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereWeightUnit($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|StoreObjects\ProductVariant whereWidth($value)
     * @mixin \Eloquent
     */
    class ProductVariant extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     * Class Reaction
     *
     * This class represents a reaction model that can be associated with various entities in the application.
     * It supports polymorphic relationships for the owner and the re-actable entities.
     *
     * @package App\Models
     * @property int $id
     * @property string $owner_type
     * @property int $owner_id
     * @property string $reactable_type
     * @property int $reactable_id
     * @property ReactionType $type
     * @property int $point_value
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $owner
     * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $reactable
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereOwnerId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereOwnerType($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction wherePointValue($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereReactableId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereReactableType($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereType($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|BlogObjects\Reaction whereUpdatedAt($value)
     * @mixin \Eloquent
     */
    class Reaction extends \Eloquent
    {
    }
}

namespace App\Models{
    /**
     *
     *
     * @property int $id
     * @property string $username
     * @property string|null $first_name
     * @property string|null $last_name
     * @property string $display_name
     * @property string $email
     * @property \Illuminate\Support\Carbon|null $email_verified_at
     * @property \Illuminate\Support\Carbon $birthdate
     * @property string|null $pronouns
     * @property string|null $location
     * @property string $password
     * @property string|null $two_factor_secret
     * @property string|null $two_factor_recovery_codes
     * @property string|null $two_factor_confirmed_at
     * @property string|null $remember_token
     * @property int|null $current_team_id
     * @property string|null $profile_photo_path
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @property string|null $custom_fields
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \Mchev\Banhammer\Models\Ban> $bans
     * @property-read int|null $bans_count
     * @property-read string $filament_banhammer_title
     * @property-read string|null $full_name
     * @property-read string $name
     * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
     * @property-read int|null $notifications_count
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
     * @property-read int|null $permissions_count
     * @property-read string $profile_photo_url
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
     * @property-read int|null $roles_count
     * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
     * @property-read int|null $tokens_count
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User banned(bool $banned = true)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User bannedByType(string $className)
     * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User newModelQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User newQuery()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User notBanned()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User permission($permissions, $without = false)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User query()
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User role($roles, $guard = null, $without = false)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereBansMeta(string $key, $value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereBirthdate($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereCurrentTeamId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereCustomFields($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereDisplayName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereEmail($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereEmailVerifiedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereFirstName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereLastName($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereLocation($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User wherePassword($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereProfilePhotoPath($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User wherePronouns($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereRememberToken($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereTwoFactorConfirmedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereTwoFactorRecoveryCodes($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereTwoFactorSecret($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User whereUsername($value)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User withoutPermission($permissions)
     * @method static \Illuminate\Database\Eloquent\Builder<static>|AuthObjects\User withoutRole($roles, $guard = null)
     * @mixin \Eloquent
     */
    class User extends \Eloquent implements \Filament\Models\Contracts\HasAvatar
    {
    }
}
