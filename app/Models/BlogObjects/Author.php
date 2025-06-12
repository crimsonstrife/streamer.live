<?php

namespace App\Models\BlogObjects;

use App\Models\AuthObjects\User;
use App\Models\BlogObjects\Post;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Stephenjude\FilamentBlog\Models\Author as BaseAuthor;

class Author extends BaseAuthor
{
    use IsPermissible;

    /**
     * @var string
     */
    protected $table = 'blog_authors';

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'photo',
        'bio',
        'user_id',
        'github_handle',
        'twitter_handle',
        'facebook_handle',
        'linkedin_handle',
        'instagram_handle',
        'youtube_handle',
        'tiktok_handle',
        'twitch_handle',
        'discord_handle',
        'kick_handle',
        'snapchat_handle',
        'whatsapp_handle',
        'telegram_handle',
        'signal_handle',
        'slack_handle',
        'reddit_handle',
        'pinterest_handle',
        'tumblr_handle',
        'medium_handle',
        'bluesky_handle',
    ];

    /**
     * @var array<string>
     */
    protected $appends = [
        'photo_url',
    ];

    public function photoUrl(): Attribute
    {
        return Attribute::get(fn () => $this->photo ? asset(Storage::url($this->photo)) : '');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'blog_author_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function biography(): string
    {
        return html_entity_decode($this->bio);
    }
}
