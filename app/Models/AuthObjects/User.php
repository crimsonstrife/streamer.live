<?php

namespace App\Models\AuthObjects;

use App\Models\BlogObjects\Author;
use App\Traits\HasAdvancedPermissions;
use App\Traits\IsPermissible;
use Database\Factories\AuthObjects\UserFactory;
use Filament\Models\Contracts\HasAvatar;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;
use Mchev\Banhammer\Models\Ban;
use Mchev\Banhammer\Traits\Bannable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property string $username
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string $display_name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property Carbon $birthdate
 * @property string|null $pronouns
 * @property string|null $location
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property string|null $profile_photo_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $custom_fields
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Ban> $bans
 * @property-read int|null $bans_count
 * @property-read string $filament_banhammer_title
 * @property-read string|null $full_name
 * @property-read string $name
 * @property-read DatabaseNotificationCollection<int, DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read string $profile_photo_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User banned(bool $banned = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User bannedByType(string $className)
 * @method static UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User notBanned()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBansMeta(string $key, $value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBirthdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCurrentTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCustomFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfilePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePronouns($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 *
 * @mixin \Eloquent
 */
#[\AllowDynamicProperties]
class User extends Authenticatable implements HasAvatar
{
    use Bannable;
    use HasAdvancedPermissions, HasRoles {
        HasAdvancedPermissions::permissions insteadof HasRoles;
        HasAdvancedPermissions::hasPermissionTo insteadof HasRoles;
    }

    use HasApiTokens;

    /** @use HasFactory<UserFactory> */
    use HasFactory;
    use HasProfilePhoto;
    use IsPermissible;
    use Notifiable;
    use SoftDeletes;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'display_name',
        'name',
        'email',
        'password',
        'birthdate',
        'pronouns',
        'location',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'birthdate' => 'date',
        'email_verified_at' => 'datetime',
        'pronouns' => 'string',
        'twitch_user_expires_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the URL for the user's Filament avatar.
     *
     * @return string|null The URL of the Filament avatar, or null if not set.
     */
    public function getFilamentAvatarUrl(): ?string
    {
        return $this->profile_photo_url;
    }

    /**
     * Get the title attribute for the Filament Banhammer.
     */
    public function getFilamentBanhammerTitleAttribute(): string
    {
        return $this->getNameAttribute();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'display_name' => 'string',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's full name.
     *
     * @return string The user's full name.
     */
    public function getFullNameAttribute(): string
    {
        $full = trim("{$this->first_name} {$this->last_name}");

        return $full !== '' ? $full : $this->username;
    }

    /**
     * Get the user's display name.
     *
     * @return Attribute The user's display name.
     */
    protected function displayName(): Attribute
    {
        return Attribute::get(
            fn ($value, $attributes) => $value ?: ($attributes['username'] ?? 'Unknown')
        );
    }

    /**
     * Get the user's name.
     *
     * @return string The user's name.
     */
    protected function getNameAttribute(): string
    {
        return $this->display_name
            ?? trim(($this->first_name ?? '') . ' ' . ($this->last_name ?? ''))
            ?: ($this->username ?? 'Unknown');
    }

    /**
     * Get the user's first name.
     *
     * @return string|null The first name of the user.
     */
    public function getFirstNameAttribute(): ?string
    {
        return $this->first_name ?? null;
    }

    /**
     * Get the user's last name.
     *
     * @return string|null The user's last name.
     */
    public function getLastNameAttribute(): ?string
    {
        return $this->last_name ?? null;
    }

    public function blogAuthor(): HasOne
    {
        return $this->hasOne(Author::class);
    }

    public function getTwitchToken(): ?string
    {
        if ($this->twitch_user_token && now()->lt($this->twitch_user_expires_at)) {
            return $this->twitch_user_token;
        }

        return null;
    }
}
