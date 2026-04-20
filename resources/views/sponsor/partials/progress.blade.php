@php
    /** @var \App\Models\SponsorObjects\Goal $goal */
    $raised = $goal->raised_amount;
    $target = $goal->target_amount;
    $rawPercent = (float) $goal->progress_percent;
    $percent = $rawPercent > 0 && $rawPercent < 1
        ? number_format($rawPercent, 2)
        : (string) (int) round($rawPercent);
    $barWidth = max(min($rawPercent, 100), $rawPercent > 0 ? 1 : 0);
    $donors = $goal->donor_count;
@endphp

<div class="sponsor-progress">
    <div class="d-flex justify-content-between align-items-baseline mb-1">
        <span class="fw-semibold">{{ $raised?->symbolFormatted() }}</span>
        <span class="text-muted small">of {{ $target?->symbolFormatted() }}</span>
    </div>
    <div class="progress" role="progressbar"
         aria-label="{{ $goal->title }} progress"
         aria-valuenow="{{ $percent }}"
         aria-valuemin="0"
         aria-valuemax="100"
         style="height:.75rem;">
        <div class="progress-bar bg-success"
             style="width: {{ $barWidth }}%;">
        </div>
    </div>
    <div class="text-muted small mt-1">
        {{ $percent }}% funded
        &middot; {{ $donors }} {{ \Illuminate\Support\Str::plural('supporter', $donors) }}
    </div>
</div>
