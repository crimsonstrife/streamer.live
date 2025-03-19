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
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Reaction> $reactions
 * @property-read int|null $reactions_count
 * @method static Builder<static>|Guest createOrUpdate(\App\Data\GuestData $data)
 * @method static Builder<static>|Guest newModelQuery()
 * @method static Builder<static>|Guest newQuery()
 * @method static Builder<static>|Guest onlyTrashed()
 * @method static Builder<static>|Guest query()
 * @method static Builder<static>|Guest whereCreatedAt($value)
 * @method static Builder<static>|Guest whereDeletedAt($value)
 * @method static Builder<static>|Guest whereDeletedBy($value)
 * @method static Builder<static>|Guest whereEmail($value)
 * @method static Builder<static>|Guest whereId($value)
 * @method static Builder<static>|Guest whereIpAddress($value)
 * @method static Builder<static>|Guest whereIsSpammer($value)
 * @method static Builder<static>|Guest whereName($value)
 * @method static Builder<static>|Guest whereUpdatedAt($value)
 * @method static Builder<static>|Guest whereUserAgent($value)
 * @method static Builder<static>|Guest withTrashed()
 * @method static Builder<static>|Guest withoutTrashed()
 * @mixin \Eloquent
 */
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
