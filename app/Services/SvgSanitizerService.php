<?php

namespace App\Services;

use enshrined\svgSanitize\Sanitizer;

class SvgSanitizerService
{
    protected Sanitizer $sanitizer;

    public function __construct()
    {
        // Initialize the sanitizer
        $this->sanitizer = new Sanitizer;
    }

    /**
     * Validate if the SVG is well-formed and safe.
     */
    public function validate(string $svgCode): bool
    {
        // Sanitize the SVG and check if it's valid
        return $this->sanitize($svgCode) !== null;
    }

    /**
     * Sanitize the SVG code and return the sanitized version.
     */
    public function sanitize(string $svgCode): ?string
    {
        // Attempt to sanitize the SVG
        $sanitizedSvg = $this->sanitizer->sanitize($svgCode);

        if ($sanitizedSvg === false) {
            // Return null if the SVG is invalid
            return null;
        }

        return $sanitizedSvg;
    }
}
