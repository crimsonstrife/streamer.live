<?php

namespace App\Services\Factories;

use App\Enums\StreamSocialPlatform;
use App\Contracts\SocialPoster;
use App\Services\Social\BlueskyPoster;
use App\Services\Social\XPoster;
use InvalidArgumentException;

class SocialPosterFactory
{
    public function make(StreamSocialPlatform $platform): SocialPoster
    {
        return match ($platform) {
            StreamSocialPlatform::X => app(XPoster::class),
            StreamSocialPlatform::Bluesky => app(BlueskyPoster::class),
            default => throw new InvalidArgumentException("Unsupported platform: {$platform->value}"),
        };
    }
}
