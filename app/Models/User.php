<?php

namespace App\Models;

use Filament\Models\Contracts\HasAvatar;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Mchev\Banhammer\Traits\Bannable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasAvatar
{
    use Bannable;
    use HasApiTokens;
    use HasRoles;
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasApiTokens;
    use HasProfilePhoto;
    use Notifiable;
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
     * @return string
     */
    public function getFilamentBanhammerTitleAttribute()
    {
        return $this->getDisplayNameAttribute();
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
     * Get the user's full name.
     *
     * @return string|null The user's full name.
     */
    public function getFullNameAttribute(): string|null
    {
        return "{$this->first_name} {$this->last_name}" ?? null;
    }

    /**
     * Get the user's display name.
     *
     * @return string The user's display name.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->display_name ?? $this->username;
    }

    /**
     * Get the user's name.
     *
     * @return string The user's name.
     */
    public function getNameAttribute(): string
    {
        return $this->getFullNameAttribute() ?? $this->display_name ?? $this->username;
    }

    /**
     * Get the user's first name.
     *
     * @return string|null The first name of the user.
     */
    public function getFirstNameAttribute(): string|null
    {
        return $this->first_name ?? null;
    }

    /**
     * Get the user's last name.
     *
     * @return string|null The user's last name.
     */
    public function getLastNameAttribute(): string|null
    {
        return $this->last_name ?? null;
    }
}
