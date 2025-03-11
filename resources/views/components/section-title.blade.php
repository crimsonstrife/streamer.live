<div class="row align-items-center">
    <div class="col">
        <h3 class="fs-5 fw-semibold text-dark">{{ $title }}</h3>
        <p class="mt-1 text-muted small">
            {{ $description }}
        </p>
    </div>

    @if(isset($aside))
        <div class="col-auto">
            {{ $aside }}
        </div>
    @endif
</div>