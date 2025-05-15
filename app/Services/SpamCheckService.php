<?php

namespace App\Services;

use App\Contracts\SpamEvaluator;
use App\Models\Comment;
use App\Models\SpamFilterPattern;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\Log;
use nickurt\Akismet\Facade as Akismet;
use nickurt\Akismet\Rules\AkismetRule;
use nickurt\StopForumSpam\Rules\IsSpamEmail;
use nickurt\StopForumSpam\Rules\IsSpamUsername;
use RuntimeException;

class SpamCheckService
{
    /**
     * @param  SpamEvaluator[]  $evaluators
     */
    public function __construct(protected array $evaluators)
    {
    }

    public function getScore(Comment $comment): int
    {
        $total = 0;
        foreach ($this->evaluators as $eval) {
            $total += $eval->evaluate($comment);
        }

        return $total;
    }

    public function isSpam(Comment $comment): bool
    {
        // pick a threshold—e.g. 5 points or more is “spam”
        return $this->getScore($comment) >= 5;
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

    /**
     * @throws Exception
     */
    public function checkWordBlacklists(Comment $comment): bool
    {
        // Load all patterns once
        $patterns = SpamFilterPattern::pluck('pattern');

        // Get Comment text
        $text = $comment->text;

        foreach ($patterns as $regex) {
            $ok = @preg_match("#{$regex}#i", $text);
            if ($ok === false) {
                throw new RuntimeException("Invalid regex: /{$regex}/");
            }
            if ($ok === 1) {
                return true;
            }
        }

        return false;
    }

    /**
     * Count how many distinct patterns match the given text.
     *
     * @throws Exception
     */
    public function countBlacklistMatches(string $text): int
    {
        // load all patterns once
        $patterns = SpamFilterPattern::pluck('pattern');

        $matches = 0;

        foreach ($patterns as $regex) {
            $ok = @preg_match("#{$regex}#i", $text);
            if ($ok === false) {
                throw new RuntimeException("Invalid spam regex: /{$regex}/");
            }
            if ($ok === 1) {
                $matches++;
            }
        }

        return $matches;
    }
}
