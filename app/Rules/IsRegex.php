<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class IsRegex implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || ! $this->isValidRegex($value)) {
            $fail('The value must be a valid regular expression');
        }
    }

    /**
     * Determine whether the given pattern is a valid PCRE regex.
     */
    protected function isValidRegex(string $pattern): bool
    {
        // If the user hasn't wrapped their pattern in delimiters, do so.
        // "/" is the delimiter and escape any "/" in the pattern.
        if (! preg_match('/^(.).*\1[imsxuADSUXJu]*$/', $pattern)) {
            $delimiter = '/';
            $pattern = $delimiter.str_replace($delimiter, '\\'.$delimiter, $pattern).$delimiter;
        }

        // Try to compile the pattern, suppressing any warnings.
        set_error_handler(fn () => null, E_WARNING);
        $isValid = @preg_match($pattern, '') !== false;
        restore_error_handler();

        return $isValid;
    }
}
