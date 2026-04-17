<?php

namespace App\Services;

class CssSanitizerService
{
    /**
     * Patterns that are known CSS attack vectors.
     * Each entry is [regex, description].
     */
    private const DANGEROUS_PATTERNS = [
        '/expression\s*\(/i'                => 'IE CSS expression',
        '/javascript\s*:/i'                 => 'javascript: URI',
        '/vbscript\s*:/i'                   => 'vbscript: URI',
        '/-moz-binding\s*:/i'               => 'Firefox XBL binding',
        '/behavior\s*:/i'                   => 'IE behavior property',
        '/@import\b/i'                      => '@import directive',
        '/url\s*\(\s*["\']?\s*data\s*:/i'   => 'data: URI in url()',
        '/<\/style/i'                       => 'style tag breakout',
    ];

    /**
     * Sanitize CSS by stripping known dangerous patterns.
     */
    public function sanitize(?string $css): ?string
    {
        if ($css === null || trim($css) === '') {
            return $css;
        }

        // Strip null bytes and other control characters (except newlines/tabs)
        $css = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $css);

        // Strip each dangerous pattern
        foreach (array_keys(self::DANGEROUS_PATTERNS) as $pattern) {
            $css = preg_replace($pattern, '/* removed */', $css);
        }

        return $css;
    }
}
