<?php

namespace App\Services;

use App\Enums\ApprovalStatus;
use Blaspsoft\Blasp\Facades\Blasp;
use Illuminate\Database\Eloquent\Model;

/**
 * Shared content pipeline for community thread bodies and replies.
 *
 * User input is BBCode (written via SCEditor in the browser). We parse it into
 * s9e/text-formatter XML for storage, then Blasp-check the extracted plain text
 * to decide whether the submission should be auto-held for moderation.
 *
 * Rendering (XML → HTML) happens at display time via BBCodeService::render().
 */
class CommunityContentService
{
    /**
     * Number of profanities in a submission that force a "pending" hold,
     * regardless of the site's require_approval toggle. Mirrors the blog
     * comment threshold for consistency.
     */
    private const PROFANITY_PENDING_THRESHOLD = 3;

    public function __construct(
        private readonly BBCodeService $bbcode,
    ) {
    }

    /**
     * Process a raw BBCode submission.
     *
     * Returns:
     *  - clean: the s9e XML to persist (use as the body column value)
     *  - has_profanity / profanity_count: from Blasp, run against plain text
     *  - should_force_pending: true if moderation must hold this regardless
     *    of the site's require_approval setting
     *
     * @return array{clean: string, has_profanity: bool, profanity_count: int, should_force_pending: bool}
     */
    public function process(string $bbcode): array
    {
        $xml = $this->bbcode->parse($bbcode);
        $plain = $this->bbcode->plainText($xml);

        $blasp = Blasp::check($plain);
        $hasProfanity = $blasp->hasProfanity();
        $profanityCount = $blasp->getProfanitiesCount();

        return [
            'clean'                => $xml,
            'has_profanity'        => $hasProfanity,
            'profanity_count'      => $profanityCount,
            'should_force_pending' => $hasProfanity && $profanityCount >= self::PROFANITY_PENDING_THRESHOLD,
        ];
    }

    /**
     * Decide the approval status for a freshly-submitted piece of content.
     */
    public function resolveApprovalStatus(bool $requireApproval, bool $forcePending): ApprovalStatus
    {
        if ($requireApproval || $forcePending) {
            return ApprovalStatus::Pending;
        }

        return ApprovalStatus::Approved;
    }

    /**
     * Backward-compat stub. Mentions in BBCode content are handled by the
     * HasMentionsTrait auto-scan on the model's body attribute — no manual
     * parser pass needed. Kept so older controller code keeps compiling
     * during the BBCode transition; safe to remove once call sites are gone.
     */
    public function parseMentions(Model $model, string $column = 'body'): void
    {
        // Intentionally empty. See HasMentionsTrait on Thread / ThreadPost.
    }
}
