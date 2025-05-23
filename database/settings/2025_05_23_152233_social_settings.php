<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('social.social_twitter_handle', null);
        $this->migrator->add('social.social_linkedin_handle', null);
        $this->migrator->add('social.social_youtube_handle', null);
        $this->migrator->add('social.social_twitch_handle', null);
        $this->migrator->add('social.social_tiktok_handle', null);
        $this->migrator->add('social.social_facebook_handle', null);
        $this->migrator->add('social.social_bluesky_handle', null);
        $this->migrator->add('social.social_kick_handle', null);
        $this->migrator->add('social.social_instagram_handle', null);
        $this->migrator->add('social.social_threads_handle', null);
        $this->migrator->add('social.social_github_handle', null);
        $this->migrator->add('social.social_gitlab_handle', null);
        $this->migrator->add('social.social_discord_invite', null);
        $this->migrator->add('social.social_reddit_handle', null);
        $this->migrator->add('social.social_mastodon_handle', null);
        $this->migrator->add('social.social_pinterest_handle', null);
        $this->migrator->add('social.social_snapchat_handle', null);
        $this->migrator->add('social.social_tumblr_handle', null);
        $this->migrator->add('social.social_medium_handle', null);
        $this->migrator->add('social.social_dribbble_handle', null);
        $this->migrator->add('social.social_behance_handle', null);
        $this->migrator->add('social.social_stackoverflow_handle', null);
        $this->migrator->add('social.social_patreon_handle', null);
        $this->migrator->add('social.social_kofi_handle', null);
        $this->migrator->add('social.social_soundcloud_handle', null);
        $this->migrator->add('social.social_spotify_handle', null);
    }

    public function down(): void
    {
        $this->migrator->delete('social.social_twitter_handle');
        $this->migrator->delete('social.social_linkedin_handle');
        $this->migrator->delete('social.social_youtube_handle');
        $this->migrator->delete('social.social_twitch_handle');
        $this->migrator->delete('social.social_tiktok_handle');
        $this->migrator->delete('social.social_facebook_handle');
        $this->migrator->delete('social.social_bluesky_handle');
        $this->migrator->delete('social.social_kick_handle');
        $this->migrator->delete('social.social_instagram_handle');
        $this->migrator->delete('social.social_threads_handle');
        $this->migrator->delete('social.social_github_handle');
        $this->migrator->delete('social.social_gitlab_handle');
        $this->migrator->delete('social.social_discord_invite');
        $this->migrator->delete('social.social_reddit_handle');
        $this->migrator->delete('social.social_mastodon_handle');
        $this->migrator->delete('social.social_pinterest_handle');
        $this->migrator->delete('social.social_snapchat_handle');
        $this->migrator->delete('social.social_tumblr_handle');
        $this->migrator->delete('social.social_medium_handle');
        $this->migrator->delete('social.social_dribbble_handle');
        $this->migrator->delete('social.social_behance_handle');
        $this->migrator->delete('social.social_stackoverflow_handle');
        $this->migrator->delete('social.social_patreon_handle');
        $this->migrator->delete('social.social_kofi_handle');
        $this->migrator->delete('social.social_soundcloud_handle');
        $this->migrator->delete('social.social_spotify_handle');
    }
};
