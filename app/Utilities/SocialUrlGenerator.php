<?php

namespace App\Utilities;

use Illuminate\Support\Str;

class SocialUrlGenerator
{
    protected static array $patterns = [
        'twitter'       => 'https://twitter.com/%s',
        'facebook'      => 'https://facebook.com/%s',
        'instagram'     => 'https://instagram.com/%s',
        'linkedin'      => 'https://linkedin.com/in/%s',
        'youtube'       => 'https://youtube.com/%s',
        'twitch'        => 'https://twitch.tv/%s',
        'tiktok'        => 'https://www.tiktok.com/@%s',
        'bluesky'       => 'https://bsky.app/profile/%s',
        'kick'          => 'https://kick.com/%s',
        'threads'       => 'https://www.threads.net/@%s',
        'github'        => 'https://github.com/%s',
        'gitlab'        => 'https://gitlab.com/%s',
        'discord'       => 'https://discord.gg/%s',
        'reddit'        => 'https://reddit.com/user/%s',
        'mastodon'      => 'https://mastodon.social/@%s',
        'pinterest'     => 'https://pinterest.com/%s',
        'snapchat'      => 'https://snapchat.com/add/%s',
        'tumblr'        => 'https://%s.tumblr.com',
        'medium'        => 'https://medium.com/@%s',
        'dribbble'      => 'https://dribbble.com/%s',
        'behance'       => 'https://behance.net/%s',
        'stackoverflow' => 'https://stackoverflow.com/users/%s',
        'patreon'       => 'https://patreon.com/%s',
        'kofi'          => 'https://ko-fi.com/%s',
        'soundcloud'    => 'https://soundcloud.com/%s',
        'spotify'       => 'https://open.spotify.com/user/%s',
    ];

    /**
     * @param  string  $key    one of the keys in your settings (twitter, discord, etc)
     * @param  string|null  $value  either a handle (with or without leading @) or a full URL
     * @return string|null       fully-qualified URL or null if nothing usable
     */
    public static function url(string $key, ?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        // If they already provided a full URL, just return it
        if (Str::startsWith($value, ['http://', 'https://'])) {
            return $value;
        }

        // Otherwise strip any leading @ or /
        $handle = ltrim($value, '@/');

        // If we have a pattern for this network, apply it
        if (isset(static::$patterns[$key])) {
            return sprintf(static::$patterns[$key], $handle);
        }

        // No pattern → nothing we can do
        return null;
    }
}
