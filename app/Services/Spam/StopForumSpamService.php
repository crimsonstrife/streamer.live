<?php

namespace App\Services\Spam;

use App\Models\BlogObjects\Comment;
use Illuminate\Contracts\Container\BindingResolutionException;
use nickurt\StopForumSpam\Rules\IsSpamEmail;
use nickurt\StopForumSpam\Rules\IsSpamUsername;

class StopForumSpamService
{
    public function __construct()
    {
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
}
