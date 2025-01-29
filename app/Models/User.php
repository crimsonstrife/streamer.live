<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
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

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasRole('Admin') || $this->hasPermissionTo('access ' . $panel::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's name.
     *
     * This accessor method is meant to serve as a fallback accessor for packages that may expect a hardcoded `name` attribute.
     * It acts as an alias for the display name attribute.
     *
     * @return string The user's name.
     */
    public function getNameAttribute(): string
    {
        return $this->getDisplayNameAttribute();
    }

    /**
     * Get the user's full name.
     *
     * This accessor concatenates the user's first name and last name,
     * trims any surrounding whitespace, and returns the full name as a string.
     *
     * @return string The user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    /**
     * Get the display name attribute for the user.
     *
     * This method returns the user's display name, which is determined by the following order of precedence:
     * 1. Username
     * 2. Full name
     * 3. Email
     *
     * @return string The display name of the user.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->username ?: $this->full_name ?: $this->email;
    }

    /**
     * Get the support roles a user has.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function supporterRoles(): BelongsToMany
    {
        return $this->belongsToMany(SupporterRole::class, 'user_supporter_roles')->withTimestamps();
    }

    /**
     * Get the collection of perks associated with the user.
     *
     * @return \Illuminate\Support\Collection
     */
    public function perks(): Collection
    {
        return $this->supporterRoles()->with('perks')->get()->pluck('perks')->flatten();
    }
}
