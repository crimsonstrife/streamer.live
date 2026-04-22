<?php

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Public-safe representation of a Sponsor Goal for external sites.
 *
 * Embedded donor list is populated by eager-loading the `donations`
 * relationship in the controller (constrained to succeeded rows). When the
 * relation is not loaded, the `donors` key is omitted entirely.
 */
class SponsorGoalResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $bannerUrl = $this->banner_url;

        $gallery = $this->getMedia('gallery')->map(fn (Media $media) => [
            'url' => $media->getFullUrl(),
            'alt' => $media->getCustomProperty('image_alt_text'),
            'caption' => $media->getCustomProperty('caption'),
        ])->values();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'description' => $this->description,
            'tags' => $this->tags->pluck('name')->values(),
            'currency' => $this->currency,
            'target' => $this->target_amount?->raw(),
            'target_formatted' => $this->target_amount?->symbolFormatted(),
            'raised' => $this->raised_amount->raw(),
            'raised_formatted' => $this->raised_amount->symbolFormatted(),
            'progress_percent' => round($this->progress_percent, 2),
            'donor_count' => $this->donor_count,
            'status' => $this->status,
            'is_active' => $this->is_active,
            'starts_at' => $this->starts_at?->toIso8601String(),
            'ends_at' => $this->ends_at?->toIso8601String(),
            'published_at' => $this->published_at?->toIso8601String(),
            'banner_url' => $bannerUrl ?: null,
            'gallery' => $gallery,
            'sponsor_url' => route('sponsor.show', $this->slug),
            'donors' => SponsorDonorResource::collection($this->whenLoaded('donations')),
        ];
    }
}
