@php
    /**
     * Render a product's price or, when the store admin has flagged it as
     * locally discontinued / when Fourthwall reports SOLDOUT, a badge in
     * place of the price. Locally discontinued is deliberate (admin-set,
     * sync-safe) and takes precedence over the Fourthwall state.
     */
    $product = $product ?? null;
    $label = $product?->storefront_state_label;
@endphp

@if ($label)
    <p class="card-text mb-2">
        <span class="badge bg-secondary text-uppercase">{{ $label }}</span>
        @if ($product->is_locally_discontinued && $product->locally_discontinued_note)
            <small class="text-muted d-block mt-1">{{ $product->locally_discontinued_note }}</small>
        @endif
    </p>
@else
    <p class="card-text mb-2">{{ $product->symbol_price }} USD</p>
@endif
