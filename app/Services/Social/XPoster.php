<?php

namespace App\Services\Social;

use App\Models\StreamSocialAccount;
use App\Contracts\SocialPoster;
use App\Contracts\SocialPostResult;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class XPoster implements SocialPoster
{
    /**
     * @throws RequestException
     * @throws ConnectionException
     */
    public function post(StreamSocialAccount $account, string $text, array $context = []): SocialPostResult
    {
        $token = $account->credentials['user_access_token'] ?? null;

        if (! $token) {
            throw new RuntimeException('X account missing user_access_token.');
        }

        $text = $this->truncate($text, 280);

        $res = Http::withToken($token)
            ->acceptJson()
            ->post('https://api.x.com/2/tweets', ['text' => $text])
            ->throw()
            ->json();

        return new SocialPostResult(
            externalId: $res['data']['id'] ?? null,
            raw: $res,
        );
    }

    private function truncate(string $text, int $max): string
    {
        $text = trim(preg_replace('/\s+/', ' ', $text));
        return mb_strimwidth($text, 0, $max, '…');
    }
}
