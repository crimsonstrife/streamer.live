<?php

namespace App\Services;

use s9e\TextFormatter\Bundles\Forum as Formatter;
use s9e\TextFormatter\Utils;

/**
 * BBCode pipeline for community threads and replies.
 *
 * Stores the parsed XML in the DB (the s9e/text-formatter recommended pattern —
 * lossless round-trip, safe re-rendering if formatter rules change) and renders
 * HTML on display. Uses the pre-built Forum bundle, which supports the classic
 * BBCode dialect (b/i/u/s/url/img/quote/code/list/color/size/youtube/etc.) and
 * matches SCEditor's default tag set.
 */
class BBCodeService
{
    /**
     * Parse raw BBCode text into the XML storage format.
     * The returned string is either plain text (if no tags) or a serialized
     * XML document; round-trippable via unparse().
     */
    public function parse(string $bbcode): string
    {
        return Formatter::parse($bbcode);
    }

    /**
     * Render stored content to safe HTML.
     *
     * Accepts either:
     *  - s9e XML (parsed form) → rendered via the Forum bundle,
     *  - legacy plain text rows written before BBCode support was added
     *    → escaped and nl2br'd so they display sanely during the transition.
     */
    public function render(?string $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        if (! $this->isParsed($value)) {
            return nl2br(e($value));
        }

        return Formatter::render($value);
    }

    /**
     * Round-trip content back to BBCode-editable source.
     *
     * Parsed XML goes through the Formatter's unparse(); legacy plain text
     * passes through unchanged so it can be edited with SCEditor and saved
     * back as proper BBCode on the next write.
     */
    public function unparse(?string $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        if (! $this->isParsed($value)) {
            return $value;
        }

        return Formatter::unparse($value);
    }

    /**
     * Extract plain text from stored content. Handles both parsed XML and
     * legacy raw strings so callers don't need to branch.
     */
    public function plainText(?string $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        if (! $this->isParsed($value)) {
            return $value;
        }

        // Utils::removeFormatting returns the raw text without any markup.
        return Utils::removeFormatting($value);
    }

    /**
     * True when the payload has been parsed (i.e. contains s9e's XML envelope)
     * rather than raw BBCode / plain text. Useful when migrating existing
     * plain-text rows that were written before BBCode support was added.
     */
    public function isParsed(?string $value): bool
    {
        if ($value === null || $value === '') {
            return false;
        }

        // s9e's parsed output either starts with <t> (plain text, no tags) or
        // <r> (rich — has tags). Anything else is raw input.
        return str_starts_with($value, '<t>') || str_starts_with($value, '<r>');
    }
}
