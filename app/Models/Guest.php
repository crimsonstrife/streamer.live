<?php

namespace App\Models;

use App\Contracts\CommenterContract;
use App\Traits\CanComment;
use App\Data\GuestData;
use App\Facades\SecureGuestMode;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Guest extends Authenticatable implements CommenterContract
{
    use SoftDeletes;
    use CanComment;

    protected $table = 'guests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'ip_address',
        'user_agent',
        'is_spammer',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_spammer' => 'bool',
        'deleted_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the comments for the guest.
     *
     * @return MorphMany
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commenter');
    }

    /**
     * Get the replies for the guest.
     *
     * @return HasMany
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'reply_id');
    }

    /**
     * Get the profile URL for the guest.
     *
     * @return false|string
     */
    public function profileUrl(): false|string
    {
        return false;
    }

    /**
     * Get the photo URL for the guest.
     *
     * @return string
     */
    public function photoUrl(): string
    {
        return '';
    }

    /**
     * Get the name of the guest.
     *
     * @return string
     */
    public function name(): string
    {
        return $this->name ?? 'Guest'; // Return 'Guest' if the name is not set
    }

    /**
     * Get the email of the guest.
     *
     * @return string
     */
    public function email(): string
    {
        return $this->email ?? '';
    }

    public function scopeCreateOrUpdate(Builder $builder, GuestData $data): Model
    {
        if (SecureGuestMode::enabled()) {
            return SecureGuestMode::user();
        }

        return self::query()
            ->updateOrCreate(
                ['ip_address' => request()->ip()],
                $data->toArray(),
            );
    }
}
