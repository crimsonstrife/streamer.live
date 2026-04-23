<?php

namespace App\Services;

use App\Enums\ApprovalStatus;
use App\Parsers\UserMentionParser;
use Blaspsoft\Blasp\Facades\Blasp;
use Illuminate\Database\Eloquent\Model;
use Mews\Purifier\Facades\Purifier;

/**
 * Shared cleaning + moderation pipeline for community thread content.
 *
 * Used by ThreadController and ThreadPostController so both entry points
 * apply the same Purifier rules, profanity handling, and mention parsing.
 */
class CommunityContentService
{
    /**
     * How many profanities in a single submission force "pending" (override) approval.
     * Mirrors the BlogCommentController threshold so community content matches blog content.
     */
    private const PROFANITY_PENDING_THRESHOLD = 3;

    /**
     * Run the full pipeline on a raw body string.
     *
     * Returns:
     *  - clean: the sanitized, profanity-masked string, ready to persist
     *  - has_profanity: whether any profanity was detected
     *  - profanity_count: count of profanities detected
     *  - should_force_pending: true if moderation must hold this regardless of the
     *    site's require_approval setting
     *
     * @return array{clean: string, has_profanity: bool, profanity_count: int, should_force_pending: bool}
     */
    public function process(string $body): array
    {
        $purified = Purifier::clean($body, 'default');
        $blasp = Blasp::check($purified);

        $clean = $blasp->getCleanString();
        $hasProfanity = $blasp->hasProfanity();
        $profanityCount = $blasp->getProfanitiesCount();

        return [
            'clean'                => $clean,
            'has_profanity'        => $hasProfanity,
            'profanity_count'      => $profanityCount,
            'should_force_pending' => $hasProfanity && $profanityCount >= self::PROFANITY_PENDING_THRESHOLD,
        ];
    }

    /**
     * Parse @username mentions in a model's `body` column, linking them to user profiles.
     * Must be called AFTER the model has been saved so the parser can attribute mentions
     * back to the parent record (the Xetaio parser expects a persisted model).
     */
    public function parseMentions(Model $model, string $column = 'body'): void
    {
        if (empty($model->{$column})) {
            return;
        }

        $parser = new UserMentionParser($model);
        $parsed = $parser->parse($model->{$column});

        if ($parsed !== $model->{$column}) {
            $model->{$column} = $parsed;
            $model->save();
        }
    }

    /**
     * Decide the approval status for a freshly-submitted piece of content based on:
     *  - whether the caller (settings) requires approval for this content type
     *  - whether the content itself triggered spam/profanity rules
     */
    public function resolveApprovalStatus(bool $requireApproval, bool $forcePending): ApprovalStatus
    {
        if ($requireApproval || $forcePending) {
            return ApprovalStatus::Pending;
        }

        return ApprovalStatus::Approved;
    }
}
