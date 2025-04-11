@aware(['page'])
@if (! $product)
    <div class="alert alert-warning">
        Related products block requires a product context.
    </div>
@elseif ($related->isEmpty())
    <div class="alert alert-info mt-4">
        No related products found for <strong>{{ $product->name }}</strong>.
    </div>
@else
    <div class="mt-5">
        <h4>Related Products</h4>
        <div class="row">
            @foreach ($related as $relatedProduct)
                @php
                    $image = $relatedProduct->images->first();
                @endphp
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        @if ($image)
                            <img src="{!! asset($image->local_path) ?? $image->url !!}" class="card-img-top"
                                 alt="{{ $image->alt_text }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $relatedProduct->name }}</h5>
                            @if ($relatedProduct->review_count > 0)
                                <div class="mb-2">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <i class="bi {{ $i <= round($relatedProduct->average_rating) ? 'bi-star-fill text-warning' : 'bi-star text-muted' }}"></i>
                                    @endfor
                                    <small class="text-muted ms-2">
                                        {{ number_format($relatedProduct->average_rating, 1) }}/5
                                        ({{ $relatedProduct->review_count }} {{ Str::plural('review', $relatedProduct->review_count) }}
                                        )
                                    </small>
                                </div>
                            @else
                                <div class="mb-2">
                                    <small class="text-muted">No ratings yet</small>
                                </div>
                            @endif
                            <p class="text-muted">{{ $relatedProduct->symbol_price }} USD</p>
                            <a href="{{ url('shop/product/' . $relatedProduct->slug) }}"
                               class="btn btn-sm btn-outline-primary">
                                View Product
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endif
