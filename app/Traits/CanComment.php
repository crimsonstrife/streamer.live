<?php

namespace App\Traits;

use App\Models\Comment;
use App\Models\Reply;
use App\Traits\HasReactions;
use App\Traits\HasOwnerAvatar as HasProfilePhoto;
use App\Utilities\ModelResolver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin Model
 */
trait CanComment
{
    use HasProfilePhoto;
    use HasReactions;

    /** @return MorphMany<Comment> */
    public function comments(): MorphMany
    {
        return $this->morphMany(ModelResolver::commentClass(), 'commented_by');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class);
    }

    public function profileUrl(): false|string
    {
        if (is_null($url = config('comments.profile_url_column'))) {
            return false;
        }

        return $this->{$url};
    }

    public function photoUrl(): string
    {
        return $this->ownerPhotoUrl();
    }

    public function name(): string
    {
        return $this->{config('comments.user_name_column')};
    }

    public function email(): string
    {
        return $this->{config('comments.user_email_column')};
    }
}
