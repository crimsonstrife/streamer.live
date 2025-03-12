<?php

namespace App\Utilities;

use App\Contracts\CommentableContract;
use App\Contracts\CommenterContract;
use App\Exceptions\InvalidModelException;
use App\Facades\SecureGuestMode;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Helpers
{
    /**
     * @throws \Throwable
     */
    public static function checkCommentableModelValidity(Model $model): bool
    {
        throw_unless(is_a($model, CommentableContract::class), InvalidModelException::make('Model must use the ' . CommentableContract::class . ' interface'));

        return true;
    }

    /**
     * @throws \Throwable
     */
    public static function checkCommenterModelValidity(Authenticatable $model): bool
    {
        throw_unless(is_a($model, CommenterContract::class), InvalidModelException::make('Model must use the ' . CommenterContract::class . ' interface'));

        return true;
    }

    public static function getAuthGuard(): StatefulGuard
    {
        if (SecureGuestMode::enabled()) {
            return Auth::guard('guest');
        }

        return Auth::guard(Auth::getDefaultDriver());
    }
}
