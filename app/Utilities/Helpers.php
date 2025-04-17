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

    public static function highlight_search_match(string $text, string $term, int $radius = 40, bool $highlightAll = true): string
    {
        // Escape special regex characters
        $escapedTerm = preg_quote($term, '/');

        // Strip any dangerous HTML tags if needed
        $safeText = strip_tags($text);

        // Try to find a snippet around the search term
        if (preg_match("/(.{0,{$radius}}{$escapedTerm}.{0,{$radius}})/i", $safeText, $match)) {
            $snippet = $match[1];

            // Highlight occurrences
            $pattern = $highlightAll ? "/($escapedTerm)/i" : "/($escapedTerm)/iU";

            $highlighted = preg_replace($pattern, '<mark>$1</mark>', $snippet);

            // Trim edges nicely
            $highlighted = ltrim($highlighted);
            $highlighted = rtrim($highlighted);

            return '...'.$highlighted.'...';
        }

        // If no match found, fallback to a nice word-limited version
        return Str::words($safeText, ($radius / 4), '...');
    }
}
