<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SponsorDonorResource;
use App\Http\Resources\SponsorGoalResource;
use App\Models\SponsorObjects\Goal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Public read-only API for embedding Sponsor Goals on external sites.
 *
 * Endpoints:
 *  - GET /api/v1/sponsor/goals                 (filterable by ?tag= or ?tags=a,b)
 *  - GET /api/v1/sponsor/goals/{slug}          (single goal + embedded recent donors)
 *  - GET /api/v1/sponsor/goals/{slug}/donors   (paginated donor list for one goal)
 *
 * Donor data is anonymous-aware (see {@see SponsorDonorResource}).
 */
class SponsorController extends Controller
{
    public const PAGE_SIZE = 20;

    public const DONORS_PER_GOAL_IN_LIST = 10;

    public const CACHE_DURATION_SECONDS = 300;

    /**
     * List published Sponsor Goals, optionally filtered by one or more tags.
     *
     * Query params:
     *  - tag        single tag name
     *  - tags       comma-separated list of tag names (matches goals with ANY of them)
     *  - per_page   override page size (max 50)
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) $request->query('per_page', self::PAGE_SIZE), 50);
        $tags = $this->resolveTags($request);

        $query = Goal::query()
            ->published()
            ->orderBy('sort_order')
            ->orderByDesc('published_at')
            ->with(['tags', 'media', 'donations' => function ($q) {
                $q->succeeded()
                    ->orderByDesc('paid_at')
                    ->limit(self::DONORS_PER_GOAL_IN_LIST);
            }]);

        if (! empty($tags)) {
            $query->withAnyTags($tags);
        }

        $goals = $query->paginate($perPage)->withQueryString();

        return SponsorGoalResource::collection($goals)
            ->response()
            ->header('Cache-Control', 'public, max-age='.self::CACHE_DURATION_SECONDS);
    }

    /**
     * Return a single goal with embedded recent donors.
     */
    public function show(string $slug): JsonResponse
    {
        $goal = Goal::query()
            ->where('slug', $slug)
            ->published()
            ->with(['tags', 'media', 'donations' => function ($q) {
                $q->succeeded()
                    ->orderByDesc('paid_at')
                    ->limit(self::DONORS_PER_GOAL_IN_LIST);
            }])
            ->firstOrFail();

        return (new SponsorGoalResource($goal))
            ->response()
            ->header('Cache-Control', 'public, max-age='.self::CACHE_DURATION_SECONDS);
    }

    /**
     * Paginated donor list for a single goal (use when you need more than the
     * preview embedded in /goals/{slug}).
     *
     * Query params:
     *  - per_page   override page size (max 100)
     *  - sort       'recent' (default) or 'amount'
     */
    public function donors(Request $request, string $slug): JsonResponse
    {
        $goal = Goal::query()
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        $perPage = min((int) $request->query('per_page', self::PAGE_SIZE), 100);
        $sort = $request->query('sort', 'recent');

        $donors = $goal->succeededDonations()
            ->when(
                $sort === 'amount',
                fn ($q) => $q->orderByDesc('amount'),
                fn ($q) => $q->orderByDesc('paid_at'),
            )
            ->paginate($perPage)
            ->withQueryString();

        return SponsorDonorResource::collection($donors)
            ->response()
            ->header('Cache-Control', 'public, max-age='.self::CACHE_DURATION_SECONDS);
    }

    /**
     * Parse `?tag=` or `?tags=a,b` into a normalized array of tag names.
     *
     * @return array<int, string>
     */
    protected function resolveTags(Request $request): array
    {
        $raw = $request->query('tags', $request->query('tag'));

        if (empty($raw)) {
            return [];
        }

        return collect(is_array($raw) ? $raw : explode(',', $raw))
            ->map(fn ($v) => trim((string) $v))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }
}
