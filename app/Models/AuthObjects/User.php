<?php

namespace App\Models\AuthObjects;

use AllowDynamicProperties;
use App\Models\BlogObjects\Author;
use App\Models\SharedObjects\OnboardingProgress;
use App\Traits\HasAdvancedPermissions;
use App\Traits\IsPermissible;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
use Spatie\Onboard\Concerns\GetsOnboarded;
use Spatie\Onboard\Concerns\Onboardable;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasRoles;

/**
 * Class User
 *
 * Represents a user in the application, including authentication, permissions, and onboarding progress.
 *
 * @property int $id The unique identifier for the user.
 * @property string $username The username of the user.
 * @property string|null $first_name The first name of the user.
 * @property string|null $last_name The last name of the user.
 * @property string $display_name The display name of the user.
 * @property string $email The email address of the user.
 * @property Carbon|null $email_verified_at The timestamp when the user's email was verified.
 * @property Carbon $birthdate The birthdate of the user.
 * @property string|null $pronouns The pronouns of the user.
 * @property string|null $location The location of the user.
 * @property string $password The hashed password of the user.
 * @property string|null $two_factor_secret The secret for two-factor authentication.
 * @property string|null $two_factor_recovery_codes The recovery codes for two-factor authentication.
 * @property string|null $two_factor_confirmed_at The timestamp when two-factor authentication was confirmed.
 * @property string|null $remember_token The token used for "remember me" functionality.
 * @property int|null $current_team_id The ID of the user's current team.
 * @property string|null $profile_photo_path The path to the user's profile photo.
 * @property Carbon|null $created_at The timestamp when the user was created.
 * @property Carbon|null $updated_at The timestamp when the user was last updated.
 * @property string|null $custom_fields Custom fields associated with the user.
 * @property-read Collection<int, Ban> $bans The bans associated with the user.
 * @property-read int|null $bans_count The count of bans associated with the user.
 * @property-read string $filament_banhammer_title The title used for the Filament Banhammer.
 * @property-read string|null $full_name The full name of the user.
 * @property-read string $name The name of the user.
 * @property-read DatabaseNotificationCollection<int, DatabaseNotification> $notifications The notifications for the user.
 * @property-read int|null $notifications_count The count of notifications for the user.
 * @property-read Collection<int, Permission> $permissions The permissions assigned to the user.
 * @property-read int|null $permissions_count The count of permissions assigned to the user.
 * @property-read string $profile_photo_url The URL of the user's profile photo.
 * @property-read Collection<int, \Spatie\Permission\Models\Role> $roles The roles assigned to the user.
 * @property-read int|null $roles_count The count of roles assigned to the user.
 * @property-read Collection<int, PersonalAccessToken> $tokens The personal access tokens for the user.
 * @property-read int|null $tokens_count The count of personal access tokens for the user.
 */
#[AllowDynamicProperties]
class User extends Authenticatable implements FilamentUser, HasAvatar, MustVerifyEmail, Onboardable
{
    use Bannable;
    use GetsOnboarded;
    use HasAdvancedPermissions, HasRoles {
        HasAdvancedPermissions::permissions insteadof HasRoles;
        HasAdvancedPermissions::hasPermissionTo insteadof HasRoles;
    }
    use HasApiTokens;
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
     * @var array<string, string>
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
     *
     * @return string The title used for the Filament Banhammer.
     */
    public function getFilamentBanhammerTitleAttribute(): string
    {
        return $this->getNameAttribute();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string> The attributes and their cast types.
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
            ?? trim(($this->first_name ?? '').' '.($this->last_name ?? ''))
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
     * @return string|null The last name of the user.
     */
    public function getLastNameAttribute(): ?string
    {
        return $this->last_name ?? null;
    }

    /**
     * Define a one-to-one relationship with the Author model.
     *
     * @return HasOne The relationship instance.
     */
    public function blogAuthor(): HasOne
    {
        return $this->hasOne(Author::class);
    }

    /**
     * Get the user's Twitch token if it is valid.
     *
     * @return string|null The Twitch token, or null if expired or not set.
     */
    public function getTwitchToken(): ?string
    {
        if ($this->twitch_user_token && now()->lt($this->twitch_user_expires_at)) {
            return $this->twitch_user_token;
        }

        return null;
    }

    /**
     * Check if the user has completed a specific onboarding step.
     *
     * @param  string  $key  The key of the onboarding step.
     * @return bool True if the step is completed, false otherwise.
     */
    public function hasCompletedOnboardingStep(string $key): bool
    {
        return $this->onboardingProgress()
            ->where('step_key', $key)
            ->whereNotNull('completed_at')
            ->exists();
    }

    /**
     * Mark a specific onboarding step as complete for the user.
     *
     * @param  string  $key  The key of the onboarding step.
     */
    public function markOnboardingStepComplete(string $key): void
    {
        $this->onboardingProgress()->updateOrCreate(
            ['step_key' => $key],
            ['completed_at' => now()]
        );
    }

    /**
     * Define a one-to-many relationship with the OnboardingProgress model.
     *
     * @return HasMany The relationship instance.
     */
    public function onboardingProgress(): HasMany
    {
        return $this->hasMany(OnboardingProgress::class);
    }

    /**
     * Check if the user has dismissed the onboarding process.
     *
     * @return bool True if onboarding is dismissed, false otherwise.
     */
    public function hasDismissedOnboarding(): bool
    {
        return $this->onboardingProgress()
            ->where('step_key', 'onboarding.dismissed')
            ->exists();
    }

    /**
     * Dismiss the onboarding process for the user.
     */
    public function dismissOnboarding(): void
    {
        $this->onboardingProgress()->updateOrCreate(
            ['step_key' => 'onboarding.dismissed'],
            ['completed_at' => now()]
        );
    }

    public function isAdmin(): bool
    {
        return $this->can('is-admin');
    }

    public function isSuperAdmin(): bool
    {
        return $this->can('is-super-admin');
    }

    public function isModerator(): bool
    {
        return $this->can('is-moderator');
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isSuperAdmin() || $this->isAdmin() || $this->isModerator() || $this->can('is-panel-user') || $this->can('access-filament');
    }
}
