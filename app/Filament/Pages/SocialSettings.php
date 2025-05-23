<?php

namespace App\Filament\Pages;

use App\Settings\SocialSettings as Socials;
use App\Filament\Clusters\Settings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class SocialSettings extends SettingsPage
{
    protected static ?string $navigationIcon  = 'fas-hashtag';
    protected static ?string $navigationLabel = 'Social Settings';
    protected static ?string $navigationGroup = 'Settings';
    protected static ?string $cluster         = Settings::class;

    /**
     * The Spatie Settings class that this page edits.
     */
    protected static string $settings = Socials::class;

    public function form(Form $form): Form
    {
        $settings = app(Socials::class);

        return $form
            ->schema([
                // Social handles
                Forms\Components\TextInput::make('social_twitter_handle')
                    ->label('X / Twitter Handle'),
                Forms\Components\TextInput::make('social_linkedin_handle')
                    ->label('LinkedIn Handle'),
                Forms\Components\TextInput::make('social_youtube_handle')
                    ->label('YouTube Handle'),
                Forms\Components\TextInput::make('social_twitch_handle')
                    ->label('Twitch Handle'),
                Forms\Components\TextInput::make('social_tiktok_handle')
                    ->label('TikTok Handle'),
                Forms\Components\TextInput::make('social_facebook_handle')
                    ->label('Facebook Handle'),
                Forms\Components\TextInput::make('social_bluesky_handle')
                    ->label('Bluesky Handle'),
                Forms\Components\TextInput::make('social_kick_handle')
                    ->label('Kick Handle'),
                Forms\Components\TextInput::make('social_instagram_handle')
                    ->label('Instagram Handle'),
                Forms\Components\TextInput::make('social_threads_handle')
                    ->label('Threads Handle'),
                Forms\Components\TextInput::make('social_github_handle')
                    ->label('GitHub Handle'),
                Forms\Components\TextInput::make('social_gitlab_handle')
                    ->label('GitLab Handle'),
                Forms\Components\TextInput::make('social_discord_invite')
                    ->label('Discord Invite Link'),
                Forms\Components\TextInput::make('social_reddit_handle')
                    ->label('Reddit Handle'),
                Forms\Components\TextInput::make('social_mastodon_handle')
                    ->label('Mastodon Handle'),
                Forms\Components\TextInput::make('social_pinterest_handle')
                    ->label('Pinterest Handle'),
                Forms\Components\TextInput::make('social_snapchat_handle')
                    ->label('Snapchat Handle'),
                Forms\Components\TextInput::make('social_tumblr_handle')
                    ->label('Tumblr Handle'),
                Forms\Components\TextInput::make('social_medium_handle')
                    ->label('Medium Handle'),
                Forms\Components\TextInput::make('social_dribbble_handle')
                    ->label('Dribbble Handle'),
                Forms\Components\TextInput::make('social_behance_handle')
                    ->label('Behance Handle'),
                Forms\Components\TextInput::make('social_stackoverflow_handle')
                    ->label('StackOverflow Handle'),
                Forms\Components\TextInput::make('social_patreon_handle')
                    ->label('Patreon Handle'),
                Forms\Components\TextInput::make('social_kofi_handle')
                    ->label('Ko-fi Handle'),
                Forms\Components\TextInput::make('social_soundcloud_handle')
                    ->label('SoundCloud Handle'),
                Forms\Components\TextInput::make('social_spotify_handle')
                    ->label('Spotify Handle'),

                // Display order picker (only shows populated networks)
                Forms\Components\Select::make('social_display_order')
                    ->label('Which social links, and in what order?')
                    ->multiple()
                    ->options(function () use ($settings) {
                        $labels = [
                            'twitter'       => 'X / Twitter',
                            'linkedin'      => 'LinkedIn',
                            'youtube'       => 'YouTube',
                            'twitch'        => 'Twitch',
                            'tiktok'        => 'TikTok',
                            'facebook'      => 'Facebook',
                            'bluesky'       => 'Bluesky',
                            'kick'          => 'Kick',
                            'instagram'     => 'Instagram',
                            'threads'       => 'Threads',
                            'github'        => 'GitHub',
                            'gitlab'        => 'GitLab',
                            'discord'       => 'Discord Invite',
                            'reddit'        => 'Reddit',
                            'mastodon'      => 'Mastodon',
                            'pinterest'     => 'Pinterest',
                            'snapchat'      => 'Snapchat',
                            'tumblr'        => 'Tumblr',
                            'medium'        => 'Medium',
                            'dribbble'      => 'Dribbble',
                            'behance'       => 'Behance',
                            'stackoverflow' => 'StackOverflow',
                            'patreon'       => 'Patreon',
                            'kofi'          => 'Ko-fi',
                            'soundcloud'    => 'SoundCloud',
                            'spotify'       => 'Spotify',
                        ];

                        return collect($labels)
                            ->filter(fn ($_, $key) => filled(
                                $settings->{
                                'social_' . $key . '_' .
                                ($key === 'discord' ? 'invite' : 'handle')
                                }
                            ))
                            ->toArray();
                    })
                    ->default($settings->social_display_order)
                    ->hint('Pick & reorder only the networks you’ve populated.'),
            ]);
    }
}
