<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class FontExtension implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        // $value will be a TemporaryUploadedFile
        if (! $value instanceof TemporaryUploadedFile) {
            return false;
        }

        $ext = strtolower($value->getClientOriginalExtension());

        return in_array($ext, ['ttf', 'woff2'], true);
    }

    /**
     * Get the validation error message.
     */
    public function message(): string
    {
        return 'Only .ttf or .woff2 font files are allowed.';
    }
}
