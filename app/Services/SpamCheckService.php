<?php

namespace App\Services;

use App\Models\Comment;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\Log;
use nickurt\Akismet\Facade as Akismet;
use nickurt\Akismet\Rules\AkismetRule;
use nickurt\StopForumSpam\Rules\IsSpamEmail;
use nickurt\StopForumSpam\Rules\IsSpamUsername;

class SpamCheckService
{
    /**
     * Returns an integer “spam score”: 1 for spam, 0 for ham.
     * could extend this to include StopForumSpam lookups
     * or counts of suspicious keywords/links.
     *
     * @throws Exception
     */
    public function getScore(Comment $comment): int
    {
        // Based on Akismet
        $score = $this->checkAkismet($comment) ? 1 : 0;
        // Based on StopForumSpam
        $score += $this->checkStopForumSpam($comment) ? 2 : 0;  // +2 if SFS flags it
        // Additional heuristics
        $score += substr_count($comment->text, 'http');  // +1 per link

        return $score;
    }

    /**
     * @throws Exception
     */
    public function isSpam(Comment $comment): bool
    {
        // Akismet and StopForumSpam are used to regularly check a commenters username and email for known spammers, i.e. re-checking at each comment
        $akismetResult = $this->checkAkismet($comment);
        $stopSpamResult = $this->checkStopForumSpam($comment);

        // TODO: Add message evaluation

        // TODO: Add any other evaluations

        return $akismetResult && $stopSpamResult;
    }

    /**
     * @throws BindingResolutionException
     */
    public function checkStopForumSpam(Comment $comment): bool
    {
        // Get the Email from the Commenting User
        $commentingID = $comment->commented_by_id;
        $commentingType = $comment->commented_by_type;

        $modelInstance = resolve(str_replace('/', '\\', $commentingType))->find($commentingID);

        $email = $modelInstance->email;
        $username = $modelInstance->username;

        $validator = validator()->make(request()->all(), [
            'email' => ['required', new IsSpamEmail(10)],
            'username' => ['required', new IsSpamUsername(10)],
        ]);

        if ($validator->fails()) {
            return true;
        }

        return $validator->passes();
    }

    /**
     * Returns true if Akismet considers this comment to be spam.
     *
     * @throws Exception
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
                request()->input($email), request()->input($username)
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
