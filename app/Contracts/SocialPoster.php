<?php

namespace App\Contracts;

use App\Models\StreamSocialAccount;

interface SocialPoster
{
    public function post(StreamSocialAccount $account, string $text, array $context = []): SocialPostResult;
}
