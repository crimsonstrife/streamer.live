<?php

namespace App\Services\Social;

use App\Contracts\SocialPostResult;
use App\Contracts\SocialPoster;
use App\Models\StreamSocialAccount;
use RuntimeException;

class BlueskyPoster implements SocialPoster
{
    public function post(StreamSocialAccount $account, string $text, array $context = []): SocialPostResult
    {
        throw new RuntimeException('BlueskyPoster not implemented yet.');
    }
}
