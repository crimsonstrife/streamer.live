<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class SocialSettings extends Settings
{
    public ?string $social_twitter_handle;
    public ?string $social_linkedin_handle;
    public ?string $social_youtube_handle;
    public ?string $social_twitch_handle;
    public ?string $social_tiktok_handle;
    public ?string $social_facebook_handle;
    public ?string $social_bluesky_handle;
    public ?string $social_kick_handle;
    public ?string $social_instagram_handle;
    public ?string $social_threads_handle;
    public ?string $social_github_handle;
    public ?string $social_gitlab_handle;
    public ?string $social_discord_invite;
    public ?string $social_reddit_handle;
    public ?string $social_mastodon_handle;
    public ?string $social_pinterest_handle;
    public ?string $social_snapchat_handle;
    public ?string $social_tumblr_handle;
    public ?string $social_medium_handle;
    public ?string $social_dribbble_handle;
    public ?string $social_behance_handle;
    public ?string $social_stackoverflow_handle;
    public ?string $social_patreon_handle;
    public ?string $social_kofi_handle;
    public ?string $social_soundcloud_handle;
    public ?string $social_spotify_handle;

    public static function group(): string
    {
        return 'social';
    }
}
