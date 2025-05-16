<?php

namespace App\Services\Spam;

use App\Models\Comment;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\Log;
use nickurt\Akismet\Rules\AkismetRule;

class AkismentSpamService
{
    public function __construct()
    {
    }

    /**
     * Returns true if Akismet considers this comment to be spam.
     *
     * @throws Exception|BindingResolutionException
     */
    public function checkAkismet(Comment $comment): bool
    {
        // Check if the Akismet API_KEY is provided
        $hasAPIKey = empty(config('akismet.api_key'));

        if (! $hasAPIKey) {
            // Get the Email from the Commenting User
            $commentingID = $comment->commented_by_id;
            $commentingType = $comment->commented_by_type;

            $modelInstance = resolve(str_replace('/', '\\', $commentingType))->find($commentingID);

            $email = $modelInstance->email;
            $username = $modelInstance->username;

            $validator = validator()->make(['akismet' => 'akismet'], ['akismet' => [new AkismetRule(
                request()->input($email),
                request()->input($username)
            )]]);

            if ($validator->fails()) {
                return true;
            }

            return $validator->passes();
        }

        // The API key is not setup, so we cannot run Akisment, log an error and return false.
        Log::error('Akismet API KEY is not configured, skipping Akismet check.');

        return false;
    }
}
