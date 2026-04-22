<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Public-safe representation of a sponsor donation.
 *
 * - Donor name is masked to "Anonymous" when `is_anonymous` is true (via
 *   {@see \App\Models\SponsorObjects\Donation::displayName()}).
 * - Donor email is never exposed.
 * - Messages are only included when the admin has approved them
 *   (`is_message_approved = true`) and the body is non-empty.
 */
class SponsorDonorResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $hasMessage = $this->is_message_approved && filled($this->message);

        return [
            'name' => $this->displayName(),
            'is_anonymous' => (bool) $this->is_anonymous,
            'amount' => $this->amount?->raw(),
            'amount_formatted' => $this->amount?->symbolFormatted(),
            'currency' => $this->currency,
            'message' => $hasMessage ? $this->message : null,
            'donated_at' => $this->paid_at?->toIso8601String(),
        ];
    }
}
