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
use Illuminate\Support\Str;
use Throwable;

class Helpers
{
    /**
     * @throws Throwable
     */
    public static function checkCommentableModelValidity(Model $model): bool
    {
        throw_unless(is_a($model, CommentableContract::class), InvalidModelException::make('Model must use the '.CommentableContract::class.' interface'));

        return true;
    }

    /**
     * @throws Throwable
     */
    public static function checkCommenterModelValidity(Authenticatable $model): bool
    {
        throw_unless(is_a($model, CommenterContract::class), InvalidModelException::make('Model must use the '.CommenterContract::class.' interface'));

        return true;
    }

    public static function getAuthGuard(): StatefulGuard
    {
        if (SecureGuestMode::enabled()) {
            return Auth::guard('guest');
        }

        return Auth::guard(Auth::getDefaultDriver());
    }

    public static function highlight_search_match(string $text, string $term, int $radius = 40): string
    {
        // Escape for regex
        $escapedTerm = preg_quote($term, '/');

        // Find match with context around it
        if (preg_match("/(.{0,{$radius}}{$escapedTerm}.{0,{$radius}})/i", $text, $match)) {
            $snippet = $match[1];

            // Highlight the matched term
            $highlighted = preg_replace("/($escapedTerm)/i", '<mark>$1</mark>', $snippet);

            return '...'.$highlighted.'...';
        }

        // Fallback: return a truncated version
        return Str::limit($text, $radius * 2);
    }
}
